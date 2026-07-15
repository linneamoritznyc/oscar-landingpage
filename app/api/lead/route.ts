import { NextResponse } from "next/server";

// TODO: Byt ut mot riktig Google Apps Script Web App-URL
const GOOGLE_SHEET_WEBHOOK_URL = "REPLACE_ME";

/**
 * Så länge GOOGLE_SHEET_WEBHOOK_URL === "REPLACE_ME" skickas ingen lead vidare.
 * Vi loggar bara datan på servern (console.log) och svarar 200 OK, så att
 * formuläret går att testa end-to-end innan Sheet-webhooken är på plats.
 * Byt konstanten ovan mot den riktiga URL:en så börjar POST:en gå iväg.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadPayload = {
  namn?: unknown;
  epost?: unknown;
  telefon?: unknown;
  meddelande?: unknown;
};

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
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

  const lead = {
    namn,
    epost,
    telefon,
    meddelande,
    mottagen: new Date().toISOString(),
  };

  // Placeholder-läge: ingen webhook konfigurerad ännu.
  if (GOOGLE_SHEET_WEBHOOK_URL === "REPLACE_ME") {
    console.log("[lead] Ny förfrågan (webhook ej konfigurerad):", lead);
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Skarpt läge: skicka vidare till Google Apps Script Web App.
  try {
    const res = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    if (!res.ok) {
      console.error("[lead] Webhook svarade med status", res.status);
      return NextResponse.json(
        { error: "Kunde inte ta emot förfrågan just nu." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("[lead] Fel vid anrop till webhook:", err);
    return NextResponse.json(
      { error: "Kunde inte ta emot förfrågan just nu." },
      { status: 502 },
    );
  }
}
