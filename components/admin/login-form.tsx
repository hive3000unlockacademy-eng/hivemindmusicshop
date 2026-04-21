"use client";

import { useActionState } from "react";
import { loginWithPasswordAction } from "@/app/admin/actions";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(
    loginWithPasswordAction,
    {},
  );

  return (
    <form action={formAction} className="mx-auto mt-10 max-w-md space-y-6">
      <div>
        <label
          htmlFor="admin-email"
          className="block text-sm text-[#A1A1AA]"
        >
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white focus:border-[#002400] focus:outline-none"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="admin-password"
          className="block text-sm text-[#A1A1AA]"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white focus:border-[#002400] focus:outline-none"
        />
      </div>
      {state.error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-[#016b28] px-4 py-3 text-sm font-medium text-white hover:bg-[#018030] disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
