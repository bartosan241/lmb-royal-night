"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ESPACES,
  CHAMPAGNES,
  SPIRITUEUX,
  EXTRAS,
  OCCASIONS,
  BOUTEILLES,
  VENUE,
  fcfa,
} from "@/lib/data";
import { GoldButton, Badge } from "@/components/ui/kit";
import SeauBuilder, { seauTotals, type SeauState } from "./SeauBuilder";
import FloorPlan, { SPOTS, type Spot } from "./FloorPlan";

const STEPS = [
  { id: 0, label: "La soirée" },
  { id: 1, label: "L'espace" },
  { id: 2, label: "Le seau" },
  { id: 3, label: "Bouteilles" },
  { id: 4, label: "Options" },
  { id: 5, label: "Récapitulatif" },
];

type Form = {
  date: string;
  heure: string;
  personnes: number;
  occasion: string;
  espaceId: string | null;
  spotId: string | null;
  seau: SeauState;
  bottles: Record<string, number>;
  extras: string[];
  nom: string;
  tel: string;
  email: string;
  message: string;
};

const HEURES = ["19:00", "20:00", "21:00", "22:00", "23:00", "00:00", "01:00"];

export default function Reservation() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);

  const [f, setF] = useState<Form>({
    date: "",
    heure: "22:00",
    personnes: 4,
    occasion: OCCASIONS[0],
    espaceId: null,
    spotId: null,
    seau: { formatId: null, picks: {} },
    bottles: {},
    extras: [],
    nom: "",
    tel: "",
    email: "",
    message: "",
  });

  // Deep-link: /reservation?espace=vip
  useEffect(() => {
    const e = params.get("espace");
    if (e && ESPACES.some((x) => x.id === e)) {
      setF((p) => ({ ...p, espaceId: e }));
    }
  }, [params]);

  // Default date = today
  useEffect(() => {
    if (!f.date) {
      const d = new Date();
      setF((p) => ({ ...p, date: d.toISOString().slice(0, 10) }));
    }
  }, [f.date]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  const espace = ESPACES.find((e) => e.id === f.espaceId) ?? null;
  const seauT = seauTotals(f.seau);

  const bottlesTotal = useMemo(
    () =>
      Object.entries(f.bottles).reduce((sum, [id, q]) => {
        const b = [...CHAMPAGNES, ...SPIRITUEUX].find((x) => x.id === id);
        return sum + (b ? b.price * q : 0);
      }, 0),
    [f.bottles]
  );

  const extrasTotal = useMemo(
    () =>
      f.extras.reduce((sum, id) => {
        const e = EXTRAS.find((x) => x.id === id);
        return sum + (e ? e.price : 0);
      }, 0),
    [f.extras]
  );

  const consommation = seauT.total + bottlesTotal;
  const minSpend = espace?.minSpend ?? 0;
  const complement = Math.max(0, minSpend - consommation);
  const estimation = consommation + extrasTotal + complement;

  /* ---------- validation par étape ---------- */
  const canNext = useMemo(() => {
    if (step === 0) return !!f.date && !!f.heure && f.personnes > 0;
    if (step === 1) return !!f.espaceId;
    return true;
  }, [step, f]);

  const canSubmit = f.nom.trim().length > 1 && f.tel.trim().length >= 8;

  /* ---------- message WhatsApp ---------- */
  const waMessage = useMemo(() => {
    const L: string[] = [];
    L.push("*NOUVELLE RÉSERVATION — LMB ROYAL NIGHT*");
    L.push("");
    L.push(`👤 ${f.nom || "—"}`);
    L.push(`📞 ${f.tel || "—"}`);
    if (f.email) L.push(`✉️ ${f.email}`);
    L.push("");
    L.push(`📅 ${f.date} à ${f.heure}`);
    L.push(`👥 ${f.personnes} personne(s)`);
    L.push(`🎉 ${f.occasion}`);
    if (espace) L.push(`📍 ${espace.name}${f.spotId ? ` — emplacement ${f.spotId}` : ""}`);

    if (seauT.count > 0) {
      L.push("");
      L.push(`🪣 *${seauT.format?.name ?? "Bouteilles à l'unité"}* (${seauT.count})`);
      Object.entries(f.seau.picks).forEach(([id, q]) => {
        const b = BOUTEILLES.find((x) => x.id === id);
        if (b) L.push(`   • ${q}× ${b.name}`);
      });
      L.push(`   → ${fcfa(seauT.total)}`);
    }

    const bottleLines = Object.entries(f.bottles);
    if (bottleLines.length) {
      L.push("");
      L.push("🍾 *Bouteilles*");
      bottleLines.forEach(([id, q]) => {
        const b = [...CHAMPAGNES, ...SPIRITUEUX].find((x) => x.id === id);
        if (b) L.push(`   • ${q}× ${b.name} — ${fcfa(b.price * q)}`);
      });
    }

    if (f.extras.length) {
      L.push("");
      L.push("✨ *Options*");
      f.extras.forEach((id) => {
        const e = EXTRAS.find((x) => x.id === id);
        if (e) L.push(`   • ${e.name} — ${fcfa(e.price)}`);
      });
    }

    if (complement > 0) {
      L.push("");
      L.push(`⚖️ Complément minimum de conso. : ${fcfa(complement)}`);
    }

    L.push("");
    L.push(`💰 *ESTIMATION : ${fcfa(estimation)}*`);
    if (f.message) {
      L.push("");
      L.push(`📝 ${f.message}`);
    }
    return L.join("\n");
  }, [f, espace, seauT, complement, estimation]);

  const waHref = `https://wa.me/${VENUE.phoneRaw}?text=${encodeURIComponent(waMessage)}`;

  const toggleExtra = (id: string) =>
    set(
      "extras",
      f.extras.includes(id) ? f.extras.filter((x) => x !== id) : [...f.extras, id]
    );

  const setBottle = (id: string, delta: number) => {
    const cur = f.bottles[id] ?? 0;
    const next = Math.max(0, cur + delta);
    const b = { ...f.bottles };
    if (next === 0) delete b[id];
    else b[id] = next;
    set("bottles", b);
  };

  /* ================================================================ */

  if (sent) {
    return <Confirmation form={f} estimation={estimation} waHref={waHref} />;
  }

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-28 sm:px-8">
      <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        {/* ---------------- Colonne principale ---------------- */}
        <div>
          {/* Stepper */}
          <div className="sticky top-16 z-30 -mx-5 mb-10 bg-ink/92 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              {STEPS.map((s, i) => {
                const done = i < step;
                const active = i === step;
                return (
                  <button
                    key={s.id}
                    onClick={() => i <= step && setStep(i)}
                    disabled={i > step}
                    className="group flex shrink-0 items-center gap-1"
                  >
                    <span
                      className={`flex items-center gap-2 whitespace-nowrap px-3 py-2 text-[0.63rem] uppercase tracking-[0.14em] transition-colors ${
                        active
                          ? "text-gold"
                          : done
                            ? "text-cream/55 hover:text-gold-light"
                            : "text-cream/22"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border text-[0.6rem] ${
                          active
                            ? "border-gold bg-gold text-ink"
                            : done
                              ? "border-gold/50 text-gold"
                              : "border-cream/15"
                        }`}
                      >
                        {done ? "✓" : i + 1}
                      </span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </span>
                    {i < STEPS.length - 1 && (
                      <span
                        className={`h-px w-4 sm:w-6 ${done ? "bg-gold/50" : "bg-cream/10"}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ---------- 0 · Soirée ---------- */}
              {step === 0 && (
                <StepShell
                  n="01"
                  title="Quand venez-vous ?"
                  intro="Indiquez la date, l'heure d'arrivée et le nombre de convives. Nous gardons votre table 45 minutes après l'heure indiquée."
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Date">
                      <input
                        type="date"
                        value={f.date}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => set("date", e.target.value)}
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Heure d'arrivée">
                      <div className="flex flex-wrap gap-2">
                        {HEURES.map((h) => (
                          <button
                            key={h}
                            onClick={() => set("heure", h)}
                            className={`px-4 py-2.5 text-[0.72rem] tracking-[0.1em] transition-all duration-300 ${
                              f.heure === h
                                ? "border border-gold bg-gold text-ink"
                                : "panel text-cream/60 hover:border-gold/55 hover:text-gold-light"
                            }`}
                          >
                            {h}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <Field label="Nombre de personnes">
                      <div className="panel flex items-center justify-between px-5 py-3">
                        <button
                          onClick={() => set("personnes", Math.max(1, f.personnes - 1))}
                          className="text-xl text-gold transition-opacity hover:opacity-70"
                          aria-label="Moins"
                        >
                          −
                        </button>
                        <span className="font-display text-3xl text-cream">
                          {f.personnes}
                        </span>
                        <button
                          onClick={() => set("personnes", Math.min(200, f.personnes + 1))}
                          className="text-xl text-gold transition-opacity hover:opacity-70"
                          aria-label="Plus"
                        >
                          +
                        </button>
                      </div>
                    </Field>

                    <Field label="Occasion">
                      <select
                        value={f.occasion}
                        onChange={(e) => set("occasion", e.target.value)}
                        className={inputCls}
                      >
                        {OCCASIONS.map((o) => (
                          <option key={o} value={o} className="bg-ink-2">
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </StepShell>
              )}

              {/* ---------- 1 · Espace ---------- */}
              {step === 1 && (
                <StepShell
                  n="02"
                  title="Où souhaitez-vous être installé ?"
                  intro="Chaque espace a son minimum de consommation — intégralement consommé en bouteilles et en cuisine. Cliquez ensuite sur le plan pour choisir votre emplacement exact."
                >
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {ESPACES.map((e) => {
                      const active = f.espaceId === e.id;
                      const tooSmall = f.personnes > e.capMax;
                      return (
                        <button
                          key={e.id}
                          onClick={() => {
                            set("espaceId", e.id);
                            set("spotId", null);
                          }}
                          className={`group relative overflow-hidden text-left transition-all duration-400 ${
                            active ? "border border-gold" : "panel hover:border-gold/50"
                          }`}
                        >
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img
                              src={e.image}
                              alt={e.name}
                              className="h-full w-full object-cover transition-transform duration-[1.1s] group-hover:scale-108"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                            {active && (
                              <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[0.7rem] text-ink">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="p-5">
                            <p className="font-display text-xl text-cream">{e.name}</p>
                            <p className="mt-1 text-[0.7rem] text-cream/40">
                              {e.capacity}
                            </p>
                            <p className="mt-3 text-sm text-gold">
                              {e.minSpend >= 1500000
                                ? "Sur devis"
                                : `min. ${fcfa(e.minSpend)}`}
                            </p>
                            {tooSmall && (
                              <p className="mt-2 text-[0.66rem] text-cream/35">
                                Capacité inférieure à votre groupe
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {espace && espace.id !== "privatisation" && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-10"
                    >
                      <p className="label mb-4 text-gold">
                        Choisissez votre emplacement
                      </p>
                      <FloorPlan
                        selected={f.spotId}
                        onSelect={(id) => set("spotId", id)}
                        filterZone={espace.id as Spot["zone"]}
                      />
                      {f.spotId && (
                        <p className="mt-3 text-sm text-gold">
                          Emplacement {f.spotId} sélectionné —{" "}
                          {SPOTS.find((s) => s.id === f.spotId)?.label}
                        </p>
                      )}
                    </motion.div>
                  )}
                </StepShell>
              )}

              {/* ---------- 2 · Seau ---------- */}
              {step === 2 && (
                <StepShell
                  n="03"
                  title="Composez votre seau"
                  intro="Panachez librement bières, Booster et premix. La remise du format s'applique automatiquement — et vous pouvez tout à fait passer cette étape."
                >
                  <SeauBuilder value={f.seau} onChange={(v) => set("seau", v)} />
                </StepShell>
              )}

              {/* ---------- 3 · Bouteilles ---------- */}
              {step === 3 && (
                <StepShell
                  n="04"
                  title="Champagnes & spiritueux"
                  intro="Toute bouteille commandée arrive avec seau, glace, softs et sparklers. Le défilé se commande à l'étape suivante."
                >
                  <BottleGrid
                    title="Cave à champagne"
                    items={CHAMPAGNES}
                    picks={f.bottles}
                    onChange={setBottle}
                  />
                  <div className="mt-12">
                    <BottleGrid
                      title="Spiritueux"
                      items={SPIRITUEUX}
                      picks={f.bottles}
                      onChange={setBottle}
                    />
                  </div>
                </StepShell>
              )}

              {/* ---------- 4 · Options ---------- */}
              {step === 4 && (
                <StepShell
                  n="05"
                  title="Les détails qui font la soirée"
                  intro="Sparklers, défilé, gâteau, photographe : ajoutez ce qu'il faut pour marquer le coup."
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {EXTRAS.map((e) => {
                      const active = f.extras.includes(e.id);
                      return (
                        <button
                          key={e.id}
                          onClick={() => toggleExtra(e.id)}
                          className={`flex items-start justify-between gap-4 p-5 text-left transition-all duration-300 ${
                            active
                              ? "border border-gold bg-gold/8"
                              : "panel hover:border-gold/45"
                          }`}
                        >
                          <div>
                            <p className="font-display text-lg text-cream">{e.name}</p>
                            <p className="mt-1.5 text-[0.78rem] leading-relaxed text-cream/45">
                              {e.desc}
                            </p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-sm text-gold">{fcfa(e.price)}</p>
                            <span
                              className={`mt-2 flex h-5 w-5 items-center justify-center rounded-full border text-[0.62rem] ${
                                active
                                  ? "border-gold bg-gold text-ink"
                                  : "border-cream/20 text-transparent"
                              }`}
                            >
                              ✓
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-8">
                    <Field label="Demande particulière (facultatif)">
                      <textarea
                        rows={4}
                        value={f.message}
                        onChange={(e) => set("message", e.target.value)}
                        placeholder="Allergies, playlist, prénom à afficher sur le message LED, disposition souhaitée…"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </StepShell>
              )}

              {/* ---------- 5 · Récap ---------- */}
              {step === 5 && (
                <StepShell
                  n="06"
                  title="Vos coordonnées"
                  intro="Dernière étape. Votre demande part sur le WhatsApp de la maison ; un responsable confirme la table sous 30 minutes."
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Nom & prénom *">
                      <input
                        value={f.nom}
                        onChange={(e) => set("nom", e.target.value)}
                        placeholder="Ex. Steeve Mbeng"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Téléphone / WhatsApp *">
                      <input
                        value={f.tel}
                        onChange={(e) => set("tel", e.target.value)}
                        placeholder="+241 ..."
                        inputMode="tel"
                        className={inputCls}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field label="Email (facultatif)">
                        <input
                          type="email"
                          value={f.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="vous@exemple.com"
                          className={inputCls}
                        />
                      </Field>
                    </div>
                  </div>

                  <div className="panel mt-8 bg-ink-2/60 p-6">
                    <p className="label text-gold">Moyens de paiement sur place</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Espèces", "Carte bancaire", "Airtel Money", "Moov Money"].map(
                        (m) => (
                          <span
                            key={m}
                            className="panel px-4 py-1.5 text-[0.7rem] text-cream/65"
                          >
                            {m}
                          </span>
                        )
                      )}
                    </div>
                    <p className="mt-4 text-[0.75rem] leading-relaxed text-cream/40">
                      Aucun paiement n&apos;est demandé en ligne. Pour les loges
                      et les privatisations, un acompte par mobile money peut
                      être requis afin de bloquer la date.
                    </p>
                  </div>
                </StepShell>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-8">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/45 transition-colors hover:text-gold disabled:opacity-25"
            >
              ← Retour
            </button>

            {step < STEPS.length - 1 ? (
              <GoldButton
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                disabled={!canNext}
              >
                Continuer
              </GoldButton>
            ) : (
              <GoldButton onClick={() => setSent(true)} disabled={!canSubmit}>
                Valider ma demande
              </GoldButton>
            )}
          </div>
          {step === STEPS.length - 1 && !canSubmit && (
            <p className="mt-3 text-right text-[0.72rem] text-cream/35">
              Renseignez votre nom et votre téléphone pour valider.
            </p>
          )}
        </div>

        {/* ---------------- Panier ---------------- */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="panel glass p-7">
            <p className="label text-gold">Votre soirée</p>

            <div className="mt-6 space-y-4 text-sm">
              <Line
                label="Date"
                value={f.date ? `${f.date} · ${f.heure}` : "—"}
              />
              <Line label="Convives" value={`${f.personnes} personne(s)`} />
              <Line
                label="Espace"
                value={
                  espace
                    ? `${espace.name}${f.spotId ? ` · ${f.spotId}` : ""}`
                    : "À choisir"
                }
              />
            </div>

            <div className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
              {seauT.count > 0 && (
                <Line
                  label={
                    seauT.format
                      ? `${seauT.format.name} (${seauT.count}/${seauT.format.count})`
                      : `Bouteilles (${seauT.count})`
                  }
                  value={fcfa(seauT.total)}
                  gold
                  hint={
                    seauT.format && seauT.count < seauT.format.count
                      ? "Seau incomplet — à compléter sur place"
                      : undefined
                  }
                />
              )}
              {bottlesTotal > 0 && (
                <Line label="Champagnes & spiritueux" value={fcfa(bottlesTotal)} gold />
              )}
              {extrasTotal > 0 && (
                <Line label={`Options (${f.extras.length})`} value={fcfa(extrasTotal)} gold />
              )}
              {complement > 0 && espace && (
                <Line
                  label="Complément min. conso."
                  value={fcfa(complement)}
                  hint={`Minimum ${fcfa(minSpend)} sur cet espace`}
                />
              )}
              {seauT.count === 0 && bottlesTotal === 0 && extrasTotal === 0 && (
                <p className="text-[0.78rem] text-cream/35">
                  Rien de sélectionné pour l&apos;instant — vous pourrez aussi
                  commander sur place.
                </p>
              )}
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-line pt-6">
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cream/40">
                  Estimation
                </p>
                <p className="mt-1 text-[0.65rem] text-cream/30">
                  hors commandes sur place
                </p>
              </div>
              <motion.p
                key={estimation}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl text-gold"
              >
                {fcfa(estimation)}
              </motion.p>
            </div>

            {seauT.economie > 0 && (
              <p className="mt-3 text-[0.72rem] text-gold/70">
                ✦ Vous économisez {fcfa(seauT.economie)} grâce au format seau.
              </p>
            )}
          </div>

          <div className="panel mt-4 p-5">
            <p className="text-[0.72rem] leading-relaxed text-cream/45">
              Une question avant de valider ? Appelez-nous au{" "}
              <a
                href={`tel:${VENUE.phone.replace(/\s/g, "")}`}
                className="text-gold"
              >
                {VENUE.phone}
              </a>
              .
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Sous-composants                                                    */
/* ================================================================== */

const inputCls =
  "w-full border border-line bg-ink-2/60 px-4 py-3.5 text-sm text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-gold";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-3 block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45">
        {label}
      </span>
      {children}
    </label>
  );
}

function StepShell({
  n,
  title,
  intro,
  children,
}: {
  n: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-9">
        <span className="font-display text-sm text-gold/50">{n}</span>
        <h2 className="font-display mt-2 text-3xl  text-cream sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-xl text-[0.88rem] leading-relaxed text-cream/45">
          {intro}
        </p>
      </div>
      {children}
    </div>
  );
}

function Line({
  label,
  value,
  gold,
  hint,
}: {
  label: string;
  value: string;
  gold?: boolean;
  hint?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-cream/45">
        {label}
        {hint && (
          <span className="mt-0.5 block text-[0.65rem] text-cream/25">{hint}</span>
        )}
      </span>
      <span className={gold ? "shrink-0 text-gold" : "shrink-0 text-cream/75"}>
        {value}
      </span>
    </div>
  );
}

function BottleGrid({
  title,
  items,
  picks,
  onChange,
}: {
  title: string;
  items: typeof CHAMPAGNES;
  picks: Record<string, number>;
  onChange: (id: string, delta: number) => void;
}) {
  return (
    <div>
      <p className="label mb-5 text-gold">{title}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((b) => {
          const q = picks[b.id] ?? 0;
          return (
            <div
              key={b.id}
              className={`flex items-center justify-between gap-4 p-4 transition-colors duration-300 ${
                q > 0 ? "border border-gold/60 bg-gold/8" : "panel hover:border-gold/40"
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-display text-base text-cream">
                    {b.name}
                  </p>
                  {b.tag && <Badge>{b.tag}</Badge>}
                </div>
                <p className="mt-0.5 text-[0.68rem] text-cream/40">
                  {b.house} · {b.vol}
                </p>
                <p className="mt-1 text-sm text-gold">{fcfa(b.price)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => onChange(b.id, -1)}
                  disabled={q === 0}
                  aria-label={`Retirer ${b.name}`}
                  className="flex h-8 w-8 items-center justify-center border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-gold"
                >
                  −
                </button>
                <span
                  className={`w-5 text-center font-display text-lg ${q > 0 ? "text-gold" : "text-cream/25"}`}
                >
                  {q}
                </span>
                <button
                  onClick={() => onChange(b.id, 1)}
                  aria-label={`Ajouter ${b.name}`}
                  className="flex h-8 w-8 items-center justify-center border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-ink"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Confirmation({
  form,
  estimation,
  waHref,
}: {
  form: Form;
  estimation: number;
  waHref: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 pb-32 text-center sm:px-8">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold/40"
      >
        <span className="font-display text-4xl text-gold">✓</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="font-display mt-9 text-4xl  text-cream sm:text-5xl"
      >
        Demande enregistrée
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mx-auto mt-5 max-w-md text-[0.92rem] leading-relaxed text-cream/55"
      >
        Merci {form.nom.split(" ")[0]}. Dernière étape : envoyez votre
        récapitulatif sur notre WhatsApp — un responsable vous confirme la table
        sous 30 minutes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="panel mx-auto mt-10 max-w-sm p-6 text-left"
      >
        <div className="flex justify-between text-sm">
          <span className="text-cream/45">Date</span>
          <span className="text-cream/80">
            {form.date} · {form.heure}
          </span>
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-cream/45">Convives</span>
          <span className="text-cream/80">{form.personnes}</span>
        </div>
        <div className="mt-4 flex justify-between border-t border-line pt-4">
          <span className="text-cream/45">Estimation</span>
          <span className="font-display text-xl text-gold">{fcfa(estimation)}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      >
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-3 bg-gold px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink transition-all hover:bg-gold-light"
        >
          Envoyer sur WhatsApp
          <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
        </a>
        <GoldButton href="/" variant="outline">
          Retour à l&apos;accueil
        </GoldButton>
      </motion.div>
    </div>
  );
}
