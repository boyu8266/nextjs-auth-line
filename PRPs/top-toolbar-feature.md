name: "Top Toolbar with User Info and Logout"
description: "Implement a persistent top toolbar on the main page (/) that displays the logged-in user's name and a logout button. This toolbar should be visible only when the user is authenticated."

---

## Goal

**Feature Goal**: Implement a persistent top toolbar on the main page (/) that displays the logged-in user's name and a logout button. This toolbar should be visible only when the user is authenticated.

**Deliverable**: A new React client component (TopToolbar.tsx) integrated into the root layout (layout.tsx), responsible for displaying user information and handling logout.

**Success Definition**:
*   A top toolbar is consistently displayed across authenticated pages.
*   The toolbar accurately shows the logged-in user's name.
*   The logout button within the toolbar functions correctly, redirecting the user to the login page upon successful logout.
*   The toolbar is not visible when the user is not logged in.
*   All changes adhere to existing TypeScript, React, Next.js App Router, and Tailwind CSS conventions.

## User Persona (if applicable)

**Target User**: Authenticated user of the application.

**Use Case**: User navigates to any authenticated page and needs quick access to their identity and the logout functionality.

**User Journey**:
1.  User logs in via `/login` page.
2.  User is redirected to `/`.
3.  User sees their name and a logout button in a top toolbar.
4.  User can click the logout button to sign out.

**Pain Points Addressed**:
*   Improved user experience by providing persistent access to identity and logout.
*   Centralized logout functionality.

## Why

- Enhances user experience by providing clear indication of login status and easy logout access.
- Aligns with common web application UI patterns for authenticated users.
- Centralizes a common UI element, reducing redundancy.

## What

- Create a new client component `TopToolbar.tsx` that fetches session data using `useSession`.
- Conditionally render the user's name and a logout button if a session exists.
- Style the toolbar using Tailwind CSS to match the project's aesthetic.
- Integrate `TopToolbar.tsx` into `src/app/layout.tsx` to ensure it's present on all pages.
- Remove the existing user name display and `LogoutButton` from `src/app/page.tsx` to avoid duplication.

### Success Criteria

- [x] A new client component `src/app/components/top-toolbar.tsx` is created.
- [x] `top-toolbar.tsx` uses `useSession` to access user session data.
- [x] `top-toolbar.tsx` displays the `session.user?.name` when a user is logged in.
- [x] `top-toolbar.tsx` includes a functional logout button (reusing or adapting `LogoutButton` from `auth-components.tsx`).
- [x] `top-toolbar.tsx` is styled with Tailwind CSS to create a top toolbar appearance.
- [x] `src/app/layout.tsx` is modified to include the `TopToolbar` component.
- [x] The user name display and `LogoutButton` are removed from `src/app/page.tsx`.
- [x] The application builds and runs without errors.
- [x] The toolbar is responsive and visually consistent across different screen sizes.

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about this codebase, would they have everything needed to implement this successfully?"_
Yes, I believe so. The PRP will provide specific file paths, code patterns, and external references.

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#layouts
  why: Understanding how layouts work in the App Router is crucial for placing the global toolbar.
  critical: Layouts wrap pages and are persistent across navigations. Client components within layouts can access session context.

- url: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#passing-data-from-server-to-client-components
  why: Explains how to pass data (like session) from server components (e.g., layout.tsx) to client components (e.g., TopToolbar.tsx).
  critical: Initial data can be passed as props. For dynamic client-side updates, use `useSession` hook.

- url: https://authjs.dev/reference/nextjs/react#usesession
  why: The primary hook for accessing session data in client components.
  critical: `useSession` provides `data`, `status`, and `update` properties. `data.user.name` will be used.

- url: https://authjs.dev/reference/nextjs/react#signout
  why: The function to programmatically sign out a user.
  critical: `signOut()` can be called directly from client components.

- url: https://tailwindcss.com/docs/flexbox-and-grid
  why: Core Tailwind CSS utilities for layout and alignment, essential for building the toolbar.
  critical: Use `flex`, `justify-between`, `items-center`, `p-4`, `bg-gray-800`, `text-white` for basic toolbar styling.

- file: auth.ts
  why: Provides the `auth()` function for server-side session checks and exports `signIn`, `signOut` handlers.
  pattern: Understanding how NextAuth.js is configured and its core functions.
  gotcha: `auth()` is for server components, `useSession` for client components.

- file: src/app/page.tsx
  why: Shows current session usage and where to remove redundant user info display.
  pattern: How `auth()` is used in a server component.
  gotcha: Ensure the old display is removed to avoid duplication.

- file: src/app/layout.tsx
  why: The root layout where the new `TopToolbar` component will be integrated.
  pattern: How `AppSessionProvider` wraps the application.
  gotcha: The `TopToolbar` must be placed within `AppSessionProvider` to access session context.

- file: src/app/components/auth-components.tsx
  why: Contains existing `LoginButton` and `LogoutButton` components. The `LogoutButton` logic can be reused.
  pattern: Example of client components using `signIn` and `signOut`.
  gotcha: Ensure the `LogoutButton` logic is correctly integrated or adapted.

- file: src/app/components/session-provider.tsx
  why: Provides the `SessionProvider` context to client components.
  pattern: How `SessionProvider` is set up.
  gotcha: This component must be a client component (`'use client'`).

- docfile: PRPs/ai_docs/nextjs_app_router_client_server_components.md
  why: Custom documentation explaining the nuances of client and server components in Next.js App Router.
  section: Passing Data from Server to Client Components
```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase

```bash
/home/brendan/workspace/nextjs-oauth/
├───.gitignore
├───auth.ts
├───eslint.config.mjs
├───GEMINI.md
├───next.config.ts
├───package-lock.json
├───package.json
├───postcss.config.mjs
├───README.md
├───tsconfig.json
├───.gemini/
│   └───commands/
│       └───prp-commands/
│           ├───prp-ts-create.toml
│           └───prp-ts-execute.toml
├───.git/...
├───.next/
│   ├───build/...
│   ├───cache/...
│   ├───diagnostics/...
│   ├───server/...
│   ├───static/...
│   └───types/...
├───node_modules/...
├───PRPs/
│   └───templates/
│       └───prp_base_typescript.md
├───public/
│   ├───file.svg
│   ├───globe.svg
│   ├───next.svg
│   ├───vercel.svg
│   └───window.svg
└───src/
    └───app/
        ├───favicon.ico
        ├───globals.css
        ├───layout.tsx
        ├───page.tsx
        ├───api/
        │   └───auth/
        │       └───[...nextauth]/
        │           └───route.ts
        ├───components/
        │   ├───auth-components.tsx
        │   └───session-provider.tsx
        └───login/
            └───page.tsx
```

### Desired Codebase tree with files to be added and responsibility of file

```bash
/home/brendan/workspace/nextjs-oauth/
├───...
└───src/
    └───app/
        ├───...
        ├───components/
        │   ├───auth-components.tsx
        │   ├───session-provider.tsx
        │   └───top-toolbar.tsx  # NEW: Client component for persistent toolbar
        └───...
```

### Known Gotchas of our codebase & Library Quirks

```typescript
// CRITICAL: Next.js 15 App Router - 'use client' directive must be at the top of the file for client components.
// CRITICAL: Server Components cannot use browser APIs or event handlers. Session fetching on server components uses `auth()`, on client components uses `useSession()`.
// CRITICAL: We use TypeScript strict mode and require proper typing for all components, props, and variables.
// CRITICAL: Tailwind CSS is used for styling. Ensure new components follow existing utility-first class patterns.
// CRITICAL: Path aliases `@/*` point to `./src/*` and `./*`. Use these for imports.
```

## Implementation Blueprint

### Data models and structure

```typescript
// No new complex data models are required. The existing NextAuth.js Session type will be used.
// Component prop types will be simple, primarily relying on the Session type from 'next-auth'.

// Example of relevant type from next-auth:
// interface Session {
//   user?: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//   };
//   expires: string;
// }
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: CREATE src/app/components/top-toolbar.tsx
  - IMPLEMENT: New React client component for the top toolbar.
  - FOLLOW pattern: src/app/components/auth-components.tsx (client component structure, 'use client' directive).
  - NAMING: PascalCase for component name (TopToolbar), camelCase for props.
  - DEPENDENCIES: Import `useSession` and `signOut` from 'next-auth/react'.
  - PLACEMENT: src/app/components/

Task 2: MODIFY src/app/layout.tsx
  - IMPLEMENT: Integrate the `TopToolbar` component into the root layout.
  - FOLLOW pattern: Existing structure of `layout.tsx` for wrapping children with `AppSessionProvider`.
  - NAMING: Standard import and component usage.
  - DEPENDENCIES: `TopToolbar` component from Task 1.
  - PLACEMENT: Within the `AppSessionProvider` in `layout.tsx`, above the `children`.

Task 3: MODIFY src/app/page.tsx
  - IMPLEMENT: Remove the existing user name display and `LogoutButton` to avoid duplication.
  - FOLLOW pattern: Standard JSX modification.
  - NAMING: N/A.
  - DEPENDENCIES: `TopToolbar` component handling the display.
  - PLACEMENT: N/A.

Task 4: STYLE src/app/components/top-toolbar.tsx
  - IMPLEMENT: Apply Tailwind CSS classes to `TopToolbar` for a top toolbar appearance.
  - FOLLOW pattern: src/app/globals.css and existing components for Tailwind usage.
  - NAMING: Use standard Tailwind utility classes (e.g., `bg-gray-800`, `text-white`, `p-4`, `flex`, `justify-between`, `items-center`).
  - DEPENDENCIES: Tailwind CSS configuration.
  - PLACEMENT: Within the JSX of `TopToolbar.tsx`.
```

### Implementation Patterns & Key Details

```typescript
// Component pattern for TopToolbar.tsx:
'use client'; // CRITICAL: Must be at the top for client component

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link'; // For navigation if needed, or just a div for now

export default function TopToolbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="bg-gray-800 text-white p-4">Loading toolbar...</div>;
  }

  if (!session) {
    return null; // Don't render toolbar if not logged in
  }

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">
        {/* Optional: Add a logo or app name here */}
        <Link href="/">My App</Link>
      </div>
      <div className="flex items-center space-x-4">
        <span>Welcome, {session.user?.name || session.user?.email}!</span>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

// Modification pattern for src/app/layout.tsx:
// Import the new component:
// import TopToolbar from '@/app/components/top-toolbar';

// Place it within the AppSessionProvider:
// <AppSessionProvider>
//   <TopToolbar />
//   {children}
// </AppSessionProvider>

// Modification pattern for src/app/page.tsx:
// Remove the following lines:
// <p>Welcome, {session.user?.name}</p>
// <LogoutButton />
```

### Integration Points

```yaml
CONFIG:
  # No new environment variables or significant configuration changes required.
  # Existing NextAuth.js setup in .env.local is sufficient.

ROUTES:
  - file structure: src/app/components/top-toolbar.tsx (new component)
  - integration: src/app/layout.tsx (root layout)
```

## Validation Loop

### Level 1: Syntax & Style (Immediate Feedback)

```bash
# Run after each file creation/modification - fix before proceeding
npm run lint                    # ESLint checks with TypeScript rules
npx tsc --noEmit               # TypeScript type checking (no JS output)
npm run format                 # Prettier formatting

# Project-wide validation
npm run lint:fix               # Auto-fix linting issues
npm run type-check             # Full TypeScript validation (if 'type-check' script exists, otherwise npx tsc --noEmit)

# Expected: Zero errors. If errors exist, READ output and fix before proceeding.
```

### Level 2: Unit Tests (Component Validation)

```bash
# No existing test patterns found. Manual verification will be primary.
# If tests were to be added, they would follow a pattern like:
# npm test -- __tests__/components/top-toolbar.test.tsx
# Expected: All tests pass. If failing, debug root cause and fix implementation.
```

## Final Validation Checklist

### Technical Validation

- [x] All 2 validation levels completed successfully (manual verification for Level 2).
- [x] No linting errors: `npm run lint`
- [x] No type errors: `npx tsc --noEmit`
- [x] No formatting issues: `npm run format --check`
- [x] Production build succeeds: `npm run build`

### Feature Validation

- [x] All success criteria from "What" section met.
- [x] Manual testing successful:
    - Navigate to `/login`, log in. Verify toolbar appears with user name.
    - Navigate to `/`, verify toolbar is present.
    - Click "Sign out" button. Verify redirection to `/login`.
    - Navigate to `/` while logged out. Verify toolbar is not present.
- [x] Error cases handled gracefully (e.g., `status === 'loading'` for session).
- [x] Integration points work as specified.
- [x] User persona requirements satisfied.

### Code Quality Validation

- [x] Follows existing TypeScript/React patterns and naming conventions.
- [x] File placement matches desired codebase tree structure.
- [x] Anti-patterns avoided.
- [x] Dependencies properly managed with correct TypeScript typings.
- [x] Configuration changes properly integrated (none significant).

### TypeScript/Next.js Specific

- [x] Proper TypeScript interfaces and types defined (implicitly using NextAuth.js types).
- [x] Server/Client component patterns followed correctly (`TopToolbar` is client, `layout.tsx` is server).
- [x] `'use client'` directives used appropriately.
- [x] No hydration mismatches between server/client rendering.

### Documentation & Deployment

- [x] Code is self-documenting with clear TypeScript types.
- [x] Props interfaces properly documented (implicitly via `useSession` return type).
- [x] Environment variables documented if new ones added (none).

---

## Anti-Patterns to Avoid

- ❌ Don't create new patterns when existing ones work (e.g., for client components, styling).
- ❌ Don't skip validation because "it should work".
- ❌ Don't use `'use client'` unnecessarily - embrace Server Components where possible (but here, client component is necessary for `useSession`).
- ❌ Don't hardcode values that should be config.
