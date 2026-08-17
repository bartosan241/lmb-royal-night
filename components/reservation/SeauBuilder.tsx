"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  BOUTEILLES,
  CAT_LABEL,
  SEAUX,
  fcfa,
  type Bouteille,
} from "@/lib/data";
import { Badge } from "@/components/ui/kit";

export type SeauState = {
  formatId: string | null;
  picks: Record<string, number>;
};

export function seauTotals(state: SeauState) {
  const format = SEAUX.find((s) => s.id === state.formatId) ?? null;
  const count = Object.values(state.picks).reduce((a, b) => a + b, 0);
  const brut = Object.entries(state.picks).reduce((sum, [id, q]) => {
    const b = BOUTEILLES.find((x) => x.id === id);
    return sum + (b ? b.unit * q : 0);
  }, 0);
  const discount = format ? format.discount : 0;
  const total = Math.round((brut * (1 - discount)) / 100) * 100;
  return { format, count, brut, discount, total, economie: brut - total };
}

export default function SeauBuilder({
  value,
  onChange,
}: {
  value: SeauState;
  onChange: (v: SeauState) => void;
}) {
  const [cat, setCat] = useState<Bouteille["cat"] | "all">("all");
  const { format, count, total, economie } = seauTotals(value);
  const target = format?.count ?? 0;
  const remaining = Math.max(0, target - count);
  const over = format ? count > target : false;

  const list = useMemo(
    () => (cat === "all" ? BOUTEILLES : BOUTEILLES.filter((b) => b.cat === cat)),
    [cat]
  );

  const setQty = (id: string, delta: number) => {
    const cur = value.picks[id] ?? 0;
    const next = Math.max(0, cur + delta);
    // Block going over the chosen format.
    if (delta > 0 && format && count >= format.count) return;
    const picks = { ...value.picks };
    if (next === 0) delete picks[id];
    else picks[id] = next;
    onChange({ ...value, picks });
  };

  const pickFormat = (id: string) => {
    const f = SEAUX.find((s) => s.id === id);
    const isSame = value.formatId === id;
    // Trim selection if the new format is smaller.
    let picks = value.picks;
    if (f && count > f.count) picks = {};
    onChange({ formatId: isSame ? null : id, picks: isSame ? picks : picks });
  };

  return (
    <div className="space-y-10">
      {/* Formats */}
      <div>
        <p className="label mb-5 text-gold">1 · Choisissez un format</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SEAUX.map((s) => {
            const active = value.formatId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => pickFormat(s.id)}
                className={`relative overflow-hidden p-5 text-left transition-all duration-400 ${
                  active
                    ? "border border-gold bg-gold/10"
                    : "panel hover:border-gold/50"
                }`}
              >
                {s.badge && (
                  <span className="absolute right-3 top-3">
                    <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[0.5rem] uppercase tracking-[0.12em] text-gold">
                      {s.badge}
                    </span>
                  </span>
                )}
                <p
                  className={`font-display text-4xl leading-none transition-colors ${
                    active ? "text-gold" : "text-gold/30"
                  }`}
                >
                  {s.count}
                </p>
                <p className="font-display mt-2 text-lg text-cream">{s.name}</p>
                <p className="mt-1 text-[0.7rem] text-cream/40">
                  −{Math.round(s.discount * 100)} % sur le prix unitaire
                </p>
              </button>
            );
          })}
        </div>
        {!format && (
          <p className="mt-3 text-[0.75rem] text-cream/40">
            Vous pouvez aussi commander à l&apos;unité sans choisir de format —
            passez directement à la sélection.
          </p>
        )}
      </div>

      {/* Progress */}
      {format && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="panel glass sticky top-[132px] z-20 flex flex-wrap items-center justify-between gap-4 p-5"
        >
          <div className="min-w-[180px] flex-1">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.7rem] uppercase tracking-[0.16em] text-cream/50">
                {format.name}
              </span>
              <span className="font-display text-lg text-gold">
                {count} / {format.count}
              </span>
            </div>
            <div className="mt-2.5 h-1 w-full overflow-hidden bg-gold/12">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
                animate={{ width: `${Math.min(100, (count / format.count) * 100)}%` }}
                transition={{ type: "spring", stiffness: 180, damping: 24 }}
              />
            </div>
            <p className="mt-2 text-[0.72rem] text-cream/40">
              {remaining > 0
                ? `Encore ${remaining} bouteille${remaining > 1 ? "s" : ""} à choisir`
                : over
                  ? "Seau complet — retirez une bouteille pour en ajouter une autre"
                  : "Seau complet ✦"}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-2xl text-gold">{fcfa(total)}</p>
            {economie > 0 && (
              <p className="text-[0.68rem] text-cream/40">
                économie {fcfa(economie)}
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Category filter */}
      <div>
        <p className="label mb-5 text-gold">2 · Composez votre seau</p>
        <div className="flex flex-wrap gap-2">
          {(["all", "biere", "booster", "premix"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`border px-4 py-2 text-[0.64rem] uppercase tracking-[0.14em] transition-all duration-300 ${
                cat === c
                  ? "border-gold bg-gold text-ink"
                  : "border-line text-cream/55 hover:border-gold/55 hover:text-gold-light"
              }`}
            >
              {c === "all" ? "Tout" : CAT_LABEL[c]}
            </button>
          ))}
        </div>

        {/* Bottles */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((b) => {
              const q = value.picks[b.id] ?? 0;
              const full = !!format && count >= format.count && q === 0;
              return (
                <motion.div
                  layout
                  key={b.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: full ? 0.4 : 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.32 }}
                  className={`group flex items-center justify-between gap-3 p-4 transition-colors duration-300 ${
                    q > 0
                      ? "border border-gold/60 bg-gold/8"
                      : "panel hover:border-gold/40"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-display text-base text-cream">
                      {b.name}
                    </p>
                    <p className="mt-0.5 text-[0.68rem] text-cream/40">
                      {b.vol} · {fcfa(b.unit)}
                    </p>
                    {b.note && (
                      <p className="mt-1 text-[0.62rem] italic text-gold/60">
                        {b.note}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => setQty(b.id, -1)}
                      disabled={q === 0}
                      aria-label={`Retirer un ${b.name}`}
                      className="flex h-8 w-8 items-center justify-center border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-gold"
                    >
                      −
                    </button>
                    <span
                      className={`w-6 text-center font-display text-lg ${q > 0 ? "text-gold" : "text-cream/25"}`}
                    >
                      {q}
                    </span>
                    <button
                      onClick={() => setQty(b.id, 1)}
                      disabled={full}
                      aria-label={`Ajouter un ${b.name}`}
                      className="flex h-8 w-8 items-center justify-center border border-gold/30 text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-gold"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Recap chips */}
      {count > 0 && (
        <div className="panel bg-ink-2/60 p-6">
          <div className="flex items-center justify-between">
            <p className="label text-gold">Votre seau</p>
            <button
              onClick={() => onChange({ ...value, picks: {} })}
              className="text-[0.68rem] tracking-[0.1em] text-cream/40 underline-offset-4 transition-colors hover:text-gold"
            >
              Vider
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(value.picks).map(([id, q]) => {
              const b = BOUTEILLES.find((x) => x.id === id);
              if (!b) return null;
              return (
                <motion.span
                  layout
                  key={id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 border border-gold/45 bg-gold/8 px-3.5 py-1.5 text-[0.72rem] text-cream/80"
                >
                  <span className="font-display text-gold">{q}×</span>
                  {b.name}
                </motion.span>
              );
            })}
          </div>
          {format && remaining === 0 && format.offert && (
            <p className="mt-4 flex items-center gap-2 text-[0.78rem] text-gold/80">
              <Badge>Offert</Badge>
              {format.offert}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
