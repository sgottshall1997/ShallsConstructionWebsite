import { Resend } from "resend";
import { COMPANY } from "@shared/company";
import type { InsertContactSubmission } from "@shared/schema";

export type ContactMailResult = { sent: boolean; skipped?: string; id?: string };

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactEmail(data: InsertContactSubmission): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `[${COMPANY.name}] ${data.inquiryType.toUpperCase()} from ${data.firstName} ${data.lastName}`;
  const lines = [
    `Inquiry type: ${data.inquiryType}`,
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Company: ${data.company}` : null,
    data.projectType ? `Project type: ${data.projectType}` : null,
    data.preferredStartDate ? `Preferred start: ${data.preferredStartDate}` : null,
    data.budgetRange ? `Budget: ${data.budgetRange}` : null,
    "",
    "Message:",
    data.message,
  ].filter((l) => l !== null) as string[];

  const text = lines.join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;line-height:1.5">
    <h2>${escapeHtml(subject)}</h2>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(text)}</pre>
  </div>`;
  return { subject, text, html };
}

/**
 * Send a contact-form notification.
 * - Honeypot filled → skip silently (caller should still return 200)
 * - No RESEND_API_KEY (dev) → log the body and return skipped
 * - Production with key → send via Resend
 */
export async function sendContactNotification(
  data: InsertContactSubmission,
): Promise<ContactMailResult> {
  // Honeypot: bots fill "website"
  if (data.website && data.website.trim().length > 0) {
    return { sent: false, skipped: "honeypot" };
  }

  const { subject, text, html } = buildContactEmail(data);
  const to = process.env.FORM_TO_EMAIL || COMPANY.email;
  const from = process.env.FORM_FROM_EMAIL || `${COMPANY.name} <onboarding@resend.dev>`;

  if (!process.env.RESEND_API_KEY) {
    console.log("[contact-email] RESEND_API_KEY not set — logging instead of sending");
    console.log("[contact-email] To:", to);
    console.log("[contact-email] From:", from);
    console.log("[contact-email] Subject:", subject);
    console.log("[contact-email] Body:\n" + text);
    return { sent: false, skipped: "no_api_key" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (result.error) {
    console.error("[contact-email] Resend error:", result.error);
    throw new Error(result.error.message || "Failed to send email");
  }

  return { sent: true, id: result.data?.id };
}
