import { auth } from "@/auth";
import { LoginButton, LogoutButton } from "@/app/components/auth-components";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      {session ? (
        <div>
          <p>Welcome, {session.user?.email}</p>
          <LogoutButton />
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <Link href="/login">Login</Link>
        </div>
      )}
    </main>
  );
}
