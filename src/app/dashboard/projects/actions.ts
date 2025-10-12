// app/dashboard/projects/actions.ts

"use server";

import prisma from "../../../../prisma/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

export async function createProject(formData: FormData) {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");

  const projectName = formData.get("projectName") as string;
  if (!projectName) throw new Error("Project name is required");

  await prisma.project.create({
    data: {
      userId,
      name: projectName,
      secretkey: `ms_sec_${randomUUID()}`,
    },
  });

  revalidatePath("/dashboard/projects");
}

export async function deleteProject(projectId: string) {
    const { userId } = auth();
    if (!userId) throw new Error("Not authenticated");

    await prisma.project.delete({
        where: { id: projectId, userId }, // Ensure user can only delete their own projects
    });

    revalidatePath("/dashboard/projects");
}