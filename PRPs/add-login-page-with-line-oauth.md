name: "Feature: Add Login Page with Line OAuth"
description: |
  This PRP outlines the steps to implement user authentication using Line OAuth in the Next.js application. It leverages Auth.js (NextAuth.js v5) for a secure and robust implementation within the Next.js App Router paradigm.

---

## Goal

**Feature Goal**: To enable users to sign in and out of the application using their Line account.

**Deliverable**: A fully functional authentication system including a login page, API routes for OAuth handling, and session management throughout the application.

**Success Definition**: A user can click a "Sign in with Line" button, complete the Line OAuth flow, be redirected back to the application, and see their authenticated state (e.g., email address). The user can also sign out.

## Why

- **User Convenience**: Allows users to sign up and log in with a single click using a popular existing service, removing the need to create and remember a new password.
- **Foundation for Personalization**: Establishes a user identity system, which is the first step toward creating personalized user experiences.
- **Security**: Offloads the complexity of password management and authentication to a trusted third-party provider (Line) and a battle-tested library (Auth.js).

## What

- A new page will be created at `/login`.
- This page will contain a "Sign in with Line" button.
- Clicking the button will initiate the Line OAuth2 flow.
- After successful authentication with Line, the user will be redirected back to the homepage.
- The homepage will display the user's email and a "Sign out" button if they are logged in.
- If not logged in, the homepage will show a link to the `/login` page.
- The user's session will be securely managed.

### Success Criteria

- [ ] Users can successfully log in via the `/login` page.
- [ ] Authenticated users' email is displayed on the homepage.
- [ ] Authenticated users can successfully log out.
- [ ] The implementation uses Auth.js and follows best practices for the Next.js App Router.

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about this codebase, would they have everything needed to implement this successfully?"_

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://authjs.dev/getting-started/providers/line
  why: Official Auth.js documentation for the Line provider. It shows the basic configuration needed.
  critical: Shows how to configure the provider with `clientId` and `clientSecret`.

- url: https://authjs.dev/guides/getting-started
  why: The primary guide for setting up Auth.js v5 with the Next.js App Router.
  critical: Explains the core concepts: creating `auth.ts`, the `[...nextauth]` API route, and using the `auth()` helper.

- file: /home/brendan/workspace/nextjs-oauth/src/app/layout.tsx
  why: The root layout file where the Auth.js `SessionProvider` must be added to make session data available to client components.
  pattern: This file sets up the global HTML structure and includes global styles. The new provider will wrap the `{children}`.
  gotcha: The `SessionProvider` itself is a Client Component, so we must create a wrapper component to avoid turning the entire root layout into a client component.

- file: /home/brendan/workspace/nextjs-oauth/src/app/page.tsx
  why: The main page of the application that will be modified to display conditional UI based on the user's authentication state.
  pattern: This is a Server Component. We will use the `auth()` helper from Auth.js to get the session data server-side.
  gotcha: To get session data in a Server Component, you must use the `auth()` function, not the `useSession` hook (which is for Client Components).
```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase

```bash
.
├── .gitignore
├── PRPs
│   └── templates
│       └── prp_base_typescript.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   └── vercel.svg
├── src
│   └── app
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx
└── tsconfig.json
```

### Desired Codebase tree with files to be added and responsibility of file

```bash
.
├── .env.local                  # Stores secret environment variables for Auth.js and Line
├── auth.ts                     # Main Auth.js configuration file
├── middleware.ts               # (Optional but recommended) For protecting routes
└── src
    └── app
        ├── api
        │   └── auth
        │       └── [...nextauth]
        │           └── route.ts  # Dynamic API route that handles all auth requests
        ├── components
        │   ├── auth-components.tsx # Client components for Sign In/Out buttons
        │   └── session-provider.tsx# Client component wrapper for Auth.js SessionProvider
        └── login
            └── page.tsx          # The new login page
```

### Known Gotchas of our codebase & Library Quirks

```typescript
// CRITICAL: Auth.js v5 (the version we will use) automatically picks up env vars prefixed with `AUTH_`.
// Example: `AUTH_SECRET`, `AUTH_LINE_ID`, `AUTH_LINE_SECRET`.
// CRITICAL: The Line Developer Console requires a callback URL. For local dev, this MUST be `http://localhost:3000/api/auth/callback/line`.
// CRITICAL: `auth()` is for Server Components, `useSession()` is for Client Components.
// CRITICAL: The root layout needs a `SessionProvider`, but `layout.tsx` should remain a Server Component. Create a client component wrapper for the provider.
```

## Implementation Blueprint

### Data models and structure

```typescript
// No new database models are needed. Auth.js handles the session structure.
// The session object returned by `auth()` or `useSession()` will look similar to this:
interface Session {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: ISODateString;
}
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: DEPENDENCY INSTALLATION
  - RUN command: `npm install next-auth@beta`
  - WHY: Adds the necessary library for authentication. We use the beta version for the latest App Router features.

Task 2: ENVIRONMENT SETUP
  - CREATE file: `.env.local` in the project root.
  - ADD content:
    # Generate with `openssl rand -base64 32`
    AUTH_SECRET="your-super-secret-key"
    AUTH_LINE_ID="your-line-channel-id-from-developer-console"
    AUTH_LINE_SECRET="your-line-channel-secret-from-developer-console"
  - IGNORE file: Ensure `.env.local` is added to `.gitignore` (it should be by default).

Task 3: AUTH.JS CONFIGURATION
  - CREATE file: `auth.ts` in the project root.
  - IMPLEMENT: Configure Auth.js with the Line provider.
  - FOLLOW pattern from: https://authjs.dev/getting-started/providers/line

Task 4: API AUTH ROUTE
  - CREATE file: `src/app/api/auth/[...nextauth]/route.ts`
  - IMPLEMENT: Export the handlers from the main `auth.ts` file. This single file handles all OAuth callbacks, sign-ins, and sign-outs.

Task 5: SESSION PROVIDER WRAPPER
  - CREATE file: `src/app/components/session-provider.tsx`
  - IMPLEMENT: A client component that wraps the children with Auth.js's `SessionProvider`.
  - UPDATE file: `src/app/layout.tsx` to use this new `SessionProvider` component, wrapping the main `{children}`.

Task 6: AUTH UI COMPONENTS
  - CREATE file: `src/app/components/auth-components.tsx`
  - IMPLEMENT: A `LoginButton` component that calls `signIn('line')` and a `LogoutButton` that calls `signOut()`. These must be client components ('use client').

Task 7: LOGIN PAGE
  - CREATE file: `src/app/login/page.tsx`
  - IMPLEMENT: A simple page that displays the `LoginButton` from the previous step.

Task 8: UPDATE HOME PAGE
  - UPDATE file: `src/app/page.tsx`
  - IMPLEMENT: Use the `auth()` helper to get the current session.
  - LOGIC: If a session exists, display the user's email and the `LogoutButton`. If not, display a link to the `/login` page.
```

### Implementation Patterns & Key Details

```typescript
// auth.ts
import NextAuth from "next-auth";
import Line from "next-auth/providers/line";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Line({
      clientId: process.env.AUTH_LINE_ID,
      clientSecret: process.env.AUTH_LINE_SECRET,
    }),
  ],
});

// src/app/api/auth/[...nextauth]/route.ts
export { GET, POST } from "@/auth"; // Use `@/` alias

// src/app/components/session-provider.tsx
'use client';
import { SessionProvider } from "next-auth/react";

export default function AppSessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

// src/app/components/auth-components.tsx
'use client';
import { signIn, signOut } from "next-auth/react";

export function LoginButton() {
  return <button onClick={() => signIn('line')}>Sign in with Line</button>;
}

export function LogoutButton() {
  return <button onClick={() => signOut()}>Sign out</button>;
}

// src/app/page.tsx (Conceptual)
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
```

### Integration Points

```yaml
CONFIG:
  - add to: .env.local
  - pattern: "AUTH_SECRET, AUTH_LINE_ID, AUTH_LINE_SECRET"
  - gotcha: "Do not prefix with NEXT_PUBLIC_, as these are server-side only."

ROUTES:
  - file structure: app/login/page.tsx
  - api routes: app/api/auth/[...nextauth]/route.ts
```

## Validation Loop

### Level 1: Syntax & Style (Immediate Feedback)

```bash
# Run after each file creation/modification
npm run lint
npx tsc --noEmit

# Expected: Zero errors.
```

### Level 2: Unit Tests (Component Validation)

```bash
# No tests are configured in this project yet. Manual testing will be the primary validation method.
# Future work could involve adding Jest/RTL and testing auth-components.tsx.
```

### Level 3: Integration Testing (System Validation)

```bash
# 1. Start the development server
npm run dev

# 2. Manually test the login flow
# - Open http://localhost:3000
# - You should see "You are not signed in" and a "Login" link.
# - Click the link to go to http://localhost:3000/login.
# - Click the "Sign in with Line" button.
# - You should be redirected to the Line authentication page.
# - After authorizing, you should be redirected back to http://localhost:3000.
# - The page should now show "Welcome, {your-email}" and a "Sign out" button.

# 3. Manually test the logout flow
# - Click the "Sign out" button.
# - You should be logged out and the page should return to the "You are not signed in" state.

# 4. Production build validation
npm run build
# Expected: Successful build with no TypeScript errors or warnings.
```

## Final Validation Checklist

### Technical Validation

- [ ] All validation levels completed successfully.
- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npx tsc --noEmit`
- [ ] Production build succeeds: `npm run build`

### Feature Validation

- [ ] All success criteria from "What" section met.
- [ ] Manual testing of login and logout flows is successful.
- [ ] Environment variables are correctly used and not exposed client-side.

### Code Quality Validation

- [ ] Follows existing TypeScript/React patterns.
- [ ] File placement matches desired codebase tree structure.
- [ ] `auth.ts` is created at the root.
- [ ] API route `[...nextauth]` is correctly placed.
- [ ] Client component wrappers are used correctly to preserve Server Component benefits.
