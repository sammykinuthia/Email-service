import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "../../../../prisma/db";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,     // important!
  requireTLS: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD,
  },
  tls: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await prisma.contactMessage.create({
      data: { name, email, message },
    });

    const mailOptions = {
      from: `"Mail Service Contact" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <br/>
        <p>This message has also been saved in the database.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent successfully!" });

  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Something went wrong.", details: error.message }, { status: 500 });
  }
}
