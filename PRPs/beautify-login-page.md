name: "Beautify Login Page"
description: |
  This PRP outlines the process for transforming the existing barebones login page into a visually appealing, modern, and user-friendly interface. The goal is to create a professional-looking login screen that aligns with modern web design standards.

---

## Goal

**Feature Goal**: To redesign and style the login page (`src/app/login/page.tsx`) to be visually appealing and professional.

**Deliverable**: A refactored `src/app/login/page.tsx` and potentially a new or modified component that implements the new design. The deliverable should be a single, polished login page.

**Success Definition**: The login page is aesthetically pleasing, responsive, and provides a clear and simple way for users to sign in. The code should be clean, well-structured, and use the existing Tailwind CSS setup.

## Why

- **First Impressions**: The login page is often the first interaction a user has with the application. A well-designed page builds trust and credibility.
- **User Experience**: A clear and attractive login page improves the overall user experience.
- **Professionalism**: A polished login page makes the application look more professional and complete.

## What

The beautified login page should have the following features:

- A centered login card on a subtle background.
- A placeholder for a logo or application name.
- A styled "Sign in with Line" button, possibly including the Line logo.
- Improved typography and spacing.

### Success Criteria

- [x] The login form is centered on the page.
- [x] The login elements are contained within a card-like structure.
- [x] The "Sign in with Line" button is styled and easily identifiable.
- [x] The page is responsive and looks good on various screen sizes.

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about this codebase, would they have everything needed to implement this successfully?"_

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://tailwindcss.com/docs/
  why: The project uses Tailwind CSS for styling. A good understanding of Tailwind is essential for this task.
  critical: Understanding utility-first CSS is key to implementing the design.

- url: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
  why: The login page is a Next.js page. Understanding how pages and layouts work is crucial.
  critical: The page at `src/app/login/page.tsx` is a Server Component.

- file: src/app/login/page.tsx
  why: This is the file that needs to be modified.
  pattern: It's a simple server component that renders a client component button.
  gotcha: The core sign-in logic is in the `LoginButton` component, which is a client component.

- file: src/app/components/auth-components.tsx
  why: This file contains the `LoginButton` that will need to be styled.
  pattern: It's a client component that uses the `signIn` function from `next-auth/react`.
  gotcha: The button's `onClick` handler triggers the authentication flow.

- file: tailwind.config.js
  why: To understand the tailwind configuration.
  pattern: The project uses tailwindcss v4.
  gotcha: There is no tailwind.config.js file, but postcss.config.mjs and package.json indicate tailwind is used. The configuration might be implicit or in another file. The agent should assume standard tailwind classes are available.
```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase

```bash
.
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
├───.git/
├───.next/
├───node_modules/
├───PRPs/
│   ├───add-login-page-with-line-oauth.md
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

No new files are expected to be created. The changes will be applied to `src/app/login/page.tsx` and `src/app/components/auth-components.tsx`.

## Implementation Blueprint

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: MODIFY src/app/login/page.tsx
  - IMPLEMENT: A new layout for the login page.
  - DETAILS:
    - The root element should be a flex container that centers its children both horizontally and vertically and takes up the full screen height.
    - Add a card element that will contain the login components. This card should have a background color, padding, rounded corners, and a shadow.
    - Inside the card, add a title like "Log in to your account".
  - FOLLOW pattern: Use Tailwind CSS classes for all styling.

Task 2: MODIFY src/app/components/auth-components.tsx
  - IMPLEMENT: A styled login button.
  - DETAILS:
    - The button should have a distinct background color, padding, and rounded corners.
    - The text should be larger and bolder.
    - Add a hover effect to the button.
    - Optionally, add an icon to the button (e.g., the Line logo). A simple SVG can be used for this.
  - FOLLOW pattern: Use Tailwind CSS classes for all styling.
```

### Implementation Patterns & Key Details

```typescript
// src/app/login/page.tsx

import { LoginButton } from "@/app/components/auth-components";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Login to Your Account
        </h1>
        <LoginButton />
      </div>
    </main>
  );
}

// src/app/components/auth-components.tsx

import { signIn } from "next-auth/react";

export function LoginButton() {
  return (
    <button 
      onClick={() => signIn('line')}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-green-600"
    >
      {/* Optional: Add Line logo SVG here */}
      <span>Sign in with Line</span>
    </button>
  );
}
```

## Validation Loop

### Level 1: Syntax & Style (Immediate Feedback)

```bash
# Run after each file modification
npm run lint
npx tsc --noEmit
```

### Level 2: Unit Tests (Component Validation)

No new tests are required for this styling change, but existing tests should still pass.

### Level 3: Integration Testing (System Validation)

```bash
# Development server validation
npm run dev &
sleep 5

# Page load validation
# Manually open http://localhost:3000/login and verify the new design.
```

### Level 4: Creative & Domain-Specific Validation

- **Visual check**: The page should look modern and professional.
- **Responsiveness**: The page should look good on mobile and desktop screens.
- **Interactivity**: The login button should be clearly interactive and the hover effect should work.

## Final Validation Checklist

### Technical Validation

- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npx tsc --noEmit`
- [ ] Production build succeeds: `npm run build`

### Feature Validation

- [ ] The login page is visually centered and has a card layout.
- [ ] The login button is styled and has a hover effect.
- [ ] The page is responsive.
