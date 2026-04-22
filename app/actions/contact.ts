"use server";

import {
  buildContactConfirmationEmailHtml,
  buildContactInternalEmailHtml,
  inquiryTypeLabel,
} from "@/lib/email/contact-emails";
import { sendInternalEmail, sendTransactionalEmail } from "@/lib/email/sendgrid";

export type ContactState = { ok?: boolean; error?: string };

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function submitContactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const inquiryType = String(formData.get("inquiry_type") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  if (!email || !message) {
    return { error: "Email and message are required." };
  }

  const inquiryLabel = inquiryTypeLabel(inquiryType);
  const safeName = escapeHtml(name || "Not provided");
  const safeEmail = escapeHtml(email);
  const safeInquiry = escapeHtml(inquiryLabel);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const internal = await sendInternalEmail({
    subject: `New contact inquiry — ${inquiryLabel}`,
    html: buildContactInternalEmailHtml({
      safeName,
      safeEmail,
      rawEmail: email,
      safeInquiry,
      safeMessage,
    }),
  });

  const confirmation = await sendTransactionalEmail({
    to: email,
    subject: "We got your message — HiveMind Productions",
    html: buildContactConfirmationEmailHtml({
      safeInquiry,
      safeMessage,
    }),
  });

  if (!internal.sent || !confirmation.sent) {
    return {
      error:
        "Unable to send your message right now. Please try again in a moment.",
    };
  }

  return { ok: true };
}
