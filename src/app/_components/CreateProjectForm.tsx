// app/dashboard/projects/_components/CreateProjectForm.tsx

"use client";

import { useFormStatus } from "react-dom";
import { createProject } from "../dashboard/projects/actions";
// import { createProject } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-5 py-2.5 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-100 transition-all duration-300 disabled:bg-gray-400"
    >
      {pending ? "Creating..." : "Create Project"}
    </button>
  );
}

export default function CreateProjectForm() {
  return (
    <form action={createProject} className="flex items-center gap-4">
      <input
        type="text"
        name="projectName"
        placeholder="New Project Name"
        required
        className="p-3 bg-white/10 rounded-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <SubmitButton />
    </form>
  );
}