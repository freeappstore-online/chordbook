import { useEffect, useRef, useState } from "react";
import { BookOpen, Check, Edit3, Plus, Trash2, X } from "lucide-react";
import { CHORD_RE, SHARPS, inlineChords, type Song } from "./music";
import { Sheet } from "./Sheet";
const KEYS = [
  ...SHARPS,
  ...SHARPS.map((k) => k + "m"),
  "Bb",
  "Eb",
  "Ab",
  "Db",
  "Gb",
  "Bbm",
  "Ebm",
  "Abm",
];
export default function Editor({
  song,
  onChange,
  onSave,
  onClose,
  onDelete,
  existing,
}: {
  song: Song;
  onChange: (s: Song) => void;
  onSave: (s: Song) => void;
  onClose: () => void;
  onDelete: () => void;
  existing: boolean;
}) {
  const [tempoText, setTempoText] = useState(String(song.bpm));
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const area = useRef<HTMLTextAreaElement>(null),
    dialog = useRef<HTMLDivElement>(null);
  const selection = useRef({ start: 0, end: 0 });
  const [custom, setCustom] = useState(""),
    [error, setError] = useState(""),
    [preview, setPreview] = useState(false);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialog.current?.querySelector<HTMLInputElement>("input")?.focus();
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
      }
      if (e.key === "Tab" && dialog.current) {
        const items = Array.from(
          dialog.current.querySelectorAll<HTMLElement>(
            "button:not(:disabled),input,select,textarea,a[href]",
          ),
        ).filter((el) => el.getClientRects().length);
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handle);
      document.body.style.overflow = old;
      previous?.focus();
    };
  }, []);
  const insert = (text: string) => {
    const { start, end } = selection.current;
    const body = song.body.slice(0, start) + text + song.body.slice(end);
    onChange({ ...song, body });
    const pos = start + text.length;
    selection.current = { start: pos, end: pos };
    requestAnimationFrame(() => {
      area.current?.focus();
      area.current?.setSelectionRange(pos, pos);
    });
  };
  const select = () => {
    if (area.current)
      selection.current = {
        start: area.current.selectionStart,
        end: area.current.selectionEnd,
      };
  };
  return (
    <div className="modal-backdrop">
      <div
        className="editor-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
        ref={dialog}
      >
        <header className="editor-header">
          <div>
            <span className="eyebrow">MAKE IT YOURS</span>
            <h2 id="editor-title">
              {existing ? "Edit your song" : "A new song"}
            </h2>
          </div>
          <button
            className="icon-button"
            aria-label="Close editor"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </header>
        <div className="editor-body">
          <div className="editor-fields">
            <label>
              Song title
              <input
                value={song.title}
                maxLength={160}
                placeholder="Give your song a name"
                onChange={(e) => onChange({ ...song, title: e.target.value })}
              />
            </label>
            <label>
              Artist
              <input
                value={song.artist}
                maxLength={160}
                placeholder="Artist or your name"
                onChange={(e) => onChange({ ...song, artist: e.target.value })}
              />
            </label>
          </div>
          <div className="editor-meta">
            <label>
              Key
              <select
                value={song.key}
                onChange={(e) => onChange({ ...song, key: e.target.value })}
              >
                {KEYS.map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </label>
            <label>
              Capo
              <select
                value={song.capo}
                onChange={(e) => onChange({ ...song, capo: +e.target.value })}
              >
                {Array.from({ length: 13 }, (_, i) => (
                  <option value={i} key={i}>
                    {i ? `Fret ${i}` : "No capo"}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Tempo
              <input
                type="number"
                min="30"
                max="240"
                value={tempoText}
                onChange={(e) => setTempoText(e.target.value)}
                onBlur={() => {
                  const next = Math.min(
                    240,
                    Math.max(30, Number(tempoText) || 90),
                  );
                  onChange({ ...song, bpm: next });
                  setTempoText(String(next));
                }}
              />
            </label>
          </div>
          <div className="editor-tabs">
            <button
              className={!preview ? "active" : ""}
              onClick={() => setPreview(false)}
            >
              <Edit3 size={15} /> Write
            </button>
            <button
              className={preview ? "active" : ""}
              onClick={() => setPreview(true)}
            >
              <BookOpen size={15} /> Preview
            </button>
          </div>
          {preview ? (
            <div className="editor-preview">
              <Sheet body={song.body} />
            </div>
          ) : (
            <>
              <label className="body-label" htmlFor="lyrics">
                Lyrics & chords<span>Place the cursor, then tap a chord.</span>
              </label>
              <div className="chord-palette">
                {[
                  "C",
                  "G",
                  "D",
                  "Am",
                  "Em",
                  "F",
                  "A",
                  "Dm",
                  "E",
                  "D7",
                  "G7",
                  "Cadd9",
                ].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onPointerDown={(e) => e.preventDefault()}
                    onClick={() => insert(`[${c}]`)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="custom-chord">
                <input
                  aria-label="Custom chord"
                  placeholder="Other chord, e.g. F#m7"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (CHORD_RE.test(custom)) {
                        insert(`[${custom}]`);
                        setCustom("");
                        setError("");
                      } else
                        setError("Use a chord like F#m7, Bb, Dsus4 or C/G.");
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (CHORD_RE.test(custom)) {
                      insert(`[${custom}]`);
                      setCustom("");
                      setError("");
                    } else setError("Use a chord like F#m7, Bb, Dsus4 or C/G.");
                  }}
                >
                  <Plus size={15} />
                  Add chord
                </button>
              </div>
              {error && (
                <p role="alert" className="field-error">
                  {error}
                </p>
              )}
              <textarea
                id="lyrics"
                ref={area}
                value={song.body}
                maxLength={199999}
                spellCheck={false}
                onSelect={select}
                onClick={select}
                onKeyUp={select}
                onChange={(e) => {
                  onChange({ ...song, body: e.target.value });
                  selection.current = {
                    start: e.target.selectionStart,
                    end: e.target.selectionEnd,
                  };
                }}
                onPaste={(e) => {
                  const text = e.clipboardData.getData("text/plain");
                  const converted = inlineChords(text);
                  if (
                    converted === text ||
                    song.body.length + converted.length > 199999
                  )
                    return;
                  e.preventDefault();
                  select();
                  insert(converted);
                }}
                placeholder="Type or paste a song here. Chords written above the lyrics are converted for you."
              />
              <div className="section-palette">
                {["Verse", "Chorus", "Bridge", "Intro"].map((s) => (
                  <button
                    key={s}
                    onPointerDown={(e) => e.preventDefault()}
                    onClick={() => insert(`\n{section: ${s}}\n`)}
                  >
                    + {s}
                  </button>
                ))}
              </div>
              <p className="editor-help">
                Chords in brackets sit above the next lyric:{" "}
                <code>[G]Amazing [C]grace</code>. Paste a song copied from a
                chord site and chords written above the lyrics are converted
                for you. Drafts are saved when you tap Save song.
              </p>
            </>
          )}
        </div>
        <footer className="editor-footer">
          {existing ? (
            <button className="delete-song" onClick={onDelete}>
              <Trash2 size={17} />
              <span>Delete</span>
            </button>
          ) : (
            <span className="draft-note">Your song stays on this device.</span>
          )}
          <div>
            <button className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="primary" onClick={() => onSave(song)}>
              <Check size={17} />
              Save song
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
