"use client";

import { useActionState } from "react";
import { submitContactAction } from "@/app/actions/contact";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactAction, {});

  if (state.ok) {
    return (
      <p className="text-[#016b28]" role="status">
        Message sent. We&apos;ll be in touch.
      </p>
    );
  }

  return (
    <form action={formAction} className="mt-10 max-w-lg space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm text-[#A1A1AA]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white focus:border-[#002400] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-[#A1A1AA]">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white focus:border-[#002400] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="inquiry_type" className="block text-sm text-[#A1A1AA]">
          Inquiry type
        </label>
        <select
          id="inquiry_type"
          name="inquiry_type"
          className="mt-2 w-full rounded-md border border-white/15 bg-[#0A0A0A] px-4 py-3 text-white focus:border-[#002400] focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select…
          </option>
          <option value="business">Business</option>
          <option value="custom-beat">Custom beat</option>
          <option value="collab">Collab</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-[#A1A1AA]">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
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
        className="rounded-md bg-[#016b28] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(1,107,40,0.28)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(1,107,40,0.55),0_0_72px_rgba(1,107,40,0.2)] disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
