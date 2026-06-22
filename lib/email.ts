import { Resend } from "resend";
import type { Locale } from "@/lib/i18n";

/*
 * Transactional email via Resend. Sender must be a verified domain in Resend
 * (kasymzhanov.com, DKIM). Configure env:
 *   RESEND_API_KEY  — required to actually send (no key → no-op, logged)
 *   EMAIL_FROM      — optional, defaults to the hello@ sender below
 *
 * The newsletter welcome is localized: RU subscribers get the RU copy, EN the
 * EN copy. The subscriber's `locale` is also stored so future campaigns can be
 * segmented by language (wrong-language blasts read as spam).
 */

const FROM = process.env.EMAIL_FROM || "Almas Kasymzhanov <almas@kasymzhanov.com>";
const REPLY_TO = "almas@kasymzhanov.com";
const UNSUB = `<mailto:${REPLY_TO}?subject=unsubscribe>`;

const WELCOME: Record<Locale, { subject: string; heading: string; body: string; sign: string; unsub: string }> = {
  ru: {
    subject: "Вы подписаны на kasymzhanov.com",
    heading: "Спасибо за подписку",
    body: "Буду присылать новые разборы — данные по маркетплейсам, нишам и брендам, без воды.",
    sign: "Алмас Касымжанов · kasymzhanov.com",
    unsub: "Отписаться можно в любой момент — просто ответьте на это письмо.",
  },
  en: {
    subject: "You're subscribed to kasymzhanov.com",
    heading: "Thanks for subscribing",
    body: "I'll send new data-driven pieces — marketplace breakdowns, niches, and brands, no fluff.",
    sign: "Almas Kasymzhanov · kasymzhanov.com",
    unsub: "You can unsubscribe anytime — just reply to this email.",
  },
};

function render(t: (typeof WELCOME)[Locale]): string {
  return `<!doctype html><html><body style="margin:0;background:#ffffff;color:#171717;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">
    <p style="font-weight:700;letter-spacing:0.04em;font-size:15px;margin:0 0 24px;">KASYMZHANOV.COM</p>
    <h1 style="font-size:22px;line-height:1.25;margin:0 0 12px;">${t.heading}</h1>
    <p style="font-size:15px;line-height:1.6;color:#444;margin:0 0 24px;">${t.body}</p>
    <p style="font-size:13px;line-height:1.6;color:#888;margin:0 0 4px;">${t.sign}</p>
    <p style="font-size:12px;line-height:1.6;color:#aaa;margin:24px 0 0;">${t.unsub}</p>
  </div></body></html>`;
}

/** Best-effort welcome email. Never throws — a failed send must not fail the
 *  subscription itself (the row is already saved). */
export async function sendWelcomeEmail(email: string, locale: Locale): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("[email] RESEND_API_KEY not set — skipping welcome email");
    return;
  }
  const t = WELCOME[locale];
  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: t.subject,
      html: render(t),
      text: `${t.heading}\n\n${t.body}\n\n${t.sign}\n${t.unsub}`,
      headers: { "List-Unsubscribe": UNSUB },
    });
  } catch (err) {
    console.error("[email] welcome send failed:", err);
  }
}
