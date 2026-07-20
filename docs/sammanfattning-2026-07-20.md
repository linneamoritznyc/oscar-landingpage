# Nordkom landningssida — sammanfattning

**Datum:** 20 juli 2026
**Projekt:** nordkom.se (landningssida) + koppling till VarmLead CRM
**Repo:** `linneamoritznyc/oscar-landingpage`

---

## Vad som byggdes idag

### 1. Landningssidan (nordkom.se)
En distinkt, professionell landningssida för Nordkom — ett svenskt telecom-/rådgivningsföretag. Byggd i **Next.js (App Router) + TypeScript + Tailwind CSS**, fullt responsiv ner till 375px, tillgänglighet på AA-nivå med tangentbordsfokus och `prefers-reduced-motion`.

- **Positionering:** "second opinion / kostnadsöversyn", inte "operatörsåterförsäljare".
- **Guardrails som hölls:** inga priser, inga påhittade case/kundnamn, lågtröskel-CTA ("Få en kostnadsöversyn"), lugn bekräftelse utan konfetti, GDPR-rad + integritetspolicy.
- **Designriktning:** lugn "rapport/instrument"-stil (FT-digitalt-vibe) med petrol/furugrön-palett och typsnitten Familjen Grotesk + Inter + IBM Plex Mono. Medvetet vald för att undvika generisk AI-estetik (cream + terrakotta).
- **Signaturelement:** en "Kostnadsöversyn"-panel som granskar posterna (mobilabonnemang, växel, hemsida, SEO) en i taget med en scan-linje.

### 2. Designjusteringar efter feedback
Sidan var för textbaserad och monoton. Åtgärdat:
- **Fyra kategorispecifika ikoner** (SIM-kort, växelnoder, webbläsarfönster, förstoringsglas + staplar) så sektionen går att skanna.
- **Widgeten markerad som "Exempel"** med tydlig etikett + ny statustext, så den inte läses som en live-status.
- **1-2-3-processen** fick numrerade steg med kopplande linje i stället för tre likadana textstycken.

### 3. Språkstädning
Alla em-tankstreck (—) i copy och metadata ersattes med naturlig svensk skiljeteckensättning (komma, punkt, titelavgränsare).

---

## CRM-integration (VarmLead)

Kontaktformuläret kopplades till **VarmLead** (`oscar-email-warmup.vercel.app`), Oskars egenbyggda CRM.

**Så fungerar det:**
```
nordkom.se-formulär → /api/lead (server-side) → VarmLead webhook
  → Samtalskö (klient: Demo Telecom AB) → redo för säljare
```

- Formuläret POST:ar till den egna API-routen `app/api/lead/route.ts`, som i sin tur skickar leaden vidare till VarmLead med `source_key: "nordkom"` och headern `x-inbound-secret`.
- **Hemligheten** (`CRM_INBOUND_SECRET`) läses från env-variabel, körs enbart server-side och exponeras aldrig i klienten. Samma värde är satt på båda sidor (heter `INBOUND_WEBHOOK_SECRET` hos Oskar).
- **Fire-and-forget:** besökaren får svar direkt; ett fel eller nere CRM blockerar aldrig formuläret (try/catch + secret-guard).
- Död Google Sheet-kod (ursprunglig plan, ersatt av VarmLead) togs bort. Success-loggning lades till.

---

## Verifiering

- Testade formuläret på live-sidan; leaden landade **inte** i Samtalskön vid första anblick.
- **Orsak:** klient-filtret i VarmLead stod på fel klient ("Testklient AB (seed)"). Leaden mappas till klienten **"Demo Telecom AB"**.
- När rätt klient valdes syntes test-leaden ("Test Hej Oskar") korrekt, taggad som **"Kontaktformulär (inbound)"**, redo att ringas.
- **Slutsats:** hela kedjan bekräftad end-to-end. Ingen bugg i kod eller nyckel — bara fel klientvy vald.

---

## Kvarstående (business-admin, inte kod)

- [ ] Byt test-leaden "Test Hej Oskar" till hanterad / radera den så ingen säljare ringer testnumret.
- [ ] Byt platshållar-**org.nr** (`000000-0000`) i footern och på `/integritet` mot det riktiga.
- [ ] Säkerställ att **`hej@nordkom.se`** finns / vidarebefordrar.
- [ ] Visa kunden (Oscar) sidan på https://www.nordkom.se för feedback.

---

## Länkar

- **Live:** https://www.nordkom.se
- **Repo:** `linneamoritznyc/oscar-landingpage` (branch `main`)
