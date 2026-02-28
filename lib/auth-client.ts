/**
 * lib/auth-client.ts  —  Browser-side Better Auth client
 *
 * Import from here in all client components. Never import from lib/auth.ts
 * on the client — that file contains server-only secrets.
 */

import { createAuthClient } from 'better-auth/react';
import { phoneNumberClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  plugins: [phoneNumberClient()],
});

export const { signOut, useSession, getSession } = authClient;

// Phone number specific methods — named explicitly for clarity
export const { phoneNumber } = authClient;
