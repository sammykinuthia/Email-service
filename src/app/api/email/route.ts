import { NextRequest, NextResponse } from "next/server";
import prisma from "@/../prisma/db";
import { BaseEmailProp } from "@/app/_constants/types";
import nodemailer from "nodemailer";
import SignupEmail from "../../../../emails/signup";
import { render } from "@react-email/components";

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body: BaseEmailProp = await request.json();
    const { key, to, ...data } = body;

    if (!key || !data.intro || !to || !data.subject) {
      return new NextResponse(JSON.stringify({ error: "Missing fields!" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const user = await prisma.project.findFirst({
      where: { secretkey: key },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "Secret key provided could not be found" }), {
        status: 400,
        headers: corsHeaders,
      });
    }
   
    const html = await render(SignupEmail(data));
    const text = await render(SignupEmail(data), { plainText: true });

    const info = await transporter.sendMail({
      from: `"Royoltech Solutions" <${process.env.ZOHO_EMAIL}>`,
      to: [to],
      subject: data.subject,
      html,
      text
    });
    const mail = await prisma.emailLog.create({
      data: {
        userSecretId: user.id,
        to: to,
        subject: data.subject,
        body: data.intro,
        payload: data,
        status: "SENT",
        messageId: info.messageId,
      },
    });
   
    return new NextResponse(JSON.stringify({ success: true, messageId: info.messageId }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error("Email sending error:", error);
    // Log the failed email attempt if possible
    if (error?.mail) {
      await prisma.emailLog.update({
        where: { id: error.mail.id },
        data: { status: "FAILED"},
      });
    }
    return new NextResponse(JSON.stringify({ error: "Something went wrong", details: error.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
