"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export type Spot = {
  id: string;
  label: string;
  zone: "lounge" | "chicha" | "vip" | "royale";
  x: number;
  y: number;
  w: number;
  h: number;
  seats: number;
  taken?: boolean;
};

/** Plan de salle simplifié — coordonnées dans un viewBox 100×70. */
export const SPOTS: Spot[] = [
  // Loges royales — surplombant le dancefloor
  { id: "R1", label: "Loge Royale I", zone: "royale", x: 6, y: 6, w: 17, h: 11, seats: 14 },
  { id: "R2", label: "Loge Royale II", zone: "royale", x: 77, y: 6, w: 17, h: 11, seats: 12, taken: true },

  // Carrés VIP autour du dancefloor
  { id: "V1", label: "Carré VIP 1", zone: "vip", x: 6, y: 21, w: 14, h: 9, seats: 8 },
  { id: "V2", label: "Carré VIP 2", zone: "vip", x: 6, y: 33, w: 14, h: 9, seats: 6, taken: true },
  { id: "V3", label: "Carré VIP 3", zone: "vip", x: 80, y: 21, w: 14, h: 9, seats: 8 },
  { id: "V4", label: "Carré VIP 4", zone: "vip", x: 80, y: 33, w: 14, h: 9, seats: 6 },

  // Tables lounge
  { id: "L1", label: "Table Lounge 1", zone: "lounge", x: 25, y: 50, w: 11, h: 8, seats: 4 },
  { id: "L2", label: "Table Lounge 2", zone: "lounge", x: 38, y: 50, w: 11, h: 8, seats: 4, taken: true },
  { id: "L3", label: "Table Lounge 3", zone: "lounge", x: 51, y: 50, w: 11, h: 8, seats: 4 },
  { id: "L4", label: "Table Lounge 4", zone: "lounge", x: 64, y: 50, w: 11, h: 8, seats: 2 },

  // Terrasse chicha
  { id: "C1", label: "Terrasse Chicha A", zone: "chicha", x: 8, y: 60, w: 14, h: 7, seats: 6 },
  { id: "C2", label: "Terrasse Chicha B", zone: "chicha", x: 78, y: 60, w: 14, h: 7, seats: 6 },
];

const ZONE_COLOR: Record<Spot["zone"], string> = {
  lounge: "#8b8577",
  chicha: "#7a9c8a",
  vip: "#d4af5f",
  royale: "#f2e0aa",
};

const ZONE_LABEL: Record<Spot["zone"], string> = {
  lounge: "Table Lounge",
  chicha: "Terrasse Chicha",
  vip: "Carré VIP",
  royale: "Loge Royale",
};

export default function FloorPlan({
  selected,
  onSelect,
  filterZone,
}: {
  selected: string | null;
  onSelect: (id: string, zone: Spot["zone"]) => void;
  filterZone?: Spot["zone"] | null;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const active = SPOTS.find((s) => s.id === (hover ?? selected));

  return (
    <div className="panel relative overflow-hidden bg-ink-2/70 p-4 sm:p-6">
      <svg viewBox="0 0 100 70" className="w-full" role="img" aria-label="Plan de salle du LMB">
        <defs>
          <radialGradient id="floorGlow" cx="50%" cy="34%" r="42%">
            <stop offset="0%" stopColor="#d4af5f" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#d4af5f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="stageGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#9a7526" />
            <stop offset="50%" stopColor="#f2e0aa" />
            <stop offset="100%" stopColor="#9a7526" />
          </linearGradient>
        </defs>

        {/* Dancefloor glow */}
        <ellipse cx="50" cy="30" rx="34" ry="20" fill="url(#floorGlow)" />

        {/* DJ booth / scène */}
        <rect x="38" y="3" width="24" height="4" rx="1" fill="url(#stageGrad)" opacity="0.85" />
        <text x="50" y="6.1" textAnchor="middle" fontSize="2.3" fill="#06060a" letterSpacing="0.35" fontWeight="600">
          DJ BOOTH
        </text>

        {/* Dancefloor outline */}
        <rect
          x="26" y="12" width="48" height="32" rx="1.5"
          fill="none" stroke="#d4af5f" strokeOpacity="0.22" strokeDasharray="1.6 1.6"
        />
        <text x="50" y="30" textAnchor="middle" fontSize="3" fill="#d4af5f" fillOpacity="0.3" letterSpacing="0.6">
          DANCEFLOOR
        </text>

        {/* Bar */}
        <rect x="26" y="62" width="48" height="5" rx="1" fill="#12121b" stroke="#d4af5f" strokeOpacity="0.3" />
        <text x="50" y="65.4" textAnchor="middle" fontSize="2.4" fill="#d4af5f" fillOpacity="0.6" letterSpacing="0.5">
          LE BAR
        </text>

        {/* Spots */}
        {SPOTS.map((s) => {
          const isSel = selected === s.id;
          const isHover = hover === s.id;
          const dimmed = filterZone ? s.zone !== filterZone : false;
          const color = ZONE_COLOR[s.zone];

          return (
            <g
              key={s.id}
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => !s.taken && !dimmed && onSelect(s.id, s.zone)}
              style={{ cursor: s.taken || dimmed ? "not-allowed" : "pointer" }}
              opacity={dimmed ? 0.2 : s.taken ? 0.32 : 1}
            >
              <motion.rect
                x={s.x} y={s.y} width={s.w} height={s.h} rx="1.2"
                fill={isSel ? color : "#12121b"}
                fillOpacity={isSel ? 0.9 : isHover ? 0.55 : 0.75}
                stroke={color}
                strokeOpacity={isSel ? 1 : isHover ? 0.9 : 0.45}
                strokeWidth={isSel ? 0.7 : 0.35}
                animate={{ scale: isSel || isHover ? 1.03 : 1 }}
                style={{ transformOrigin: `${s.x + s.w / 2}px ${s.y + s.h / 2}px` }}
                transition={{ duration: 0.25 }}
              />
              <text
                x={s.x + s.w / 2} y={s.y + s.h / 2 + 0.4}
                textAnchor="middle" fontSize="2.6"
                fill={isSel ? "#06060a" : color}
                fontWeight={isSel ? 700 : 500}
              >
                {s.id}
              </text>
              <text
                x={s.x + s.w / 2} y={s.y + s.h / 2 + 3.4}
                textAnchor="middle" fontSize="1.8"
                fill={isSel ? "#06060a" : "#8b8577"}
              >
                {s.taken ? "réservée" : `${s.seats} pl.`}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
        {(Object.keys(ZONE_LABEL) as Spot["zone"][]).map((z) => (
          <span key={z} className="flex items-center gap-2 text-[0.65rem] text-cream/45">
            <span
              className="h-2 w-2 rounded-[2px]"
              style={{ background: ZONE_COLOR[z] }}
            />
            {ZONE_LABEL[z]}
          </span>
        ))}
        <span className="flex items-center gap-2 text-[0.65rem] text-cream/30">
          <span className="h-2 w-2 rounded-[2px] bg-cream/25" />
          Déjà réservée
        </span>
      </div>

      {/* Hover/selection readout */}
      <div className="mt-3 min-h-[1.5rem] text-[0.75rem]">
        {active ? (
          <span className="text-cream/60">
            <span className="text-gold">{active.label}</span> ·{" "}
            {ZONE_LABEL[active.zone]} · {active.seats} places
            {active.taken && (
              <span className="text-cream/30"> · indisponible ce soir</span>
            )}
          </span>
        ) : (
          <span className="text-cream/30">
            Survolez le plan pour découvrir chaque emplacement.
          </span>
        )}
      </div>
    </div>
  );
}
