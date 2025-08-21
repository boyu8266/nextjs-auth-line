"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LoginButton, LogoutButton } from "./auth-components";

export default function TopToolbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-transparent p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">
        <Link href="/" className="flex items-center">
          <Image src="/favicon.ico" alt="Favicon" width={24} height={24} />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {session?.user ? (
          <>
            <Image
              src="/account_circle.svg"
              alt="Account icon"
              width={24}
              height={24}
            />
            <span>{session.user?.name}</span>
            <LogoutButton />
          </>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
