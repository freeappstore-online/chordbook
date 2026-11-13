import type { ReactNode } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { transpose, type Song } from "./music";

export interface ReaderPrefs {
  size: number;
  flats: boolean;
  diagrams: boolean;
  wake: boolean;
}
export const DEFAULT_PREFS: ReaderPrefs = {
  size: 19,
  flats: false,
  diagrams: true,
  wake: false,
};
export function validPrefs(value: unknown): value is ReaderPrefs {
  const p = value as ReaderPrefs | null;
  return (
    !!p &&
    Number.isInteger(p.size) &&
    p.size >= 14 &&
    p.size <= 34 &&
    typeof p.flats === "boolean" &&
    typeof p.diagrams === "boolean" &&
    typeof p.wake === "boolean"
  );
}

const STEP =
  "flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-sm border border-line bg-transparent font-semibold text-ink disabled:opacity-40";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-4 rounded border border-line bg-panel p-5">
      <div className="mb-3 text-[0.9rem] font-bold text-ink [overflow-wrap:anywhere]">
        {title}
      </div>
      {children}
    </div>
  );
}
function Label({ children }: { children: ReactNode }) {
  return (
    <div className="mb-[0.35rem] text-[0.75rem] font-semibold text-muted">
      {children}
    </div>
  );
}

// Song and display controls, shown above the account sections on /profile.
export default function Settings({
  song,
  update,
  prefs,
  setPrefs,
  back,
}: {
  song?: Song;
  update: (s: Song) => boolean;
  prefs: ReaderPrefs;
  setPrefs: (p: ReaderPrefs) => void;
  back: () => void;
}) {
  const shift = song?.shift ?? 0;
  return (
    <div className="m-[0_auto] w-full max-w-120 p-[1rem_1rem_0]">
      <button
        type="button"
        onClick={back}
        className="mb-4 flex min-h-[44px] cursor-pointer items-center gap-2 border-0 bg-transparent font-semibold text-accent"
      >
        <ArrowLeft size={18} /> Back to songs
      </button>
      {song && (
        <Section title={song.title}>
          <Label>Transpose</Label>
          <div className="mb-4 flex items-center gap-2">
            <button
              type="button"
              className={STEP}
              aria-label="Transpose down"
              onClick={() => update({ ...song, shift: (shift - 1) % 12 })}
            >
              <Minus size={16} />
            </button>
            <strong
              className="min-w-[3rem] text-center text-ink"
              data-testid="song-key"
            >
              {transpose(song.key, shift, prefs.flats)}
            </strong>
            <button
              type="button"
              className={STEP}
              aria-label="Transpose up"
              onClick={() => update({ ...song, shift: (shift + 1) % 12 })}
            >
              <Plus size={16} />
            </button>
          </div>
          <label
            className="mb-[0.35rem] block text-[0.75rem] font-semibold text-muted"
            htmlFor="capo"
          >
            Capo
          </label>
          <select
            id="capo"
            className="min-h-[44px] rounded-sm border border-line bg-transparent px-3 text-ink"
            value={song.capo}
            onChange={(e) => update({ ...song, capo: +e.target.value })}
          >
            {Array.from({ length: 13 }, (_, i) => (
              <option key={i} value={i}>
                {i === 0 ? "No capo" : `Fret ${i}`}
              </option>
            ))}
          </select>
        </Section>
      )}
      <Section title="Song view">
        <Label>Song text size</Label>
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            className={STEP}
            aria-label="Smaller song text"
            disabled={prefs.size <= 14}
            onClick={() => setPrefs({ ...prefs, size: prefs.size - 1 })}
          >
            A−
          </button>
          <button
            type="button"
            className={STEP}
            aria-label="Larger song text"
            disabled={prefs.size >= 34}
            onClick={() => setPrefs({ ...prefs, size: prefs.size + 1 })}
          >
            A+
          </button>
        </div>
        {(
          [
            ["diagrams", "Chord diagrams"],
            ["flats", "Prefer flats (♭)"],
            ["wake", "Keep screen awake"],
          ] as const
        ).map(([key, label]) => (
          <label
            key={key}
            className="flex min-h-[44px] items-center gap-2 text-[0.9rem] text-ink"
          >
            <input
              type="checkbox"
              className="accent-accent"
              checked={prefs[key]}
              onChange={(e) => setPrefs({ ...prefs, [key]: e.target.checked })}
            />
            {label}
          </label>
        ))}
      </Section>
    </div>
  );
}
