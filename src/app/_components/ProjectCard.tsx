// app/dashboard/projects/_components/ProjectCard.tsx

import { Project } from "@prisma/client";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { CopyButton } from "./CopyButton";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-md space-y-4">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <DeleteProjectButton projectId={project.id} />
            </div>
            <p className="text-sm text-blue-300">API Key</p>
            <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
                <span className="font-mono text-sm truncate">{project.secretkey}</span>
                <CopyButton textToCopy={project.secretkey} />
            </div>
        </div>
    )
}