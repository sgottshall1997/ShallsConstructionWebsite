import { Resend } from "resend";
import { COMPANY } from "@shared/company";
import type { InsertContactSubmission } from "@shared/schema";

export type ContactMailResult =
  | { ok: true; sent: true; id?: string }
  | { ok: true; sent: false; skipped: "honeypot" | "dev_no_key" }
  | { ok: false; error: string };

export function buildContactEmail(
  data: InsertContactSubmission,
  meta: { ip?: string; timestamp?: string } = {},
): { subject: string; text: string } {
  const who = data.company?.trim() || `${data.firstName} ${data.lastName}`.trim();
  const subject = `Website inquiry: ${data.inquiryType} — ${who}`;
  const lines = [
    `Inquiry type: ${data.inquiryType}`,
    `Name: ${data.firstName} ${data.lastName}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.company ? `Company: ${data.company}` : null,
    data.projectType ? `Project type: ${data.projectType}` : null,
    data.preferredStartDate ? `Preferred start: ${data.preferredStartDate}` : null,
    data.budgetRange ? `Budget: ${data.budgetRange}` : null,
    meta.timestamp ? `Submitted: ${meta.timestamp}` : null,
    meta.ip ? `IP: ${meta.ip}` : null,
    "",
    "Message:",
    data.message,
  ].filter((l) => l !== null) as string[];

  return { subject, text: lines.join("\n") };
}

/**
 * Send a contact-form notification.
 * - Honeypot filled → skip silently (caller returns 200)
 * - No RESEND_API_KEY in production → error "Form not configured"
 * - No RESEND_API_KEY in development → log body, treat as success (201)
 * - With key → success only if Resend accepted
 */
export async function sendContactNotification(
  data: InsertContactSubmission,
  meta: { ip?: string } = {},
): Promise<ContactMailResult> {
  if (data.website && data.website.trim().length > 0) {
    return { ok: true, sent: false, skipped: "honeypot" };
  }

  const timestamp = new Date().toISOString();
  const { subject, text } = buildContactEmail(data, { ip: meta.ip, timestamp });
  const to = process.env.FORM_TO_EMAIL || COMPANY.email;
  // Default Resend sandbox from-address until the domain is verified.
  const from = process.env.FORM_FROM_EMAIL || "Shall's Website <onboarding@resend.dev>";

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact-email] RESEND_API_KEY missing in production — form not configured");
      return { ok: false, error: "Form not configured" };
    }
    console.log("[contact-email] RESEND_API_KEY not set — logging instead of sending");
    console.log("[contact-email] To:", to);
    console.log("[contact-email] From:", from);
    console.log("[contact-email] Subject:", subject);
    console.log("[contact-email] Body:\n" + text);
    return { ok: true, sent: false, skipped: "dev_no_key" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send({
    from,
    to: [to],
    replyTo: data.email,
    subject,
    text,
  });

  if (result.error) {
    console.error("[contact-email] Resend error:", result.error);
    return { ok: false, error: result.error.message || "Failed to send email" };
  }

  return { ok: true, sent: true, id: result.data?.id };
}
