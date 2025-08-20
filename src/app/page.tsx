import { auth } from "@/auth";
import { LogoutButton } from "@/app/components/auth-components";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // CRITICAL: Perform the redirect check early in the component's lifecycle.
  if (!session?.user) {
    redirect('/login'); // Redirect to the login page if no authenticated user.
  }

  // The rest of the component's rendering logic for authenticated users.
  return (
    <main>
      <div>
        <p>Welcome, {session.user?.email}</p>
        {/* Assuming LogoutButton is for authenticated users */}
        <LogoutButton />
      </div>
    </main>
  );
}
