const DEFAULT_BRAND_EMAIL = "HiveMindProducer@gmail.com";
const DEFAULT_BRAND_NAME = "HiveMind Productions";

export async function sendTransactionalEmail(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const key = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL ?? DEFAULT_BRAND_EMAIL;
  const fromName = process.env.SENDGRID_FROM_NAME ?? DEFAULT_BRAND_NAME;
  if (!key) {
    console.warn("[email] SENDGRID_API_KEY missing; skip send");
    return { sent: false as const };
  }

  const mail = await import("@sendgrid/mail");
  mail.default.setApiKey(key);
  await mail.default.send({
    to: params.to,
    from: { email: from, name: fromName },
    replyTo: params.replyTo ?? process.env.SENDGRID_REPLY_TO ?? from,
    subject: params.subject,
    html: params.html,
  });
  return { sent: true as const };
}

export async function sendInternalEmail(params: {
  subject: string;
  html: string;
}) {
  const to =
    process.env.CONTACT_NOTIFICATION_EMAIL ??
    process.env.SENDGRID_FROM_EMAIL ??
    DEFAULT_BRAND_EMAIL;
  if (!to) {
    console.warn("[email] CONTACT_NOTIFICATION_EMAIL missing");
    return { sent: false as const };
  }
  return sendTransactionalEmail({ to, subject: params.subject, html: params.html });
}
