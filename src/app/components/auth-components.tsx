"use client";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LineLoginButton() {
  return (
    <button
      onClick={() => signIn("line")}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-green-600"
    >
      {/* Optional: Add Line logo SVG here */}
      <span>Sign in with Line</span>
    </button>
  );
}

export function LoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/login")}
      className="flex w-full items-center justify-center rounded-lg transition-colors cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-gray-800"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Sign out
    </button>
  );
}
