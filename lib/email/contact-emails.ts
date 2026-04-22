/**
 * Branded HTML for contact form emails (SendGrid).
 * Table layout + inline styles for common client support.
 */

const SHOP_URL = "https://hivemindmusic.shop";
const BRAND_GREEN = "#016b28";
const BG_PAGE = "#0a0a0a";
const BG_CARD = "#111111";
const BORDER = "#27272a";
const TEXT_MUTED = "#a1a1aa";
const TEXT_BODY = "#e4e4e7";

export function inquiryTypeLabel(slug: string): string {
  const map: Record<string, string> = {
    business: "Business",
    "custom-beat": "Custom beat",
    collab: "Collab",
    other: "Other",
  };
  return map[slug] ?? (slug || "General");
}

function wrapBrandedEmail(params: {
  eyebrow: string;
  title: string;
  bodyHtml: string;
}): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<title>${params.title}</title>
</head>
<body style="margin:0;padding:0;background-color:${BG_PAGE};-webkit-text-size-adjust:100%;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${BG_PAGE};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background-color:${BG_CARD};border:1px solid ${BORDER};border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background-color:${BRAND_GREEN};padding:22px 28px;border-bottom:1px solid rgba(0,0,0,0.2);">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.9);">${params.eyebrow}</p>
            <h1 style="margin:10px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:600;color:#ffffff;line-height:1.2;">HiveMind Productions</h1>
            <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(255,255,255,0.88);">Beat store · <a href="${SHOP_URL}" style="color:#ffffff;text-decoration:underline;">HiveMindMusic.Shop</a></p>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 28px 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:${TEXT_BODY};">
            ${params.bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:${TEXT_MUTED};border-top:1px solid ${BORDER};">
            <p style="margin:16px 0 0;">HiveMind Productions · melodic trap &amp; drill beats</p>
            <p style="margin:8px 0 0;"><a href="${SHOP_URL}" style="color:${BRAND_GREEN};text-decoration:none;font-weight:600;">Visit the store</a></p>
          </td>
        </tr>
      </table>
      <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:${TEXT_MUTED};max-width:600px;">You are receiving this email because of activity on HiveMindMusic.Shop.</p>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function labelRow(label: string, valueHtml: string): string {
  return `<p style="margin:0 0 14px;font-size:14px;color:${TEXT_BODY};"><span style="display:inline-block;min-width:112px;color:${TEXT_MUTED};font-size:12px;text-transform:uppercase;letter-spacing:0.06em;">${label}</span><br /><span style="color:${TEXT_BODY};">${valueHtml}</span></p>`;
}

export function buildContactInternalEmailHtml(params: {
  safeName: string;
  safeEmail: string;
  /** Unescaped address for mailto: href only (validated in server action). */
  rawEmail: string;
  safeInquiry: string;
  safeMessage: string;
}): string {
  const mailtoHref = `mailto:${encodeURIComponent(params.rawEmail)}`;
  const body = `
    <p style="margin:0 0 20px;font-size:18px;font-weight:600;color:#ffffff;">New contact form submission</p>
    ${labelRow("Name", params.safeName)}
    ${labelRow("Email", `<a href="${mailtoHref}" style="color:${BRAND_GREEN};text-decoration:none;">${params.safeEmail}</a>`)}
    ${labelRow("Inquiry", params.safeInquiry)}
    <p style="margin:20px 0 8px;font-size:12px;color:${TEXT_MUTED};text-transform:uppercase;letter-spacing:0.06em;">Message</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0a0a0a;border:1px solid ${BORDER};border-radius:8px;">
      <tr>
        <td style="padding:16px 18px;font-size:14px;line-height:1.6;color:${TEXT_BODY};">${params.safeMessage}</td>
      </tr>
    </table>
  `;
  return wrapBrandedEmail({
    eyebrow: "Admin notification",
    title: "New contact inquiry",
    bodyHtml: body,
  });
}

export function buildContactConfirmationEmailHtml(params: {
  safeInquiry: string;
  safeMessage: string;
}): string {
  const body = `
    <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#ffffff;">We got your message</p>
    <p style="margin:0 0 20px;font-size:15px;color:${TEXT_BODY};">Thanks for reaching out to HiveMind Productions. We&apos;ll review your note and get back to you as soon as we can.</p>
    ${labelRow("Inquiry type", params.safeInquiry)}
    <p style="margin:20px 0 8px;font-size:12px;color:${TEXT_MUTED};text-transform:uppercase;letter-spacing:0.06em;">What you sent</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#0a0a0a;border:1px solid ${BORDER};border-radius:8px;">
      <tr>
        <td style="padding:16px 18px;font-size:14px;line-height:1.6;color:${TEXT_BODY};">${params.safeMessage}</td>
      </tr>
    </table>
    <p style="margin:24px 0 0;font-size:14px;color:${TEXT_MUTED};">— HiveMind Productions</p>
  `;
  return wrapBrandedEmail({
    eyebrow: "Thank you",
    title: "Message received",
    bodyHtml: body,
  });
}
