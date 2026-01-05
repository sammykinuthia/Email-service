// app/api/email/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/db";
import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import GenericTemplate, { GenericTemplateProps } from "../../../../emails/GenericTemplate";
import { z } from "zod"; // Using Zod for powerful validation

// --- Your exact transporter configuration is preserved ---
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
  tls: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },
});

// --- Schema for Attachments ---
const attachmentSchema = z.object({
  filename: z.string(),
  content: z.string(), // Client must send this as a base64 encoded string
});

// --- Evolved Zod Schema for Validation ---
// This schema handles both old and new request structures.
const emailSchema = z.object({
  to: z.string().email("Invalid 'to' email address."),
  subject: z.string().min(1, "'subject' is required."),
  
  // Old template-based field (optional now)
  intro: z.string().optional(),
  
  // New flexible fields (optional)
  html: z.string().optional(),
  attachments: z.array(attachmentSchema).optional(),

}).passthrough(); // Allows other fields like 'full_name' for the template

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  let projectId: string | undefined;
  let requestBody: any;

  try {
    requestBody = await request.json();

    // --- 1. NEW: DUAL AUTHENTICATION STRATEGY ---
    const authHeader = request.headers.get('Authorization');
    let apiKey: string | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      // Strategy 1: Get key from 'Authorization: Bearer <key>' header
      apiKey = authHeader.substring(7);
    } else {
      // Strategy 2 (Fallback): Get key from 'key' field in JSON body
      apiKey = requestBody.key;
    }

    if (!apiKey) {
      return new NextResponse(JSON.stringify({ error: "API key is missing from JSON body or Authorization header." }), { status: 401, headers: corsHeaders });
    }
    
    const project = await prisma.project.findFirst({ where: { secretkey: apiKey } });
    if (!project) {
      return new NextResponse(JSON.stringify({ error: "Invalid API key." }), { status: 401, headers: corsHeaders });
    }
    projectId = project.id; // Store for error logging

    // --- 2. IMPROVED: VALIDATION WITH ZOD ---
    const validation = emailSchema.safeParse(requestBody);
    if (!validation.success) {
      return new NextResponse(JSON.stringify({ error: "Invalid input.", details: validation.error.flatten().fieldErrors }), { status: 400, headers: corsHeaders });
    }
    
    if (!validation.data.html && !validation.data.intro) {
      return new NextResponse(JSON.stringify({ error: "Email content is missing. Provide either 'html' or 'intro' field." }), { status: 400, headers: corsHeaders });
    }
    const { to, ...data } = validation.data;

    // --- 3. NEW: DYNAMIC EMAIL BODY STRATEGY ---
    let emailHtmlContent: string;
    let emailTextContent: string;

    if (data.html) {
      // Use user-provided raw HTML
      emailHtmlContent = data.html;
      emailTextContent = "This email is in HTML format. Please use an HTML-compatible client to view it.";
    } else {
      const { subject, key, intro, ...others } = data;
       const templateProps: GenericTemplateProps = {
        subject: subject,
        intro: intro as string, // We know intro exists here because of the check above
        ...others // Spread the rest of the dynamic properties
      };

      // Now, `render` receives an object of the correct type.
      emailHtmlContent = await render(GenericTemplate(templateProps));
      emailTextContent = await render(GenericTemplate(templateProps), { plainText: true });
    }

    // --- 4. NEW: ATTACHMENT PROCESSING ---
    const processedAttachments = data.attachments?.map(att => ({
      filename: att.filename,
      content: Buffer.from(att.content, 'base64'), // Decode base64 to a Buffer
    })) || [];

    // --- 5. SEND EMAIL ---
    const info = await transporter.sendMail({
      from: `"Royoltech Solutions" <${process.env.ZOHO_EMAIL}>`,
      to: [to],
      subject: data.subject,
      html: emailHtmlContent,
      text: emailTextContent,
      attachments: processedAttachments,
    });
    
    // --- 6. ROBUST: ATOMIC SUCCESS LOGGING ---
    // Log is created only AFTER the email is successfully sent.
    await prisma.emailLog.create({
      data: {
        userSecretId: project.id,
        to: to,
        subject: data.subject,
        body: data.intro || "HTML content provided",
        payload: JSON.parse(JSON.stringify(data)),
        status: "SENT",
        messageId: info.messageId,
      },
    });

    return new NextResponse(JSON.stringify({ success: true, messageId: info.messageId }), { status: 200, headers: corsHeaders });

  } catch (error: any) {
    console.error("Email sending error:", error);
    
    // --- 7. ROBUST: ATOMIC FAILURE LOGGING ---
    // If the process fails at any point, we log a FAILED attempt.
    if (projectId && requestBody) {
      await prisma.emailLog.create({
        data: {
          userSecretId: projectId,
          to: requestBody.to || 'unknown',
          subject: requestBody.subject || 'unknown',
          body: requestBody.intro || "HTML content provided",
          payload: requestBody,
          status: "FAILED",
        },
      });
    }

    return new NextResponse(JSON.stringify({ error: "Something went wrong.", details: error.message }), { status: 500, headers: corsHeaders });
  }
}