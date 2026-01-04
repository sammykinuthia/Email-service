// app/dashboard/page.tsx

import prisma from "../../../prisma/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { CopyButton } from "../_components/CopyButton";

export const metadata: Metadata = {
    title: "Mail Service | Dashboard",
    description: "Dashboard overview and how-to guide for the email API.",
};

// Reusable component for code blocks
const CodeBlock = ({ text, title }: { text: string; title: string }) => (
    <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="relative p-4 bg-black/30 rounded-lg">
            <pre className="text-sm whitespace-pre-wrap font-mono text-blue-200">{text}</pre>
            <div className="absolute top-3 right-3">
                <CopyButton textToCopy={text} />
            </div>
        </div>
    </div>
);


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
                <p className="text-blue-200 mt-2 mb-6">Create a project to get your first API key.</p>
                <Link href="/dashboard/projects" className="px-5 py-2.5 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-100 transition-all duration-300">
                    Go to Projects
                </Link>
            </div>
        );
    }

    const endpoint = "https://mail.royoltech.com/api/email";

    const simpleTemplateJson = `{
  "to": "recipient@example.com",
  "subject": "Welcome Onboard!",
  "intro": "Thanks for signing up...",
  "full_name": "John Doe"
}`;

    const customHtmlJson = `{
  "to": "recipient@example.com",
  "subject": "Your Custom Invoice",
  "html": "<h1>Invoice #123</h1><p>Thank you for your business!</p>"
}`;

    const attachmentJson = `{
  "to": "recipient@example.com",
  "subject": "File Attached",
  "html": "<p>Please find the document attached.</p>",
  "attachments": [
    {
      "filename": "invoice.pdf",
      "content": "JVBERi0xLjQKJ..."
    }
  ]
}`;

    const curlCommand = `curl -X POST ${endpoint} \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer ${firstProject.secretkey}" \\
-d '${simpleTemplateJson.replace(/\n/g, '')}'`;

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">API Overview</h1>
                <p className="text-blue-200 mt-2 max-w-3xl">Our API is designed to be flexible. You can use our simple template system or send your own custom HTML, with or without attachments.</p>
            </div>

            {/* --- Core Details Section --- */}
            <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-md space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Core Details</h2>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold">API Endpoint (POST)</h3>
                            <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
                                <span className="font-mono text-sm">{endpoint}</span>
                                <CopyButton textToCopy={endpoint} />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-lg font-semibold">Authentication</h3>
                            <p className="text-blue-200 text-sm mb-2">
                                We recommend passing your API key as a Bearer Token in the `Authorization` header.
                            </p>
                            <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg">
                                <span className="font-mono text-sm truncate">Authorization: Bearer {firstProject.secretkey}</span>
                                <CopyButton textToCopy={firstProject.secretkey} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Sending Strategies Section --- */}
            <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-md space-y-8">
                <h2 className="text-2xl font-bold">Sending Strategies</h2>

                <CodeBlock title="Option 1: Simple Template" text={simpleTemplateJson} />
                <CodeBlock title="Option 2: Custom HTML" text={customHtmlJson} />
                <CodeBlock title="Option 3: With Attachments" text={attachmentJson} />
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Note on Attachments</h3>
                    <p className="text-blue-200 text-sm">The `content` field for attachments must be a <span className="font-semibold text-white">base64 encoded string</span> of your file.</p>
                </div>

                <hr className="border-white/10" />

                <CodeBlock title="Example cURL Request" text={curlCommand} />
            </div>
        </div>
    );
};