// app/dashboard/logs/page.tsx

import prisma from "../../../../prisma/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { format } from 'date-fns';

export const metadata: Metadata = {
    title: "Mail Service | Email Logs",
    description: "View the history of emails sent from your projects.",
};

export default async function LogsPage() {
    const { userId } = auth();
    if (!userId) redirect("/");

    const userProjects = await prisma.project.findMany({
        where: { userId },
        select: { id: true },
    });

    const projectIds = userProjects.map(p => p.id);

    const logs = await prisma.emailLog.findMany({
        where: {
            userSecretId: {
                in: projectIds,
            },
        },
        include: {
            project: true,
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: 50, // Add pagination later
    });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Email Logs</h1>
            <div className="bg-white/5 rounded-2xl backdrop-blur-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/10">
                        <tr>
                            <th className="p-4 font-semibold">To</th>
                            <th className="p-4 font-semibold">Subject</th>
                            <th className="p-4 font-semibold">Project</th>
                            <th className="p-4 font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id} className="border-b border-white/10 last:border-0">
                                <td className="p-4 truncate">{log.to}</td>
                                <td className="p-4 truncate">{log.subject}</td>
                                <td className="p-4 truncate text-blue-300">{log.project.name}</td>
                                <td className="p-4 truncate">{format(log.createdAt, 'MMM d, yyyy HH:mm')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {logs.length === 0 && (
                    <div className="text-center py-20">
                        <h2 className="text-xl font-medium">No emails sent yet.</h2>
                        <p className="text-blue-200 mt-2">Sent emails will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    )
}