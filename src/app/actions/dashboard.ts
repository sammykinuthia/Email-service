"use server"

import { randomUUID } from "crypto";
import prisma from "../../../prisma/db";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function generateKey(prevState: any, formData: FormData) {
  try {
    const res = z.object({ userId: z.string() }).safeParse({userId:formData.get("userId")});
    if (res.error) {
      // console.log(res.error);
      return "Validation Error";
    }
    await prisma.userSecret.create({
      data: { userId: res.data.userId, secretkey: randomUUID() },
    });
    revalidatePath("/dashboard");
    return "Ok";
  } catch (error) {
    // console.log(error);
    
    return "Error";
  }
}
