'use client'; // CRITICAL: Must be at the top for client component

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link'; // For navigation if needed, or just a div for now

export default function TopToolbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="bg-gray-800 text-white p-4">Loading toolbar...</div>;
  }

  if (!session) {
    return null; // Don't render toolbar if not logged in
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">
        {/* Optional: Add a logo or app name here */}
        <Link href="/">My App</Link>
      </div>
      <div className="flex items-center space-x-4">
        <span>Welcome, {session.user?.name || session.user?.email}!</span>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
