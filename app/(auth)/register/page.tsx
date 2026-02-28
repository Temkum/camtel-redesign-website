'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneNumber as phoneNumberClient } from '@/lib/auth-client';
import { registerSchema, otpSchema } from '@/lib/validations/auth';
import type { RegisterInput, OtpInput } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/**
 * Registration flow:
 * 1. User fills in details (phone, email, name, serviceId)
 * 2. We send OTP to the phone number
 * 3. User enters OTP → Better Auth creates account via signUpOnVerification
 *
 * After account creation, the user's name, email, and serviceId are updated
 * via a PATCH to /api/user/profile (you implement that endpoint separately
 * using auth.api.getSession + db.update).
 *
 * Why this approach: Better Auth's phoneNumber plugin creates the user on
 * OTP verification. There's no built-in "register with extra fields" endpoint
 * for the phone plugin, so we store extra fields after verification.
 */

type Step = 'details' | 'otp';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [pendingData, setPendingData] = useState<RegisterInput | null>(null);
  const [serverError, setServerError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // ---- Step 1: registration details ----
  const detailsForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: {
      phoneNumber: '',
      email: '',
      fullName: '',
      serviceId: '',
    },
  });

  // ---- Step 2: OTP ----
  const otpForm = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    mode: 'onTouched',
    criteriaMode: 'firstError',
    defaultValues: { phoneNumber: '', code: '' },
  });

  const handleSendOtp = async (values: RegisterInput) => {
    setServerError('');
    const { error } = await phoneNumberClient.sendOtp({
      phoneNumber: values.phoneNumber,
    });

    if (error) {
      setServerError(error.message ?? 'Failed to send OTP. Try again.');
      return;
    }

    setPendingData(values);
    otpForm.setValue('phoneNumber', values.phoneNumber);
    setStep('otp');
    startCooldown();
  };

  const handleVerifyOtp = async (values: OtpInput) => {
    setServerError('');

    // Verify OTP — Better Auth creates the user via signUpOnVerification
    const { error } = await phoneNumberClient.verify({
      phoneNumber: values.phoneNumber,
      code: values.code,
    });

    if (error) {
      setServerError(error.message ?? 'Invalid or expired code.');
      return;
    }

    // Update user profile with the extra fields collected at registration
    if (pendingData) {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: pendingData.fullName,
          email: pendingData.email,
          serviceId: pendingData.serviceId,
        }),
      });

      if (!res.ok) {
        // Non-fatal — account is created, profile update failed
        console.error('Profile update failed after registration');
      }
    }

    router.push('/dashboard');
    router.refresh();
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || !pendingData) return;
    setServerError('');
    const { error } = await phoneNumberClient.sendOtp({
      phoneNumber: pendingData.phoneNumber,
    });
    if (error) {
      setServerError(error.message ?? 'Failed to resend OTP.');
      return;
    }
    startCooldown();
  };

  const startCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {step === 'details'
              ? 'Fill in your details to get started'
              : `Enter the code sent to ${pendingData?.phoneNumber}`}
          </p>
        </div>

        {/* Step 1 — Details */}
        {step === 'details' && (
          <form
            onSubmit={detailsForm.handleSubmit(handleSendOtp)}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Jean-Pierre Mbarga"
                autoComplete="name"
                {...detailsForm.register('fullName')}
              />
              {detailsForm.formState.errors.fullName && (
                <p className="text-xs text-destructive">
                  {detailsForm.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+237 650 000 000"
                autoComplete="tel"
                {...detailsForm.register('phoneNumber')}
              />
              {detailsForm.formState.errors.phoneNumber && (
                <p className="text-xs text-destructive">
                  {detailsForm.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email (for account recovery)</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...detailsForm.register('email')}
              />
              {detailsForm.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {detailsForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="serviceId">Service ID</Label>
              <Input
                id="serviceId"
                type="text"
                inputMode="numeric"
                placeholder="000000000"
                {...detailsForm.register('serviceId')}
              />
              <p className="text-xs text-muted-foreground">
                Your 9-digit Camtel service identifier
              </p>
              {detailsForm.formState.errors.serviceId && (
                <p className="text-xs text-destructive">
                  {detailsForm.formState.errors.serviceId.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="text-sm text-destructive">{serverError}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={detailsForm.formState.isSubmitting}
            >
              {detailsForm.formState.isSubmitting
                ? 'Sending code...'
                : 'Continue'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="/login" className="underline font-medium">
                Sign in
              </a>
            </p>
          </form>
        )}

        {/* Step 2 — OTP */}
        {step === 'otp' && (
          <form
            onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="123456"
                autoComplete="one-time-code"
                className="text-center tracking-[0.5em] text-lg font-mono"
                {...otpForm.register('code')}
              />
              {otpForm.formState.errors.code && (
                <p className="text-xs text-destructive">
                  {otpForm.formState.errors.code.message}
                </p>
              )}
            </div>

            {serverError && (
              <p className="text-sm text-destructive">{serverError}</p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={otpForm.formState.isSubmitting}
            >
              {otpForm.formState.isSubmitting
                ? 'Verifying...'
                : 'Verify & create account'}
            </Button>

            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => {
                  setStep('details');
                  setServerError('');
                }}
                className="text-muted-foreground underline"
              >
                Go back
              </button>
              <button
                type="button"
                onClick={handleResend}
                disabled={resendCooldown > 0}
                className="text-muted-foreground underline disabled:opacity-40"
              >
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : 'Resend code'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
