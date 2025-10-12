// app/dashboard/projects/page.tsx

import prisma from "../../../../prisma/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import CreateProjectForm from "@/app/_components/CreateProjectForm";
import ProjectCard from "@/app/_components/ProjectCard";

export const metadata: Metadata = {
    title: "Mail Service | Projects",
    description: "Manage your projects and API keys.",
};

export default async function ProjectsPage() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const projects = await prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <CreateProjectForm />
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-white/5 rounded-2xl">
            <h2 className="text-xl font-medium">No projects yet.</h2>
            <p className="text-blue-200 mt-2">Create your first project to get an API key!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      )}
    </div>
  );
}