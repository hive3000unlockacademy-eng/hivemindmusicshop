"use client";

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase/client";

export function AccountPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<{
    pending: boolean;
    error?: string;
    success?: string;
  }>({ pending: false });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password.length < 8) {
      setState({ pending: false, error: "Password must be at least 8 characters." });
      return;
    }
    if (password !== confirm) {
      setState({ pending: false, error: "Passwords do not match." });
      return;
    }

    setState({ pending: true });
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setState({ pending: false, error: error.message });
      return;
    }

    setPassword("");
    setConfirm("");
    setState({ pending: false, success: "Password updated." });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
      <label className="block text-sm text-[#A1A1AA]">
        New password
        <input
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
        />
      </label>
      <label className="block text-sm text-[#A1A1AA]">
        Confirm new password
        <input
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white"
        />
      </label>

      {state.error ? (
        <p className="text-sm text-red-400/90" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-[#16a34a]" role="status">
          {state.success}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state.pending}
        className="rounded-md bg-[#016b28] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {state.pending ? "Saving..." : "Change password"}
      </button>
    </form>
  );
}
