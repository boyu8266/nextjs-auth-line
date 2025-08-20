'use client';
import { signIn, signOut } from "next-auth/react";

export function LoginButton() {
  return <button onClick={() => signIn('line')}>Sign in with Line</button>;
}

export function LogoutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}