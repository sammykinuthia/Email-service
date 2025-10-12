// app/_components/ContactForm.tsx

"use client";

import { useState } from 'react';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setResponseMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('success');
      setResponseMessage("Thank you! Your message has been sent. We'll get back to you soon.");
      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error: any) {
      setStatus('error');
      setResponseMessage(error.message || 'Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-4 bg-white/10 rounded-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-4 bg-white/10 rounded-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="p-4 bg-white/10 rounded-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full text-lg hover:bg-blue-100 transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:scale-100"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      
      {/* Feedback Messages */}
      {status === 'success' && (
        <p className="mt-4 text-center p-3 rounded-lg bg-green-500/20 text-green-300">
          {responseMessage}
        </p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-center p-3 rounded-lg bg-red-500/20 text-red-300">
          {responseMessage}
        </p>
      )}
    </div>
  );
}