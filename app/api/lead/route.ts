import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Externt CRM (VarmLead). Hemligheten läses från env och får ALDRIG hårdkodas
// eller exponeras i klientkod – detta körs enbart server-side.
const CRM_WEBHOOK_URL =
  "https://oscar-email-warmup.vercel.app/api/webhooks/contact-form";

type LeadPayload = {
  namn?: unknown;
  epost?: unknown;
  telefon?: unknown;
  meddelande?: unknown;
};

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Skickar leaden vidare till vårt CRM (VarmLead) via webhook.
 * Wrap:ad så att ett misslyckat anrop (nätverksfel, CRM nere, saknad secret)
 * ALDRIG blockerar eller kraschar formulär-svaret till användaren – vi loggar
 * bara utfallet och går vidare. Körs server-side, aldrig i browsern.
 */
async function forwardToCrm(form: {
  name: string;
  email: string;
  phone: string;
  message: string;
  service?: string;
}): Promise<void> {
  const secret = process.env.CRM_INBOUND_SECRET;
  if (!secret) {
    console.warn(
      "[lead] CRM_INBOUND_SECRET saknas – hoppar över CRM-forward.",
    );
    return;
  }

  try {
    const res = await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-inbound-secret": secret,
      },
      body: JSON.stringify({
        source_key: "nordkom",
        email: form.email, // required
        phone: form.phone, // strongly recommended
        name: form.name, // optional
        message: form.message, // optional
        service: form.service, // optional
      }),
    });

    if (res.ok) {
      console.log("[lead] CRM tog emot leaden (status", res.status + ").");
    } else {
      console.error("[lead] CRM-webhook svarade med status", res.status);
    }
  } catch (err) {
    console.error("[lead] Fel vid anrop till CRM-webhook:", err);
  }
}

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ogiltig förfrågan." },
      { status: 400 },
    );
  }

  const namn = asString(body.namn);
  const epost = asString(body.epost);
  const telefon = asString(body.telefon);
  const meddelande = asString(body.meddelande); // valfritt

  // Server-side-validering: alla fält obligatoriska utom fritextfältet.
  if (!namn) {
    return NextResponse.json({ error: "Namn saknas." }, { status: 400 });
  }
  if (!epost || !EMAIL_RE.test(epost)) {
    return NextResponse.json(
      { error: "En giltig e-postadress krävs." },
      { status: 400 },
    );
  }
  if (!telefon || telefon.length < 6) {
    return NextResponse.json(
      { error: "Ett giltigt telefonnummer krävs (minst 6 tecken)." },
      { status: 400 },
    );
  }

  // Skicka vidare till CRM (server-side, secret från env). Fire-and-forget:
  // vi väntar INTE in svaret innan vi kvitterar till besökaren – ett fel eller
  // en långsam/nere CRM-endpoint får aldrig blockera eller krascha formuläret.
  // (forwardToCrm sväljer sina egna fel; .catch är bara en extra säkerhet.)
  void forwardToCrm({
    name: namn,
    email: epost,
    phone: telefon,
    message: meddelande,
    // Formuläret samlar inte in något "service"-fält i v1 -> lämnas tomt.
    service: undefined,
  }).catch(() => {});

  console.log("[lead] Ny förfrågan mottagen:", {
    namn,
    epost,
    telefon,
    meddelande,
    mottagen: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
