"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<"namn" | "epost" | "telefon", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string>("");

  function validate(data: {
    namn: string;
    epost: string;
    telefon: string;
  }): FieldErrors {
    const next: FieldErrors = {};
    if (!data.namn.trim()) next.namn = "Fyll i ert namn.";
    if (!data.epost.trim()) next.epost = "Fyll i en e-postadress.";
    else if (!EMAIL_RE.test(data.epost)) next.epost = "Kontrollera e-postadressen.";
    if (!data.telefon.trim()) next.telefon = "Fyll i ett telefonnummer.";
    else if (data.telefon.trim().length < 6)
      next.telefon = "Telefonnumret ser kort ut.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = {
      namn: String(fd.get("namn") ?? ""),
      epost: String(fd.get("epost") ?? ""),
      telefon: String(fd.get("telefon") ?? ""),
      meddelande: String(fd.get("meddelande") ?? ""),
    };

    const clientErrors = validate(data);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      // Fokusera första fältet med fel
      const first = Object.keys(clientErrors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setServerError(
          body?.error ?? "Något gick fel. Försök igen om en stund.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setServerError("Kunde inte skicka just nu. Försök igen om en stund.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-md border border-[#d8d4c8] bg-white/70 px-6 py-10 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-pine/40 text-pine">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3.5 8.4 6.6 11.5 12.5 4.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="font-display text-lg text-ink">Tack, vi hör av oss inom kort.</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate">
          Vi läser igenom er förfrågan och återkommer med nästa steg. Ni behöver
          inte göra något mer just nu.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field
        label="Namn"
        name="namn"
        type="text"
        autoComplete="name"
        error={errors.namn}
        required
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="E-post"
          name="epost"
          type="email"
          inputMode="email"
          autoComplete="email"
          error={errors.epost}
          required
        />
        <Field
          label="Telefon"
          name="telefon"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          error={errors.telefon}
          required
        />
      </div>

      <div>
        <label
          htmlFor="meddelande"
          className="mb-1.5 flex items-baseline justify-between"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
            Vad hoppas ni få ut av en genomgång?
          </span>
          <span className="font-mono text-[11px] text-slate/70">valfritt</span>
        </label>
        <textarea
          id="meddelande"
          name="meddelande"
          rows={3}
          className="w-full resize-none rounded-md border border-[#d8d4c8] bg-white/70 px-3.5 py-2.5 text-[15px] text-ink placeholder:text-slate/50 transition-colors focus:border-pine focus:bg-white"
          placeholder="Kort om er situation, t.ex. antal anställda eller vad som känns oklart i era avtal."
        />
      </div>

      {serverError && (
        <p className="text-sm text-[#9a3b28]" role="alert">
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 font-display text-[15px] font-medium text-paper transition-colors hover:bg-[#0e2027] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "submitting" ? "Skickar…" : "Skicka förfrågan"}
        </button>
        <p className="max-w-xs text-[12px] leading-relaxed text-slate">
          Genom att skicka godkänner ni att vi hör av oss angående er förfrågan.
          Inget säljsamtal utan att ni bett om det.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  error,
  required,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
}) {
  const errorId = `${name}-error`;
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
          {label}
        </span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-md border bg-white/70 px-3.5 py-2.5 text-[15px] text-ink placeholder:text-slate/50 transition-colors focus:bg-white ${
          error ? "border-[#9a3b28] focus:border-[#9a3b28]" : "border-[#d8d4c8] focus:border-pine"
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-[12px] text-[#9a3b28]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
