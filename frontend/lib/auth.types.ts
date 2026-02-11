import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      token: string;
    } & DefaultSession['user'];
  }
}

// If you need to augment JWT types for next-auth, add them here when the
// module path is available in your project. Removed to avoid invalid module
// augmentation errors in this scaffold.
