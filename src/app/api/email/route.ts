import { sendEmail } from "@/app/email";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/db";
import { BaseEmailProp } from "@/app/_constants/types";

export async function POST(request: NextRequest) {
  try {
    const body: BaseEmailProp = await request.json();
    const { key, ...data } = body;
    if (!key || !data.intro || !data.to || !data.subject)
      return Response.json("Missing fields!", { status: 400 });

    const user = await prisma.userSecret.findFirst({
      where: { secretkey: key },
    });
    if (!user) {
      return Response.json("Secret key provided could not be found", {
        status: 400,
      });
    }

    await sendEmail(data);

    return Response.json("Email sent successfully!");
  } catch (error) {
    return Response.json(
      "Something happened, we could not be able to send the email",
      { status: 500 }
    );
  }
}
