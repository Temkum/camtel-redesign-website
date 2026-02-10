import * as z from 'zod';

export const loginSchema = z.object({
  serviceId: z
    .string()
    .min(9, 'Service ID must be at least 9 digits')
    .regex(/^\d+$/, 'Service ID must contain only digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    serviceId: z
      .string()
      .min(9, 'Service ID must be at least 9 digits')
      .regex(/^\d+$/, 'Service ID must contain only digits'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    email: z.string().email('Invalid email address'),
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
