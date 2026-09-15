"use server";

import nodemailer from "nodemailer";
import { dicts } from "@/lib/dict";
import { defaultLang, isLang } from "@/lib/i18n";
import { contact } from "@/lib/site";

export type FormState = {
  ok: boolean;
  message: string;
};

const MAX = { name: 120, email: 160, subject: 160, body: 4000 };

export async function sendEnquiry(
  _prev: FormState | null,
  data: FormData
): Promise<FormState> {
  const name = String(data.get("name") ?? "").trim().slice(0, MAX.name);
  const email = String(data.get("email") ?? "").trim().slice(0, MAX.email);
  const subject = String(data.get("subject") ?? "").trim().slice(0, MAX.subject);
  const body = String(data.get("body") ?? "").trim().slice(0, MAX.body);
  // Root params are not readable in Server Actions, so the form posts its language.
  const lang = String(data.get("lang") ?? "");
  const t = dicts[isLang(lang) ? lang : defaultLang].contact;

  if (!name || !email || !body) {
    return { ok: false, message: t.errRequired };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, message: t.errEmail };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Mail transport is not wired up yet — say so instead of pretending to send.
    console.warn("[contact] SMTP is not configured; enquiry was not sent.");
    return {
      ok: false,
      message: t.errNoSmtp(contact.phone, contact.email),
    };
  }

  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT ?? 465),
      secure: Number(SMTP_PORT ?? 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transport.sendMail({
      from: `"სერვის პრო — საიტი" <${SMTP_USER}>`,
      to: MAIL_TO ?? contact.email,
      replyTo: email,
      subject: subject || `ახალი მიმართვა საიტიდან — ${name}`,
      text: [
        `სახელი: ${name}`,
        `ელ-ფოსტა: ${email}`,
        `თემა: ${subject || "—"}`,
        "",
        body,
      ].join("\n"),
    });

    return {
      ok: true,
      message: t.sent,
    };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return {
      ok: false,
      message: t.errSend(contact.phone),
    };
  }
}
