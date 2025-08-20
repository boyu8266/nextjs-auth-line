---
feature_name: login_page_redirect_authenticated_users
feature_goal: Ensure that if a user is already authenticated, navigating to the `/login` page automatically redirects them to the home page (`/`).
deliverable: Modification of `src/app/login/page.tsx` to include server-side session checking and redirection logic.
success_definition:
  - When an unauthenticated user visits `/login`, they see the login page.
  - When an authenticated user visits `/login`, they are immediately redirected to `/`.
  - The solution adheres to Next.js App Router best practices for server components.
  - No new client-side components are introduced for this redirection logic.
relevant_files:
  - path: src/app/login/page.tsx
    description: The target file to modify for implementing the redirection logic.
  - path: src/app/page.tsx
    description: Provides an example of server-side session checking and redirection in a Next.js App Router component.
  - path: auth.ts
    description: Exports the `auth()` function used for retrieving the session.
  - path: next.config.ts
    description: General Next.js configuration, relevant for understanding aliases or other global settings.
  - path: package.json
    description: Defines project dependencies, including `next-auth` and `next`.
external_references:
  - title: Next.js `redirect()` function
    url: https://nextjs.org/docs/app/api-reference/functions/redirect
    description: Official documentation for the `redirect()` function used in Server Components.
  - title: NextAuth.js `auth()` function (v5)
    url: https://next-auth.js.org/configuration/auth-helpers/callbacks#auth
    description: Official documentation for the `auth()` function to retrieve session data in Server Components.
  - title: Next.js Server Components
    url: https://nextjs.org/docs/app/building-your-application/rendering/server-components
    description: General documentation on Next.js Server Components, which `src/app/login/page.tsx` will become.
existing_conventions:
  - type: TypeScript
    description: Adhere to existing TypeScript conventions, including explicit typing where beneficial and consistent import paths (`@/`).
  - type: Next.js App Router
    description: Follow the pattern of using `async` Server Components for data fetching and redirection, as seen in `src/app/page.tsx`.
  - type: Styling
    description: Maintain existing Tailwind CSS classes and structure within the JSX.
  - type: Path Aliases
    description: Use the `@/` alias for imports (e.g., `@/auth`, `@/app/components/auth-components`).
gotchas_and_pitfalls:
  - description: Ensure `src/app/login/page.tsx` is an `async` Server Component to use `await auth()` and `redirect()`.
  - description: `redirect()` throws an error internally, so no code should follow it in the same block.
  - description: Avoid introducing client-side hooks (`useEffect`, `useState`) for this server-side redirection logic.
---

# PRP: Login Page Redirect for Authenticated Users

## Feature Goal

Ensure that if a user is already authenticated, navigating to the `/login` page automatically redirects them to the home page (`/`). This enhances user experience by preventing authenticated users from unnecessarily seeing the login screen.

## Deliverable

Modification of the `src/app/login/page.tsx` file to incorporate server-side session checking and redirection logic.

## Success Definition

The implementation will be considered successful if:
- When an unauthenticated user visits `/login`, they are presented with the login page as expected.
- When an authenticated user visits `/login`, they are immediately and automatically redirected to the home page (`/`).
- The solution adheres to Next.js App Router best practices for server components, leveraging server-side data fetching for session management.
- No new client-side components or hooks are introduced for this redirection logic, maintaining a clear separation of concerns.

## Context

This project utilizes Next.js 15 with the App Router, NextAuth.js (v5) for authentication, and TypeScript. The existing `src/app/page.tsx` demonstrates the pattern for server-side session checking and redirection for protected routes. The `auth.ts` file exports the necessary `auth()` function for session retrieval.

### Relevant Files

- `src/app/login/page.tsx`: This is the primary file to be modified. It currently renders the login UI.
- `src/app/page.tsx`: This file serves as a reference for how to perform server-side session checks and `redirect()` using the `auth()` function from `@/auth`.
- `auth.ts`: This file exports the `auth()` function, which is crucial for retrieving the user's session on the server.
- `next.config.ts`: Provides general Next.js configuration, useful for understanding path aliases or other global settings.
- `package.json`: Defines project dependencies, including `next-auth` and `next`, ensuring compatibility.

### External References

- **Next.js `redirect()` function**: [https://nextjs.org/docs/app/api-reference/functions/redirect](https://nextjs.org/docs/app/api-reference/functions/redirect)
  - Official documentation detailing the usage of `redirect()` within Server Components for server-side navigation.
- **NextAuth.js `auth()` function (v5)**: [https://next-auth.js.org/configuration/auth-helpers/callbacks#auth](https://next-auth.js.org/configuration/auth-helpers/callbacks#auth)
  - Official documentation explaining how to use the `auth()` function to retrieve session data in Next.js Server Components.
- **Next.js Server Components**: [https://nextjs.org/docs/app/building-your-application/rendering/server-components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
  - General documentation on the principles and usage of Next.js Server Components, which `src/app/login/page.tsx` will be transformed into.

### Existing Conventions

- **TypeScript**: Adhere to existing TypeScript conventions, including explicit typing where beneficial and consistent import paths.
- **Next.js App Router**: Follow the established pattern of using `async` Server Components for data fetching and redirection, as exemplified by `src/app/page.tsx`.
- **Styling**: Maintain the existing Tailwind CSS classes and overall structure within the JSX to ensure visual consistency.
- **Path Aliases**: Continue to use the `@/` alias for imports (e.g., `@/auth`, `@/app/components/auth-components`) for cleaner and more maintainable code.

### Gotchas and Pitfalls

- **Server Component Requirement**: Ensure that `src/app/login/page.tsx` is explicitly made an `async` Server Component to correctly utilize `await auth()` and `redirect()`.
- **`redirect()` Behavior**: Be aware that `redirect()` internally throws an error. Therefore, no code should follow a `redirect()` call within the same block, as it will not be executed.
- **Client-Side Logic Avoidance**: Do not introduce client-side hooks (`useEffect`, `useState`) for this redirection logic. The goal is a pure server-side redirection for authenticated users.

## Implementation Tasks

The following tasks should be executed in order:

1.  **Modify `src/app/login/page.tsx` to be an `async` Server Component.**
    *   Open `src/app/login/page.tsx`.
    *   Add the following import statements at the top of the file:
        ```typescript
        import { auth } from "@/auth";
        import { redirect } from "next/navigation";
        ```
    *   Change the `LoginPage` function signature to `export default async function LoginPage() {`.

2.  **Implement session checking and redirection logic within `LoginPage`.**
    *   Inside the `LoginPage` function, before the `return` statement, add the following code:
        ```typescript
        const session = await auth();

        if (session?.user) {
          redirect('/'); // Redirect to the home page if the user is authenticated.
        }
        ```

## Final Validation Checklist

After implementing the changes, perform the following validation steps:

1.  **Code Linting and Type Checking**:
    *   Run `npm run lint` to ensure no linting errors are introduced.
    *   Run `npm run build` to verify that the TypeScript code compiles successfully and the Next.js application builds without errors.

2.  **Functional Testing (Manual)**:
    *   Start the development server: `npm run dev`.
    *   **Scenario 1 (Unauthenticated User)**:
        *   Ensure you are logged out (e.g., clear browser cookies or use an incognito window).
        *   Navigate your browser to `http://localhost:3000/login`.
        *   **Expected Outcome**: The login page should be displayed, allowing you to initiate the login process.
    *   **Scenario 2 (Authenticated User)**:
        *   Log in to the application (e.g., by navigating to `/`, which should redirect you to `/login`, then complete the LINE OAuth flow).
        *   Once successfully logged in and on the home page (`http://localhost:3000/`), manually attempt to navigate to `http://localhost:3000/login` in the same browser session.
        *   **Expected Outcome**: You should be immediately redirected back to the home page (`http://localhost:3000/`) without seeing the login page.

---
