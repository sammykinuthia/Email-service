// app/dashboard/admin/actions.ts

"use server";

import prisma from "../../../../prisma/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

// Security function to ensure only the admin can perform actions
async function verifyAdmin() {
  const user = await currentUser();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!user || user.primaryEmailAddress?.emailAddress !== adminEmail) {
    throw new Error("Not authorized");
  }
}

export async function toggleMessageReadStatus(messageId: string, currentStatus: boolean) {
  await verifyAdmin(); // Double-check authorization

  try {
    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { isRead: !currentStatus },
    });
    revalidatePath("/dashboard/admin"); // Refresh the page to show the change
    return { success: true };
  } catch (error) {
    console.error("Failed to update message status:", error);
    return { success: false, error: "Database error." };
  }
}