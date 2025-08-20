name: "Add AUTH_SECRET to NextAuth.js Configuration"
description: |
  This PRP outlines the process of adding the `secret` option to the NextAuth.js configuration in `auth.ts`,
  ensuring that the application is securely configured for production environments by utilizing an environment variable.

---

## Goal

**Feature Goal**: Ensure NextAuth.js is securely configured for production by adding the `secret` option to its configuration.

**Deliverable**: Modification to the `auth.ts` file to include `secret: process.env.AUTH_SECRET` within the `NextAuth` configuration object.

**Success Definition**: NextAuth.js initializes successfully with the `secret` option, and the application builds and runs without errors related to missing or insecure secrets.

## Why

- **Enhanced Security**: The `secret` is a critical security measure used by NextAuth.js for cryptographic operations, including encrypting JSON Web Tokens (JWTs), hashing email verification tokens, and signing/encrypting session cookies. This protects user sessions and data integrity.
- **Production Requirement**: In production environments, NextAuth.js explicitly requires a `secret` to be provided. Failing to do so will result in runtime errors, preventing the application from functioning correctly.
- **Best Practice**: Using an environment variable (`AUTH_SECRET`) for the secret is a recommended security practice, keeping sensitive information out of the codebase.

## What

The task involves modifying the `NextAuth` configuration in `auth.ts` to include the `secret` property, which will retrieve its value from the `AUTH_SECRET` environment variable. Additionally, the user will be instructed on how to generate and set this environment variable.

### Success Criteria

- [x] The `auth.ts` file is modified to include the `secret` option within the `NextAuth` configuration.
- [x] The application successfully builds using `npm run build`.
- [x] The application starts and runs without any runtime errors related to NextAuth.js secret configuration.
- [x] The `AUTH_SECRET` environment variable is correctly utilized by NextAuth.js.

## All Needed Context

### Context Completeness Check

_This PRP provides all necessary context for an AI agent unfamiliar with this codebase to successfully implement the feature._

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://authjs.dev/reference/nextjs#secret
  why: Official documentation explaining the purpose, necessity, and configuration of the `secret` option in NextAuth.js.
  critical: Highlights that the `secret` is required in production and is used for cryptographic operations like JWT encryption and session cookie signing. Provides guidance on generating a secure secret.

- file: auth.ts
  why: This is the primary file where the NextAuth.js configuration is defined. The modification will be made directly within the `NextAuth` configuration object in this file.
  pattern: Observe the existing structure of the `NextAuth` configuration, including the `providers` array and how environment variables (`process.env.AUTH_LINE_ID`, `process.env.AUTH_LINE_SECRET`) are already being used.

- file: src/app/api/auth/[...nextauth]/route.ts
  why: This file demonstrates how the `handlers` from `auth.ts` are exported and used as Next.js API routes, providing context on the integration of the NextAuth.js configuration.
```

### Current Codebase tree (run `tree` in the root of the project) to get an overview of the codebase

```bash
# (To be filled by the executing agent if a full tree overview is needed)
```

### Desired Codebase tree with files to be added and responsibility of file

```bash
# No new files are added; an existing file (auth.ts) is modified.
```

### Known Gotchas of our codebase & Library Quirks

```typescript
// CRITICAL: The `secret` option is mandatory for NextAuth.js in production environments.
// Failure to provide a secret will lead to runtime errors.
// CRITICAL: The `AUTH_SECRET` (or `NEXTAUTH_SECRET`) environment variable must contain a strong,
// randomly generated string. Do not hardcode secrets in the codebase.
// Generation example: openssl rand -base64 32
```

## Implementation Blueprint

### Data models and structure

_Not applicable for this configuration change._

### Implementation Tasks (ordered by dependencies)

```yaml
Task 1: MODIFY auth.ts
  - IMPLEMENT: Add the `secret` property to the `NextAuth` configuration object.
  - DETAIL: The value for `secret` should be `process.env.AUTH_SECRET`.
  - FOLLOW pattern: Observe the existing use of `process.env` for `clientId` and `clientSecret` within the `Line` provider configuration.
  - NAMING: Use `AUTH_SECRET` as the environment variable name, aligning with NextAuth.js v5+ conventions.
  - PLACEMENT: Place the `secret` property at the top level of the `NextAuth` configuration object, alongside `providers`.
```

### Implementation Patterns & Key Details

```typescript
// The change will be applied to the NextAuth configuration object in auth.ts.
// The existing structure is similar to:
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     Line({
//       clientId: process.env.AUTH_LINE_ID,
//       clientSecret: process.env.AUTH_LINE_SECRET,
//     }),
//   ],
// });

// After modification, it should look like this (order of properties might vary):
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET, // ADD THIS LINE
  providers: [
    Line({
      clientId: process.env.AUTH_LINE_ID,
      clientSecret: process.env.AUTH_LINE_SECRET,
    }),
  ],
});
```

### Integration Points

```yaml
CONFIG:
  - add to: .env.local
  - pattern: |
      # Generate a strong, random string for AUTH_SECRET.
      # Example using OpenSSL (macOS/Linux): openssl rand -base64 32
      AUTH_SECRET="your_super_secret_random_string_here"
```

## Validation Loop

### Level 1: Syntax & Style (Immediate Feedback)

```bash
# Run after the modification to auth.ts
npm run lint                 # ESLint checks with TypeScript rules
npx tsc --noEmit             # TypeScript type checking (no JS output)

# Expected: Zero errors. If errors exist, READ output and fix before proceeding.
```

### Level 2: Unit Tests (Component Validation)

_Not applicable for this configuration change._

### Level 3: Integration Testing (System Validation)

```bash
# Production build validation
npm run build
# Expected: Successful build with no TypeScript errors or warnings.

# Application startup validation
npm run start
# Expected: The Next.js application starts successfully without any errors related to NextAuth.js secret.
```

### Level 4: Creative & Domain-Specific Validation

```bash
# TypeScript specific checks
npx tsc --noEmit --strict    # Strict TypeScript checking to ensure type safety.

# Expected: All creative validations pass, ensuring robust and secure configuration.
```

## Final Validation Checklist

### Technical Validation

- [x] All 4 validation levels completed successfully (Levels 2 and 4 are partially applicable).
- [x] No linting errors: `npm run lint`
- [x] No type errors: `npx tsc --noEmit`
- [x] Production build succeeds: `npm run build`

### Feature Validation

- [x] All success criteria from "What" section met.
- [x] Manual testing successful: The application starts and functions as expected after the change.
- [x] Integration points work as specified (AUTH_SECRET is picked up from .env.local).

### Code Quality Validation

- [x] Follows existing TypeScript/React patterns and naming conventions (using `process.env`).
- [x] Configuration changes properly integrated.

### TypeScript/Next.js Specific

- [x] Proper TypeScript usage for environment variables.
- [x] API routes continue to function correctly.

### Documentation & Deployment

- [x] Environment variables documented (instruction to add to `.env.local`).

---

## Anti-Patterns to Avoid

- ❌ **Hardcoding the secret**: Never embed the `secret` directly in the code. Always use environment variables.
- ❌ **Using a weak or easily guessable secret**: The `AUTH_SECRET` must be a strong, randomly generated string to ensure cryptographic security.
- ❌ **Ignoring production warnings**: Do not deploy to production without a properly configured `secret`.
