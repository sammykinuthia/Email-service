"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format, formatDate } from "date-fns";
import { useState } from "react";
import Modal from "./MailModal";
import {  Project } from "@prisma/client";
import { EmailLogClient } from "../dashboard/logs/page";
interface LogsTableProps {
    logs: EmailLogClient[],
    page: number,
    total: number,
    pageSize: number,
    searchParams: any,
    projects: Project[]
}

export default function LogsTable({
    logs,
    page,
    total,
    pageSize,
    searchParams,
    projects
}: LogsTableProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const totalPages = Math.ceil(total / pageSize);

    const [selectedLog, setSelectedLog] = useState<EmailLogClient | null>(null);
    const [open, setOpen] = useState(false);

    // Helper to update URL params
    const updateParam = (key: string, value: string) => {
        const newParams = new URLSearchParams(params.toString());

        if (!value || value === "ALL") newParams.delete(key);
        else newParams.set(key, value);

        newParams.set("page", "1"); // reset page

        router.push(`${pathname}?${newParams.toString()}`);
    };

    const updateSort = (column: string) => {
        const currentSort = params.get("sort");
        const currentDir = params.get("direction") || "desc";

        const newDir =
            currentSort === column ? (currentDir === "asc" ? "desc" : "asc") : "asc";

        updateParam("sort", column);
        updateParam("direction", newDir);
    };

    const goToPage = (p: number) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set("page", p.toString());
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Email Logs</h1>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
                <input
                    placeholder="Search..."
                    className="px-3 py-2 rounded bg-white/10"
                    defaultValue={params.get("search") || ""}
                    onChange={(e) => updateParam("search", e.target.value)}
                />

                {/* Status */}
                <select
                    className="px-3 py-2 rounded bg-white/10"
                    defaultValue={params.get("status") || "ALL"}
                    onChange={(e) => updateParam("status", e.target.value)}
                >
                    <option value="ALL">All Status</option>
                    <option value="SENT">Sent</option>
                    <option value="FAILED">Failed</option>
                </select>

                {/* Project */}
                <select
                    className="px-3 py-2 rounded bg-white/10"
                    defaultValue={params.get("project") || "ALL"}
                    onChange={(e) => updateParam("project", e.target.value)}
                >
                    <option value="ALL">All Projects</option>
                    {projects.map((p: any) => (
                        <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="bg-white/5 rounded-xl overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-white/10">
                            <th className="p-3 cursor-pointer" onClick={() => updateSort("to")}>To</th>
                            <th className="p-3 cursor-pointer" onClick={() => updateSort("subject")}>Subject</th>
                            <th className="p-3 cursor-pointer" onClick={() => updateSort("project")}>Project</th>
                            <th className="p-3 cursor-pointer" onClick={() => updateSort("createdAt")}>Date</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b border-white/10">
                                <td className="p-3">{log.to}</td>
                                <td className="p-3">{log.subject}</td>
                                <td className="p-3 text-blue-300">{log.project.name}</td>
                                <td className="p-3">
                                    {format(new Date(log.createdAt), "MMM d, yyyy HH:mm")}
                                </td>
                                <td className="p-3">
                                    <button
                                        className="text-blue-400 hover:underline"
                                        onClick={() => {
                                            setSelectedLog(log);
                                            setOpen(true);
                                        }}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {logs.length === 0 && (
                    <div className="text-center py-16">No logs found.</div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex gap-3 justify-center mt-4">
                <button
                    disabled={page <= 1}
                    onClick={() => goToPage(page - 1)}
                    className="px-3 py-2 bg-white/10 rounded disabled:opacity-40"
                >
                    Prev
                </button>

                <span>Page {page} of {totalPages}</span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => goToPage(page + 1)}
                    className="px-3 py-2 bg-white/10 rounded disabled:opacity-40"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            <Modal open={open} onClose={() => setOpen(false)}>
                {selectedLog && (
                    <div>
                        <h2 className="text-xl font-bold">{selectedLog.subject}</h2>

                        <div className="text-gray-300 mb-4">
                            <p><strong>To:</strong> {selectedLog.to}</p>
                            <p><strong>Status:</strong> {selectedLog.status}</p>
                            <p><strong>Project:</strong> {selectedLog.project.name}</p>
                            <p><strong>Date:</strong> {formatDate(selectedLog.createdAt, "yyyy LLL Io HH:mm")}</p>
                        </div>

                        <h3 className="font-semibold">Body</h3>
                        <div
                            className="prose prose-sm"
                            dangerouslySetInnerHTML={{ __html: selectedLog.body }}
                        />

                        <h3 className="font-semibold mt-4">Payload</h3>
                        <pre className="bg-white/10 p-3 rounded whitespace-break-spaces">
                            {JSON.stringify(selectedLog.payload, null, 2)}
                        </pre>
                    </div>
                )}
            </Modal>
        </div>
    );
}
