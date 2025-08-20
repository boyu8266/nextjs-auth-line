'use client';
import { signIn, signOut } from "next-auth/react";

export function LoginButton() {
  return (
    <button 
      onClick={() => signIn('line')}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-green-600"
    >
      {/* Optional: Add Line logo SVG here */}
      <span>Sign in with Line</span>
    </button>
  );
}

export function LogoutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}