// app/dashboard/admin/_components/AdminMessagesClient.tsx

"use client";

import { useState, useTransition } from "react";
import { ContactMessage } from "@prisma/client";
import { format } from "date-fns";
import { toggleMessageReadStatus } from "@/app/dashboard/admin-contacts/actions";
import { Mail, MailOpen, Trash2, X } from "lucide-react";

interface AdminMessagesClientProps {
  initialMessages: ContactMessage[];
}

export default function AdminMessagesClient({ initialMessages }: AdminMessagesClientProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggleRead = (messageId: string, currentStatus: boolean) => {
    startTransition(async () => {
      const result = await toggleMessageReadStatus(messageId, currentStatus);
      if (result.success) {
        // Optimistically update the UI
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId ? { ...msg, isRead: !currentStatus } : msg
          )
        );
      } else {
        alert("Failed to update status. Please check the console.");
      }
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
      
      {/* Messages Table */}
      <div className="bg-white/5 rounded-2xl backdrop-blur-md overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4 font-semibold w-16">Status</th>
              <th className="p-4 font-semibold">From</th>
              <th className="p-4 font-semibold">Message</th>
              <th className="p-4 font-semibold">Received</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className={`border-b border-white/10 last:border-0 ${!msg.isRead ? 'font-bold' : 'text-gray-300'}`}>
                <td className="p-4 align-top">
                  {msg.isRead ? <MailOpen className="w-5 h-5 text-gray-400" /> : <Mail className="w-5 h-5 text-blue-300" />}
                </td>
                <td className="p-4 align-top">
                  <div>{msg.name}</div>
                  <div className={`text-sm ${!msg.isRead ? 'text-blue-200' : 'text-gray-400'}`}>{msg.email}</div>
                </td>
                <td className="p-4 align-top max-w-sm truncate">{msg.message}</td>
                <td className="p-4 align-top">{format(msg.createdAt, "MMM d, yyyy")}</td>
                <td className="p-4 align-top">
                  <div className="flex justify-center items-center gap-2">
                    <button onClick={() => setSelectedMessage(msg)} className="text-blue-300 hover:text-white">View</button>
                    <button onClick={() => handleToggleRead(msg.id, msg.isRead)} disabled={isPending} className="text-gray-300 hover:text-white disabled:opacity-50">
                      {msg.isRead ? 'Mark Unread' : 'Mark Read'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {messages.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-medium">No messages found.</h2>
            <p className="text-blue-200 mt-2">New submissions will appear here.</p>
          </div>
        )}
      </div>

      {/* Message Viewer Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setSelectedMessage(null)}>
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 border border-white/20" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedMessage(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedMessage.name}</h2>
            <a href={`mailto:${selectedMessage.email}`} className="text-blue-300 hover:underline mb-4 block">{selectedMessage.email}</a>
            <p className="text-gray-300 mb-6 text-sm">Received: {format(selectedMessage.createdAt, "MMMM d, yyyy 'at' HH:mm")}</p>
            <div className="bg-black/20 p-4 rounded-lg max-h-[50vh] overflow-y-auto">
              <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}