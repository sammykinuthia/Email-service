// app/dashboard/page.tsx

import prisma from "../../../prisma/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { CopyButton } from "../_components/CopyButton";

export const metadata: Metadata = {
    title: "Mail Service | Dashboard",
    description: "Dashboard overview and how-to guide.",
};

export default async function DashboardPage() {
    const { userId } = auth();
    if (!userId) redirect("/");

    const firstProject = await prisma.project.findFirst({
        where: { userId: userId },
    });

    if (!firstProject) {
        return (
            <div className="text-center py-20 bg-white/5 rounded-2xl flex flex-col items-center">
                <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
                <p className="text-blue-200 mt-2 mb-6">Create a project to get started.</p>
                <Link href="/dashboard/projects" className="px-5 py-2.5 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-100 transition-all duration-300">
                    Go to Projects
                </Link>
            </div>
        );
    }

    const sampleJson = `{
    "subject": "Welcome Onboard!",
    "intro": "Thanks for signing up. We're excited to have you.",
    "to": "recipient@example.com",
    "key": "${firstProject.secretkey}",
    "...your_other_data"
}`;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Overview & How To</h1>
            <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-md space-y-6">
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">1. Use your API Key</h2>
                    <p className="text-blue-200">Copy the API key from one of your projects.</p>
                     <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
                        <span className="font-mono text-sm truncate">{firstProject.secretkey}</span>
                        <CopyButton textToCopy={firstProject.secretkey} />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">2. Make a POST Request</h2>
                    <p className="text-blue-200">Send a POST request to the following endpoint.</p>
                     <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
                        <span className="font-mono text-sm">https://mail.royoltech.com/api/email</span>
                        <CopyButton textToCopy={"https://mail.royoltech.com/api/email"} />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">3. Sample JSON Body</h2>
                    <p className="text-blue-200">Your request body should be a JSON object like this. Add any other fields relevant to your email template.</p>
                    <div className="relative p-4 bg-black/30 rounded-lg">
                        <pre className="text-sm whitespace-pre-wrap font-mono">{sampleJson}</pre>
                        <div className="absolute top-3 right-3">
                            <CopyButton textToCopy={sampleJson} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};