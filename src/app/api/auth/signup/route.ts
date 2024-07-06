"use server";

import { z } from "zod";
import { hash } from "bcrypt";
import prisma from "../../../../../prisma/db";
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("data---------> ", data);

    if (!data) return Response.json("Invalid parameter", { status: 400 });
    const cred = z
      .object({
        email: z.coerce.string().email().min(6),
        password: z.string().min(4),
      })
      .safeParse(data);
    if (!cred.success)
      return Response.json(cred.error.formErrors.fieldErrors, { status: 400 });
    const { email, password } = cred.data;
    const hashPassword = await hash(password, 10);
    console.log("hashpassword---> ",hashPassword);

    const userExists = await prisma.user.findFirst({ where: { email } });
    console.log("existing user---> ",userExists);
    
    if (!!userExists)
      return Response.json("user with that email already exists", {
        status: 409,
      });

   const user =  await prisma.user.create({ data: { email, password: hashPassword } });
   console.log(user);
   
    return Response.json("Account created successfully");
  } catch (error) {
    console.log("error -----------------> ", error);
    if (error instanceof SyntaxError)
      return Response.json("please send a valid json", { status: 400 });
    return Response.json("error", { status: 400 });
  }
}
