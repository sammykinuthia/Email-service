import React from 'react';
import NavBar from '../NavBar';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <NavBar />
                {children}
            </body>
        </html>
    );
}