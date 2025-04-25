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

export async function POST(request: NextRequest) {
  try {
    const body: BaseEmailProp = await request.json();
    const { key, to, ...data } = body;

    // Basic field validation
    if (!key || !data.intro || !to || !data.subject) {
      return NextResponse.json({ error: "Missing fields!" }, { status: 400 });
    }

    // Validate secret key
    const user = await prisma.userSecret.findFirst({
      where: { secretkey: key },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Secret key provided could not be found" },
        { status: 400 }
      );
    }

    // Render React email to HTML
    const html = await render(SignupEmail(data));

    // Send email
    const info = await transporter.sendMail({
      from: `"Royoltech Solutions" <${process.env.ZOHO_EMAIL}>`,
      to: [to],
      subject: data.subject,
      html,
    });

    await prisma.emailLog.create({
      data: {
        userSecretId: user.id,
        to: to,
        subject: data.subject,
        body: data.intro, // or entire HTML if preferred
        payload: data,
      },
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
