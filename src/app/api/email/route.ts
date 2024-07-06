import { NextRequest, NextResponse } from "next/server";
import SignupEmail from "../../../../emails/signup";
import { render } from "@react-email/components";
import { sendEmail } from "@/app/email";
import prisma from "../../../../prisma/db";
import { BaseEmailProp } from "@/app/_constants/types";

export async function POST(request: NextRequest) {
  const { key, ...data } = await request.json();
  if (!key) {
    return Response.json("Secret key Missing", { status: 400 });
  }
  const user = await prisma.user.findFirst({ where: { secretkey: key } });
  if (!user) {
    return Response.json("Secret key provided could not be found", {
      status: 400,
    });
  }
  const data2 = data as BaseEmailProp

  // const secretKey = await Prisma.
  const res = await sendEmail( data,user.email);
  console.log(res);

  return res;
}

export async function GET() {
  return Response.json("get ok");
}
