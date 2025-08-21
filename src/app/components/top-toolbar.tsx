"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LoginButton, LogoutButton } from "./auth-components"; // Import buttons

export default function TopToolbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-transparent text-gray-700 p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">
        <Link href="/" className="flex items-center">
          <img src="/favicon.ico" alt="Favicon" className="h-6 w-6" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {session?.user ? (
          <>
            <span>Welcome, {session.user?.name || session.user?.email}!</span>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
