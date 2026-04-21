import { sendInternalEmail, sendTransactionalEmail } from "@/lib/email/sendgrid";

export async function sendPurchaseEmails(params: {
  customerEmail: string;
  orderId: string;
  linesHtml: string;
  downloadLinks?: { label: string; token: string }[];
}) {
  const fulfillmentHtml =
    params.downloadLinks?.length
      ? "<p>Your order includes download links that will be sent separately.</p>"
      : "<p>Your order has been recorded successfully.</p>";

  const customer = await sendTransactionalEmail({
    to: params.customerEmail,
    subject: "Your HiveMind order — HiveMind Productions",
    html: `
      <p>Thanks for your purchase.</p>
      <p>Order reference: <strong>${params.orderId}</strong></p>
      ${params.linesHtml}
      ${fulfillmentHtml}
      <p>— HiveMind Productions · HiveMindMusic.Shop</p>
    `,
  });

  const internal = await sendInternalEmail({
    subject: `New order ${params.orderId}`,
    html: `<p>New paid order</p><p>Order: ${params.orderId}</p>${params.linesHtml}${fulfillmentHtml}`,
  });

  return { customer, internal };
}
