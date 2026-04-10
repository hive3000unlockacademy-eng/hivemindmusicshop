import { sendInternalEmail, sendTransactionalEmail } from "@/lib/email/sendgrid";

function appOrigin() {
  return (
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "http://localhost:3000"
  );
}

export async function sendPurchaseEmails(params: {
  customerEmail: string;
  orderId: string;
  linesHtml: string;
  downloadLinks?: { label: string; token: string }[];
}) {
  const downloadsHtml =
    params.downloadLinks?.length ?
      `<p><strong>Downloads</strong> (expires per policy):</p><ul>${params.downloadLinks
        .map(
          (d) =>
            `<li>${d.label}: <a href="${appOrigin()}/api/download/${encodeURIComponent(d.token)}">Download</a></li>`,
        )
        .join("")}</ul>`
      : "<p>Downloads will be available from your fulfillment email once files are attached in storage.</p>";

  const customer = await sendTransactionalEmail({
    to: params.customerEmail,
    subject: "Your HiveMind order — HiveMind Productions",
    html: `
      <p>Thanks for your purchase.</p>
      <p>Order reference: <strong>${params.orderId}</strong></p>
      ${params.linesHtml}
      ${downloadsHtml}
      <p>— HiveMind Productions · HiveMindMusic.Shop</p>
    `,
  });

  const internal = await sendInternalEmail({
    subject: `New order ${params.orderId}`,
    html: `<p>New paid order</p><p>Order: ${params.orderId}</p>${params.linesHtml}${downloadsHtml}`,
  });

  return { customer, internal };
}
