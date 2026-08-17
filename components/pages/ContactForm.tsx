"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VENUE, OCCASIONS } from "@/lib/data";
import { GoldButton } from "@/components/ui/kit";

const SUJETS = [
  "Réservation de table",
  "Privatisation / entreprise",
  "Anniversaire ou événement",
  "Partenariat / booking DJ",
  "Autre question",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({
    nom: "",
    tel: "",
    email: "",
    sujet: SUJETS[0],
    occasion: OCCASIONS[0],
    personnes: "",
    message: "",
  });

  const set = (k: keyof typeof f, v: string) =>
    setF((p) => ({ ...p, [k]: v }));

  const valid = f.nom.trim().length > 1 && f.tel.trim().length >= 8;

  const waHref = useMemo(() => {
    const L = [
      "*DEMANDE — LMB ROYAL NIGHT*",
      "",
      `👤 ${f.nom}`,
      `📞 ${f.tel}`,
      f.email ? `✉️ ${f.email}` : "",
      "",
      `📌 ${f.sujet}`,
      f.personnes ? `👥 ${f.personnes} personne(s)` : "",
      f.occasion ? `🎉 ${f.occasion}` : "",
      "",
      f.message,
    ].filter(Boolean);
    return `https://wa.me/${VENUE.phoneRaw}?text=${encodeURIComponent(L.join("\n"))}`;
  }, [f]);

  const input =
    "w-full border border-line bg-ink-2/60 px-4 py-3.5 text-sm text-cream outline-none transition-colors placeholder:text-cream/25 focus:border-gold";

  return (
    <div className="panel glass p-7 sm:p-10">
      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div key="form" exit={{ opacity: 0, y: -12 }}>
            <p className="label text-gold">Formulaire</p>
            <h2 className="font-display mt-4 text-3xl  text-cream">
              Dites-nous tout
            </h2>
            <p className="mt-3 text-[0.85rem] leading-relaxed text-cream/45">
              Remplissez ce formulaire : il prépare votre message, que vous
              envoyez ensuite d&apos;un clic sur WhatsApp.
            </p>

            <div className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2.5 block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45">
                    Nom & prénom *
                  </span>
                  <input
                    value={f.nom}
                    onChange={(e) => set("nom", e.target.value)}
                    placeholder="Steeve Mbeng"
                    className={input}
                  />
                </label>
                <label className="block">
                  <span className="mb-2.5 block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45">
                    Téléphone *
                  </span>
                  <input
                    value={f.tel}
                    onChange={(e) => set("tel", e.target.value)}
                    placeholder="+241 ..."
                    inputMode="tel"
                    className={input}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2.5 block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45">
                  Email (facultatif)
                </span>
                <input
                  type="email"
                  value={f.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="vous@exemple.com"
                  className={input}
                />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2.5 block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45">
                    Sujet
                  </span>
                  <select
                    value={f.sujet}
                    onChange={(e) => set("sujet", e.target.value)}
                    className={input}
                  >
                    {SUJETS.map((s) => (
                      <option key={s} value={s} className="bg-ink-2">
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2.5 block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45">
                    Nombre de personnes
                  </span>
                  <input
                    value={f.personnes}
                    onChange={(e) => set("personnes", e.target.value)}
                    placeholder="Ex. 8"
                    inputMode="numeric"
                    className={input}
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2.5 block text-[0.62rem] uppercase tracking-[0.2em] text-cream/45">
                  Votre message
                </span>
                <textarea
                  rows={5}
                  value={f.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Décrivez votre demande, la date envisagée, le budget…"
                  className={input}
                />
              </label>
            </div>

            <div className="mt-8">
              <GoldButton onClick={() => setSent(true)} disabled={!valid}>
                Préparer mon message
              </GoldButton>
              {!valid && (
                <p className="mt-3 text-[0.72rem] text-cream/35">
                  Nom et téléphone sont nécessaires.
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/40">
              <span className="font-display text-3xl text-gold">✓</span>
            </div>
            <h2 className="font-display mt-7 text-3xl  text-cream">
              Message prêt
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-[0.88rem] leading-relaxed text-cream/50">
              Il ne reste qu&apos;à l&apos;envoyer. Nous répondons en quelques
              minutes pendant les heures d&apos;ouverture.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-gold px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink transition-all hover:bg-gold-light"
              >
                Envoyer sur WhatsApp
                <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
              </a>
              <button
                onClick={() => setSent(false)}
                className="text-[0.7rem] uppercase tracking-[0.2em] text-cream/45 transition-colors hover:text-gold"
              >
                Modifier mon message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
