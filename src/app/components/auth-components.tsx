"use client";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LineLoginButton() {
  return (
    <button
      onClick={() => signIn("line")}
      className="flex w-full items-center justify-center gap-2 rounded-lg font-semibold border border-gray-400 text-green-500 cursor-pointer px-4 py-2 shadow-md"
    >
      <img src="/line.svg" alt="LINE icon" className="h-5 w-5" />
      <span>Line</span>
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
      <img src="/login.svg" alt="Login icon" className="h-6 w-6" />
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex w-full items-center justify-center rounded-lg transition-colors cursor-pointer"
    >
      <img src="/logout.svg" alt="Logout icon" className="h-6 w-6" />
    </button>
  );
}
