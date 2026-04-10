"use server";

export type ContactState = { ok?: boolean; error?: string };

export async function submitContactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!email || !message) {
    return { error: "Email and message are required." };
  }

  /* No database: message is not persisted. Add email/API or Supabase later. */
  return { ok: true };
}
