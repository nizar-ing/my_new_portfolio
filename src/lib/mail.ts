import { escapeHtml } from './escape-html';

export interface MailPayload {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

function buildHtml(p: MailPayload): string {
  const rows = [
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;white-space:nowrap">Name</td><td>${escapeHtml(p.name)}</td></tr>`,
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;white-space:nowrap">Email</td><td>${escapeHtml(p.email)}</td></tr>`,
    p.company ? `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;white-space:nowrap">Company</td><td>${escapeHtml(p.company)}</td></tr>` : '',
    `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;white-space:nowrap">Subject</td><td>${escapeHtml(p.subject)}</td></tr>`,
  ]
    .filter(Boolean)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<body style="font-family:sans-serif;color:#223740;max-width:600px;margin:0 auto;padding:24px">
  <h2 style="color:#48afde;margin-top:0">New portfolio contact</h2>
  <table style="border-collapse:collapse;margin-bottom:24px">${rows}</table>
  <h3 style="margin-bottom:8px">Message</h3>
  <div style="background:#eef7fb;padding:16px;border-radius:8px;white-space:pre-wrap">${escapeHtml(p.message)}</div>
</body>
</html>`;
}

export async function sendMail(payload: MailPayload): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) throw new Error('CONTACT_TO_EMAIL is not configured');

  const subject = `[Portfolio] ${payload.subject} — ${payload.name}`;
  const html = buildHtml(payload);

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Replace RESEND_FROM with a sender from your verified domain in production.
    const from = process.env.RESEND_FROM ?? 'Portfolio Contact <onboarding@resend.dev>';
    const { error } = await resend.emails.send({ from, to, replyTo: payload.email, subject, html });
    if (error) throw new Error(error.message);
    return;
  }

  if (process.env.SMTP_HOST) {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({ from: process.env.SMTP_USER, to, replyTo: payload.email, subject, html });
    return;
  }

  throw new Error('No mail provider configured — set RESEND_API_KEY or SMTP_HOST in .env');
}
