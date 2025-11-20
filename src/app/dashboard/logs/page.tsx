// app/dashboard/logs/page.tsx

import prisma from "../../../../prisma/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LogsTable from "../../_components/LogsTable";
import { EmailLog, Project } from "@prisma/client";


export interface EmailLogClient extends EmailLog{
    project:Project
}

export default async function LogsPage({ searchParams }: { searchParams: any }) {
    const { userId } = auth();
    const user = await currentUser();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!userId) redirect("/");

    const isAdmin = user?.primaryEmailAddress?.emailAddress === adminEmail;

    // Extract query params
    const page = Number(searchParams.page) || 1;
    const pageSize = 10;

    const search = searchParams.search || "";
    const status = searchParams.status || "ALL";
    const project = searchParams.project || "ALL";

    const sort = searchParams.sort || "createdAt";
    const direction = searchParams.direction === "asc" ? "asc" : "desc";

    // Fetch user projects
    const userProjects = await prisma.project.findMany({
        where: isAdmin ? {} : { userId },
    });

    const projectIds = userProjects.map(p => p.id);

    // Build WHERE conditions
    const where: any = {
        userSecretId: { in: projectIds }
    };

    if (search) {
        where.OR = [
            { subject: { contains: search, mode: "insensitive" } },
            { to: { contains: search, mode: "insensitive" } },
            { body: { contains: search, mode: "insensitive" } },
        ];
    }

    if (status !== "ALL") where.status = status;
    if (project !== "ALL") where.project = { name: project };

    // Total Count
    const totalLogs = await prisma.emailLog.count({ where });

    // Pagination skip/take
    const logs = await prisma.emailLog.findMany({
        where,
        include: { project: true },
        orderBy: { [sort]: direction },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    return (
        <LogsTable
            logs={logs}
            page={page}
            total={totalLogs}
            pageSize={pageSize}
            searchParams={searchParams}
            projects={userProjects}
        />
    );
}
