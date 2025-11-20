import React, { useEffect, useRef } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: Props) {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    // Manage focus and prevent background scroll
    useEffect(() => {
        const prevOverflow = document.body.style.overflow;
        if (open) {
            // focus close button for accessibility
            setTimeout(() => closeButtonRef.current?.focus(), 0);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = prevOverflow;
        }
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
        >
            {/* Stronger overlay + subtle blur */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onMouseDown={onClose} // click on overlay to close
            />

            {/* Modal panel */}
            <div
                ref={contentRef}
                className="relative bg-white dark:bg-gray-900 rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl ring-1 ring-black/10 dark:ring-white/10 transform transition-all duration-200 scale-100 z-10"
                onMouseDown={(e) => e.stopPropagation()} // prevent overlay click when interacting inside
            >
                {/* Visible close button */}
                <button
                    ref={closeButtonRef}
                    onClick={onClose}
                    aria-label="Close modal"
                    className="absolute top-3 right-3 inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 shadow hover:bg-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {/* simple SVG x for crispness */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 8.586l4.95-4.95 1.414 1.414L11.414 10l5.95 5.95-1.414 1.414L10 11.414l-5.95 5.95-1.414-1.414L8.586 10 2.636 4.05 4.05 2.636 10 8.586z" clipRule="evenodd" />
                    </svg>
                </button>

                {/* content slot */}
                <div className="pt-1">
                    {children}
                </div>
            </div>
        </div>
    );
}