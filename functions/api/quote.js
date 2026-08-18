// Cloudflare Pages Function: receive quote form submissions and email them
// via MailChannels. No API key required, but you must add the Domain Lockdown
// DNS record for your Cloudflare workers.dev subdomain.

export async function onRequestPost(context) {
  const { request, env } = context;

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ success: false, error: "Invalid JSON body" }, 400);
  }

  const {
    name,
    company,
    email,
    phone,
    product,
    quantity,
    message,
  } = payload || {};

  if (!name || !company || !email) {
    return jsonResponse(
      { success: false, error: "Name, company and email are required" },
      400
    );
  }

  // Basic email sanity check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return jsonResponse(
      { success: false, error: "Please enter a valid email address" },
      400
    );
  }

  const recipient = env.RECIPIENT_EMAIL || "sarah@gzchanfer.com";
  const fromEmail = env.FROM_EMAIL || "noreply@chanfercard.com";
  const fromName = env.FROM_NAME || "CHANFER Quote Form";

  const subject = `New quote request from ${company} - ${name}`;

  const textBody = buildTextBody({
    name,
    company,
    email,
    phone,
    product,
    quantity,
    message,
  });

  const htmlBody = buildHtmlBody({
    name,
    company,
    email,
    phone,
    product,
    quantity,
    message,
  });

  const personalizations = [
    {
      to: [{ email: recipient, name: "Sales Team" }],
      reply_to: { email, name: name || email },
    },
  ];

  if (env.CC_EMAIL) {
    personalizations[0].cc = [{ email: env.CC_EMAIL }];
  }

  try {
    const mcResponse = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        personalizations,
        from: { email: fromEmail, name: fromName },
        subject,
        content: [
          { type: "text/plain", value: textBody },
          { type: "text/html", value: htmlBody },
        ],
      }),
    });

    if (!mcResponse.ok) {
      const errorText = await mcResponse.text();
      console.error(
        `MailChannels error: ${mcResponse.status} ${mcResponse.statusText}`,
        errorText
      );
      return jsonResponse(
        {
          success: false,
          error:
            "The email service returned an error. Please try again or contact us directly.",
          details: errorText,
        },
        502
      );
    }

    return jsonResponse({ success: true });
  } catch (err) {
    console.error("Quote form error:", err);
    return jsonResponse(
      {
        success: false,
        error:
          "Something went wrong while sending your inquiry. Please try again or contact us directly.",
      },
      500
    );
  }
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function buildTextBody({
  name,
  company,
  email,
  phone,
  product,
  quantity,
  message,
}) {
  return [
    `New quote request from chanfercard.com`,
    ``,
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Product type: ${product || "Not selected"}`,
    `Monthly quantity: ${quantity || "Not selected"}`,
    ``,
    `Project details:`,
    message || "Not provided",
    ``,
    `---`,
    `Submitted from CHANFER Card Packaging quote form`,
  ].join("\n");
}

function buildHtmlBody({
  name,
  company,
  email,
  phone,
  product,
  quantity,
  message,
}) {
  return `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937;">
    <h2 style="color: #166534;">New quote request from chanfercard.com</h2>
    <table style="border-collapse: collapse; max-width: 600px;">
      <tr><td style="padding: 6px 12px 6px 0; font-weight: bold;">Name</td><td>${escapeHtml(name)}</td></tr>
      <tr><td style="padding: 6px 12px 6px 0; font-weight: bold;">Company</td><td>${escapeHtml(company)}</td></tr>
      <tr><td style="padding: 6px 12px 6px 0; font-weight: bold;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
      <tr><td style="padding: 6px 12px 6px 0; font-weight: bold;">Phone</td><td>${escapeHtml(phone || "Not provided")}</td></tr>
      <tr><td style="padding: 6px 12px 6px 0; font-weight: bold;">Product type</td><td>${escapeHtml(product || "Not selected")}</td></tr>
      <tr><td style="padding: 6px 12px 6px 0; font-weight: bold;">Monthly quantity</td><td>${escapeHtml(quantity || "Not selected")}</td></tr>
    </table>
    <h3 style="margin-top: 24px;">Project details</h3>
    <p style="white-space: pre-wrap;">${escapeHtml(message || "Not provided")}</p>
    <hr style="margin-top: 32px; border: none; border-top: 1px solid #e5e7eb;" />
    <p style="font-size: 12px; color: #6b7280;">Submitted from CHANFER Card Packaging quote form</p>
  </body>
</html>`;
}

function escapeHtml(str) {
  if (typeof str !== "string") return String(str);
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
