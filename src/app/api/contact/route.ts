// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "../../../../prisma/db"; // 1. IMPORT PRISMA

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 587,
  secure: true,
  requireTLS: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
  tls: {
    // enforce TLS v1.2+ and ensure certificate is valid
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // 2. NEW STEP: Save the message to the database
    await prisma.contactMessage.create({
      data: {
        name: name,
        email: email,
        message: message,
      },
    });
    // The database operation is now complete.

    // 3. PROCEED WITH SENDING THE EMAIL
    const mailOptions = {
      from: `"Mail Service Contact" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from Mail Service Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <br>
        <p><em>This message has also been saved to the database.</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 200 });

  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong.", details: error.message }, { status: 500 });
  }
}