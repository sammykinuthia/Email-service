// app/dashboard/admin/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "../../../../prisma/db";
import AdminMessagesClient from "../../_components/AdminMessagesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacts - Admin | Mail Service",
    robots: { index: false, follow: false }, // Prevent search engines from indexing this page
};

export default async function AdminPage() {
    // 1. Authorize the user
    const user = await currentUser();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!user || user.primaryEmailAddress?.emailAddress !== adminEmail) {
        redirect("/dashboard"); // Redirect non-admins away
    }

    // 2. Fetch data if authorized
    const messages = await prisma.contactMessage.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    // 3. Render the client component with the data
    return (
        <AdminMessagesClient initialMessages= { messages } />
    )
}