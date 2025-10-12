// app/dashboard/projects/_components/DeleteProjectButton.tsx
"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteProject } from "../dashboard/projects/actions";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this project? This is irreversible.")) {
            startTransition(() => deleteProject(projectId));
        }
    }

    return (
        <button onClick={handleDelete} disabled={isPending} className="text-red-400 hover:text-red-300 disabled:text-gray-500">
            <Trash2 className="w-5 h-5" />
        </button>
    )
}