https://github.com/user-attachments/assets/c566a85d-63cc-4ff6-9ef2-dedff578e890

## Project Overview

This is a [Next.js](https://nextjs.org/) project that uses the [`next-auth`](https://next-auth.js.org/) library for authentication. The project is configured to use the [Line](https://developers.line.biz/en/) provider for OAuth.

The application has a simple UI with a login page and a home page. The home page displays a top toolbar with the user's name and a logout button if they are authenticated, and a login button otherwise.

## Key Technologies

- **Framework:** Next.js 15 (with App Router)
- **Authentication:** NextAuth.js (v5)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Linting:** ESLint

## Building and Running

To get started with this project, you'll need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following environment variables:

    ```
    AUTH_SECRET=
    AUTH_LINE_ID=
    AUTH_LINE_SECRET=
    ```

    You can get the `AUTH_LINE_ID` and `AUTH_LINE_SECRET` from the [Line Developers Console](https://developers.line.biz/en/docs/line-login/getting-started/).

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the development server on [http://localhost:3000](http://localhost:3000).

4.  **Build for production:**

    ```bash
    npm run build
    ```

5.  **Run in production:**

    ```bash
    npm run start
    ```

## Development Conventions

### Formatting

This project uses [Prettier](https://prettier.io/) for code formatting. You can format the code by running:

```bash
npm run format
```

### Linting

This project uses [ESLint](https://eslint.org/) for linting. You can lint the code by running:

```bash
npm run lint
```
