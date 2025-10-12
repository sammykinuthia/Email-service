// app/_components/CopyButton.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";

// Define the props the component will accept
interface CopyButtonProps {
  textToCopy: string;
}

export function CopyButton({ textToCopy }: CopyButtonProps) {
  // State to manage the "copied" visual feedback
  const [isCopied, setIsCopied] = useState(false);

  // Effect to reset the "copied" state after a delay
  useEffect(() => {
    // If isCopied is true, set a timer to reset it
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Reset after 2 seconds

      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  // Function to handle the copy action
  const handleCopy = async () => {
    try {
      // Use the browser's Clipboard API to write the text
      await navigator.clipboard.writeText(textToCopy);
      // Set the state to true to show feedback
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // You could add user-facing error handling here if desired
    }
  };

  return (
    <button
      onClick={handleCopy}
      // Disable the button while in the "copied" state to prevent spamming
      disabled={isCopied}
      className={`p-2 rounded-md transition-all duration-200 ease-in-out flex items-center justify-center
        ${
          isCopied
            ? "bg-green-500/20 text-green-400" // Style for the "copied" state
            : "bg-white/10 hover:bg-white/20 text-blue-200" // Default style
        }`}
      aria-label="Copy to clipboard"
    >
      {isCopied ? (
        <Check className="w-4 h-4" /> // Show checkmark icon when copied
      ) : (
        <Copy className="w-4 h-4" /> // Show copy icon by default
      )}
    </button>
  );
}