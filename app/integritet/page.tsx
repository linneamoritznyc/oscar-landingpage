import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritetspolicy · Nordkom",
  description:
    "Så behandlar Nordkom personuppgifter enligt GDPR. Kort och sakligt.",
  robots: { index: false, follow: false },
};

export default function IntegritetPage() {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-[#e4e0d4]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-2" aria-label="Nordkom, till startsidan">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-ink font-display text-[15px] font-semibold leading-none text-paper"
            >
              N
            </span>
            <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">
              Nordkom
            </span>
          </a>
          <a
            href="/"
            className="font-mono text-[12px] text-slate underline decoration-transparent underline-offset-4 hover:decoration-current hover:text-ink"
          >
            Tillbaka
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-pine">
          Integritetspolicy
        </p>
        <h1 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em] text-ink">
          Så hanterar vi era personuppgifter
        </h1>

        <div className="mt-10 space-y-8 text-[16px] leading-relaxed text-slate">
          <section>
            <h2 className="font-display text-[18px] font-medium text-ink">
              Vilka uppgifter vi samlar in
            </h2>
            <p className="mt-2">
              När ni fyller i formuläret på nordkom.se sparar vi de uppgifter ni
              lämnar: namn, e-postadress, telefonnummer och en eventuell fritext
              om er situation. Vi samlar inte in något mer än så.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[18px] font-medium text-ink">
              Varför vi behandlar dem
            </h2>
            <p className="mt-2">
              Vi behandlar uppgifterna för att kunna återkomma till er angående
              er förfrågan om en kostnadsöversyn. Den rättsliga grunden är
              berättigat intresse: ni har själva tagit kontakt och vi använder
              uppgifterna enbart för att svara på det.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[18px] font-medium text-ink">
              Hur länge vi sparar dem
            </h2>
            <p className="mt-2">
              Vi sparar era uppgifter så länge det behövs för att hantera er
              förfrågan och en eventuell fortsatt dialog. Därefter raderas de.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[18px] font-medium text-ink">
              Era rättigheter
            </h2>
            <p className="mt-2">
              Ni har rätt att få veta vilka uppgifter vi har om er, att få dem
              rättade och att begära radering. Vill ni att vi raderar era
              uppgifter, mejla{" "}
              <a
                href="mailto:hej@nordkom.se"
                className="text-ink underline decoration-[#c7c1b0] underline-offset-4 hover:decoration-ink"
              >
                hej@nordkom.se
              </a>{" "}
              så gör vi det.
            </p>
          </section>

          <section>
            <h2 className="font-display text-[18px] font-medium text-ink">
              Personuppgiftsansvarig
            </h2>
            <p className="mt-2">
              Nordkom (org.nr 000000-0000) är ansvarig för behandlingen. Frågor
              om hur vi hanterar personuppgifter besvaras på{" "}
              <a
                href="mailto:hej@nordkom.se"
                className="text-ink underline decoration-[#c7c1b0] underline-offset-4 hover:decoration-ink"
              >
                hej@nordkom.se
              </a>
              .
            </p>
          </section>

          <p className="border-t border-[#e0dccf] pt-6 font-mono text-[12px] text-slate/80">
            Platshållartext. Org.nr och slutgiltig ordalydelse ska bekräftas
            innan sidan publiceras skarpt.
          </p>
        </div>
      </main>
    </div>
  );
}
