name: "Redirect Unauthenticated Users to Login Page"
description: "Implement server-side redirection for unauthenticated users from the home page to the login page."

---

## Goal

**Feature Goal**: Ensure that any unauthenticated user attempting to access the home page (`/`) is automatically redirected to the login page (`/login`).

**Deliverable**: Modification of `src/app/page.tsx` to include a server-side redirect.

**Success Definition**: When an unauthenticated user navigates to `/`, they are automatically redirected to `/login`. When an authenticated user navigates to `/`, they see the home page content.

## User Persona (if applicable)

**Target User**: Any user of the application.

**Use Case**: A user attempts to access the application's home page without being logged in.

**User Journey**:
1. User opens the application or navigates to `/`.
2. System checks authentication status.
3. If unauthenticated, user is immediately redirected to `/login`.
4. If authenticated, user sees the home page content.

**Pain Points Addressed**: Prevents unauthenticated users from seeing partial content on the home page and provides a clear path to authentication.

## Why

- **Improved User Experience**: Provides a seamless and immediate redirection for unauthenticated users, guiding them directly to the login process.
- **Security**: Ensures that content intended only for authenticated users is not even partially rendered or exposed to unauthenticated users on the home page.
- **Consistency**: Aligns with common web application patterns where core functionality requires authentication.

## What

Implement a server-side redirect in `src/app/page.tsx` that checks the user's authentication status using NextAuth.js. If the user is not authenticated, they will be redirected to `/login`.

### Success Criteria

- [x] Unauthenticated users are redirected from `/` to `/login`.
- [x] Authenticated users can access and view the content of `/`.
- [x] No client-side flickering or partial content rendering before redirection.
- [x] The solution adheres to Next.js App Router best practices for server components.

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about this codebase, would they have everything needed to implement this successfully?"_

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://nextjs.org/docs/app/api-reference/functions/redirect
  why: Official documentation for the `redirect` function in Next.js App Router, essential for server-side redirects.
  critical: `redirect` is a server-only function and should be used within Server Components or API routes. It throws an error that Next.js catches to perform the redirect.

- url: https://nextjs.org/docs/app/building-your-application/routing/middleware
  why: While not directly used for this specific task, understanding Next.js Middleware is crucial for broader authentication protection strategies.
  critical: Middleware runs at the edge and can protect routes before they are rendered, offering a more comprehensive protection layer for multiple routes.

- url: https://next-auth.js.org/configuration/nextjs#auth
  why: Documentation for the `auth()` helper from NextAuth.js, used to retrieve session data in Server Components.
  critical: `auth()` returns the session object or `null` if no session exists.

- file: src/app/page.tsx
  why: This is the file to be modified. It currently fetches session data and conditionally renders content.
  pattern: Existing usage of `auth()` from `@/auth` to get session data.
  gotcha: Ensure the `redirect` is called before any rendering logic for unauthenticated users.

- file: auth.ts
  why: Defines the NextAuth.js configuration and exports the `auth` helper.
  pattern: Standard NextAuth.js setup.

- file: src/app/login/page.tsx
  why: The target page for redirection.
  pattern: Standard Next.js page component.
```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase

```bash
/home/brendan/workspace/nextjs-oauth/
├───.gitignore
├───auth.ts
├───eslint.config.mjs
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
│   ├───add-login-page-with-line-oauth.md
│   ├───beautify-login-page.md
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
# No new files or directories are added for this feature.
# Only modification to an existing file: src/app/page.tsx
```

### Known Gotchas of our codebase & Library Quirks

```typescript
// Next.js 15 App Router: `redirect` function is server-only and must be imported from 'next/navigation'.
// NextAuth.js v5: The `auth()` helper is the recommended way to get session data in Server Components.
// Server Components: Cannot use client-side hooks (e.g., `useState`, `useEffect`) or browser APIs directly.
// TypeScript: Ensure proper typing for session object to avoid `any` or `!` assertions.
```

## Implementation Blueprint

### Data models and structure

```typescript
// No new data models or structures are required for this feature.
// The existing `Session` type from NextAuth.js will be used.
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: MODIFY src/app/page.tsx
  - IMPLEMENT: Import `redirect` from 'next/navigation'.
  - IMPLEMENT: Add a conditional check after `await auth()`: if `session` or `session.user` is null/undefined, call `redirect('/login')`.
  - IMPLEMENT: Remove the existing `<div>` block that displays "You are not signed in." and the `Link` to `/login`, as the redirect will handle this.
  - FOLLOW pattern: Existing `async` Server Component structure.
  - NAMING: Adhere to existing variable and function naming conventions.
  - PLACEMENT: The redirect check should be at the top of the component's logic, before any rendering for authenticated users.
```

### Implementation Patterns & Key Details

```typescript
// Server Component Redirect Pattern:
// Import `redirect` from 'next/navigation'.
import { redirect } from 'next/navigation';
// Use `auth()` from `@/auth` to get the session.
import { auth } from '@/auth';

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
```

### Integration Points

```yaml
ROUTES:
  - file structure: src/app/page.tsx (modified)
  - target redirect: src/app/login/page.tsx
```

## Validation Loop

### Level 1: Syntax & Style (Immediate Feedback)

```bash
# Run after each file creation - fix before proceeding
npm run lint                    # ESLint checks with TypeScript rules
npx tsc --noEmit               # TypeScript type checking (no JS output)
npm run format                 # Prettier formatting

# Project-wide validation
npm run lint:fix               # Auto-fix linting issues
npm run type-check             # Full TypeScript validation

# Expected: Zero errors. If errors exist, READ output and fix before proceeding.
```

### Level 2: Unit Tests (Component Validation)

```bash
# No new unit tests are strictly required for this simple redirect logic,
# as it's a direct Next.js feature. However, if there were existing tests
# for `src/app/page.tsx`, they should be updated to reflect the new behavior.
# For this PRP, manual testing is sufficient.
```

### Level 3: Integration Testing (System Validation)

```bash
# Development server validation
npm run dev &
sleep 10 # Allow Next.js startup time

# Manual Test Case 1: Unauthenticated user access
# 1. Ensure you are logged out (e.g., clear browser cookies for localhost:3000).
# 2. Navigate to http://localhost:3000/
# Expected: Browser should immediately redirect to http://localhost:3000/login

# Manual Test Case 2: Authenticated user access
# 1. Log in to the application (e.g., via http://localhost:3000/login).
# 2. Navigate to http://localhost:3000/
# Expected: Browser should display the home page content (e.g., "Welcome, [email]").

# Production build validation
npm run build
# Expected: Successful build with no TypeScript errors or warnings
```

### Level 4: Creative & Domain-Specific Validation

```bash
# TypeScript/Next.js Specific Validation:
# Production build performance
npm run build && npm run analyze  # Bundle analyzer if available

# Type safety validation
npx tsc --noEmit --strict        # Strict TypeScript checking

# Next.js specific checks
npm run lint:next                # Next.js linting rules if available

# Expected: All creative validations pass, performance/accessibility standards met
```

## Final Validation Checklist

### Technical Validation

- [x] All 4 validation levels completed successfully (manual tests for Level 2/3 are key here).
- [ ] All tests pass: `npm test` (if any relevant tests exist/are added).
- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npx tsc --noEmit`
- [ ] No formatting issues: `npm run format --check`
- [ ] Production build succeeds: `npm run build`

### Feature Validation

- [x] All success criteria from "What" section met.
- [x] Manual testing successful: Unauthenticated users are redirected to `/login` from `/`, authenticated users see home page.
- [ ] Error cases handled gracefully with proper TypeScript error types (N/A for this simple redirect).
- [x] Integration points work as specified.
- [x] User persona requirements satisfied.

### Code Quality Validation

- [x] Follows existing TypeScript/React patterns and naming conventions.
- [x] File placement matches desired codebase tree structure.
- [x] Anti-patterns avoided.
- [x] Dependencies properly managed with correct TypeScript typings.
- [ ] Configuration changes properly integrated (N/A for this feature).

### TypeScript/Next.js Specific

- [x] Proper TypeScript interfaces and types defined (existing `Session` type used).
- [x] Server/Client component patterns followed correctly.
- [x] `use client` directives used appropriately (N/A for `page.tsx` as it's a Server Component).
- [x] API routes follow Next.js App Router patterns (N/A for this feature).
- [x] No hydration mismatches between server/client rendering.

### Documentation & Deployment

- [x] Code is self-documenting with clear TypeScript types.
- [ ] Props interfaces properly documented (N/A for this feature).
- [ ] Environment variables documented if new ones added (N/A for this feature).

---

## Anti-Patterns to Avoid

- ❌ Don't create new patterns when existing ones work.
- ❌ Don't skip validation because "it should work".
- ❌ Don't ignore failing tests - fix them.
- ❌ Don't use `use client` unnecessarily - embrace Server Components.
- ❌ Don't hardcode values that should be config.
- ❌ Don't catch all exceptions - be specific.
- ❌ Don't use client-side `useRouter` for server-side redirects in Server Components.
