import type { Metadata } from "next";
import ReviewPanel from "./ReviewPanel";
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-paper">
      <Header />
      <main>
        <Hero />
        <WhatWeReview />
        <SecondOpinion />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- Header */

function Header() {
  return (
    <header className="border-b border-[#e4e0d4]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Nordkom, till toppen">
          <Wordmark />
        </a>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-slate sm:inline">
          Kostnadsöversyn för företag
        </span>
        <a
          href="#kontakt"
          className="rounded-md border border-[#d3cfc2] px-3.5 py-1.5 font-mono text-[12px] text-ink transition-colors hover:border-ink"
        >
          Se över era kostnader
        </a>
      </div>
    </header>
  );
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2">
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center rounded-[5px] bg-ink font-display text-[15px] font-semibold leading-none text-paper"
      >
        N
      </span>
      <span className="font-display text-[17px] font-semibold tracking-[-0.01em] text-ink">
        Nordkom
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ Hero */

function Hero() {
  return (
    <section id="top" className="border-b border-[#e4e0d4]">
      <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:py-24">
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-pine">
            Second opinion, inte försäljning
          </p>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink">
            Ni betalar förmodligen för mycket för er företags&shy;telefoni.
            Vi tar reda på om det stämmer.
          </h1>
          <p className="mt-6 max-w-prose text-[17px] leading-relaxed text-slate">
            Nordkom går igenom vad ni redan betalar för mobilabonnemang, växel,
            hemsida och SEO — jämför mot vad som faktiskt finns på marknaden och
            säger rakt ut om det går att göra bättre. Ingen agenda, inga priser
            på den här sidan. Bara en ärlig genomgång.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-md bg-ink px-6 py-3 font-display text-[15px] font-medium text-paper transition-colors hover:bg-[#0e2027]"
            >
              Få en kostnadsöversyn
              <Arrow />
            </a>
            <span className="font-mono text-[12px] leading-relaxed text-slate">
              Ni får en sammanställning i klartext.
              <br className="hidden sm:block" /> Ni bestämmer om ni vill gå vidare.
            </span>
          </div>
        </div>

        <div className="lg:pl-4">
          <ReviewPanel />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- What we review */

const REVIEW_ITEMS = [
  {
    title: "Mobilabonnemang",
    body: "Företagsabonnemang hos Tre, Telenor, Telia och Tele2. Vi ser över vad ni betalar per anställd, bindningstider och om upplägget passar hur ni faktiskt jobbar.",
  },
  {
    title: "Företagsväxel",
    body: "Hur samtal styrs, vad växeln kostar att driva och vilka funktioner ni betalar för men inte använder. Ofta det som är svårast att genomskåda i avtalen.",
  },
  {
    title: "Hemsida",
    body: "Driftkostnad, underhåll och bindningstid mot vad ni faktiskt får. Vi säger till om ni sitter fast i något som inte längre motsvarar priset.",
  },
  {
    title: "Sökmotoroptimering",
    body: "Vad SEO-insatsen kostar ställt mot vad den ger. Kommer rätt kunder in via sök, eller betalar ni för aktivitet utan resultat?",
  },
];

function WhatWeReview() {
  return (
    <section
      id="det-vi-ser-over"
      className="border-b border-[#e4e0d4] bg-[#efeee7]"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-prose">
          <SectionLabel>Det vi ser över</SectionLabel>
          <h2 className="mt-4 font-display text-[clamp(1.5rem,3.5vw,2.15rem)] font-semibold leading-tight tracking-[-0.015em] text-ink">
            Fyra poster i samma genomgång — inte fyra saker vi vill sälja
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate">
            De flesta av de här kostnaderna hänger ihop. Därför tittar vi på dem
            samlat och ger er en helhetsbild, i stället för att pitcha en produkt
            i taget.
          </p>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-[#dcd8ca] bg-[#dcd8ca] sm:grid-cols-2">
          {REVIEW_ITEMS.map((item) => (
            <li key={item.title} className="bg-paper p-6 sm:p-7">
              <div className="flex items-baseline gap-3">
                <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-pine" />
                <h3 className="font-display text-[18px] font-medium text-ink">
                  {item.title}
                </h3>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-slate">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Second opinion */

function SecondOpinion() {
  return (
    <section id="varfor" className="border-b border-[#e4e0d4]">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionLabel>Varför en second opinion</SectionLabel>
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3.5vw,2.15rem)] font-semibold leading-tight tracking-[-0.015em] text-ink">
              Avtalen är byggda för att vara svåra att jämföra
            </h2>
          </div>
          <div className="max-w-prose space-y-5 text-[16px] leading-relaxed text-slate">
            <p>
              Företag betalar ofta för mycket för telefoni utan att veta om det.
              Inte för att någon slarvat — utan för att avtalen är ogenomskinliga,
              villkoren ändras vid förlängning och ingen internt har tid att gå
              igenom raderna mot vad marknaden ser ut som idag.
            </p>
            <p>
              Nordkom gör det jobbet åt er. Vi säljer ingen abonnemangsjakt över
              telefon. Vi läser igenom det ni redan har, jämför sakligt och
              berättar var det finns något att hämta — och lika gärna när ni
              redan har ett bra upplägg.
            </p>
            <p className="text-ink">
              En namngiven person hör av sig, inte ett callcenter. Ni får en
              rekommendation ni kan säga nej till.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-[#e4e0d4] bg-[#e4e0d4] sm:grid-cols-3">
          {[
            {
              k: "Vi läser avtalen",
              v: "Ni skickar det ni har. Vi går igenom villkor, bindningstider och vad som faktiskt ingår.",
            },
            {
              k: "Vi jämför sakligt",
              v: "Mot vad som finns på marknaden nu — utan att ni behöver byta något för sakens skull.",
            },
            {
              k: "Ni får beslutsunderlag",
              v: "En sammanställning i klartext. Vad som kan bli bättre, vad som redan är bra, och nästa steg om ni vill ta det.",
            },
          ].map((step) => (
            <div key={step.k} className="bg-paper p-6">
              <p className="font-display text-[15px] font-medium text-ink">
                {step.k}
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-slate">
                {step.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Contact */

function ContactSection() {
  return (
    <section id="kontakt" className="bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#8fb3aa]">
              Be om en kostnadsöversyn
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3.5vw,2.35rem)] font-semibold leading-tight tracking-[-0.015em]">
              Skicka era uppgifter, så återkommer vi
            </h2>
            <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-[#c3ccca]">
              Det här är ingen anmälan till en säljlista. Vi hör av oss för att
              boka in en kort genomgång — och ni avgör därefter om det är värt
              att gå vidare.
            </p>
            <p className="mt-8 font-mono text-[12px] leading-relaxed text-[#8fb3aa]">
              Hellre ett mejl?
              <br />
              <a
                href="mailto:hej@nordkom.se"
                className="text-paper underline decoration-[#4d6e67] underline-offset-4 hover:decoration-paper"
              >
                hej@nordkom.se
              </a>
            </p>
          </div>

          <div className="rounded-lg bg-paper p-6 text-ink sm:p-8">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Footer */

function Footer() {
  return (
    <footer className="bg-ink text-[#9fb0ad]">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 border-t border-[#26454c] px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-[4px] border border-[#3a5a60] font-display text-[12px] font-semibold text-paper"
          >
            N
          </span>
          <span className="font-mono text-[12px]">
            Nordkom · Org.nr 000000-0000
          </span>
        </div>
        <div className="flex items-center gap-5 font-mono text-[12px]">
          <a
            href="/integritet"
            className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current hover:text-paper"
          >
            Integritetspolicy
          </a>
          <a
            href="mailto:hej@nordkom.se"
            className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current hover:text-paper"
          >
            hej@nordkom.se
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------- Bits */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-pine">
      <span aria-hidden="true" className="h-px w-6 bg-pine/50" />
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
