/**
 * lib/validations/auth.ts
 *
 * Zod schemas for all auth forms.
 * These run on the CLIENT before hitting the API.
 * The API also validates independently — never rely on client-only validation.
 */

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Phone number — E.164 format required by most SMS providers
// Cameroon numbers: +237 followed by 9 digits
// The regex also accepts international numbers for flexibility.
// ---------------------------------------------------------------------------
const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(
    /^\+[1-9]\d{7,14}$/,
    'Enter a valid phone number with country code (e.g. +237650000000)',
  );

// ---------------------------------------------------------------------------
// Login: phone number only (OTP flow — no password)
// ---------------------------------------------------------------------------
export const loginSchema = z.object({
  phoneNumber: phoneSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;

// ---------------------------------------------------------------------------
// OTP verification
// ---------------------------------------------------------------------------
export const otpSchema = z.object({
  phoneNumber: phoneSchema,
  code: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d{6}$/, 'OTP must contain only digits'),
});

export type OtpInput = z.infer<typeof otpSchema>;

// ---------------------------------------------------------------------------
// Registration: phone + email + name + service ID
// ---------------------------------------------------------------------------
export const registerSchema = z.object({
  phoneNumber: phoneSchema,
  email: z.string().email('Enter a valid email address'),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name is too long'),
  serviceId: z
    .string()
    .min(9, 'Service ID must be at least 9 digits')
    .max(20, 'Service ID is too long')
    .regex(/^\d+$/, 'Service ID must contain only digits'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
