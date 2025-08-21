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
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-blue-600"
    >
      <span>Login</span>
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
