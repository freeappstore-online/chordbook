export interface Song {
  id: string;
  title: string;
  artist: string;
  key: string;
  capo: number;
  bpm: number;
  body: string;
  favorite: boolean;
  kind: "original" | "traditional" | "starter";
  note?: string;
}
export const SHARPS = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
const FLATS = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const PITCH: Record<string, number> = {
  C: 0,
  "B#": 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  "E#": 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};
export const CHORD_RE =
  /^[A-G](?:#|b)?(?:m|maj|min|dim|aug|sus|add)?\d{0,2}(?:sus[24]|add\d{1,2})?(?:\/[A-G](?:#|b)?)?$/;
export function transpose(chord: string, steps: number, flats = false): string {
  if (!CHORD_RE.test(chord)) return chord;
  return chord.replace(
    /(^|\/)([A-G](?:#|b)?)/g,
    (_, prefix: string, root: string) =>
      prefix +
      (flats ? FLATS : SHARPS)[(((PITCH[root] + steps) % 12) + 12) % 12],
  );
}
export interface Piece {
  chord: string;
  text: string;
}
export function parseLine(line: string): Piece[] {
  const parts: Piece[] = [];
  let cursor = 0;
  let chord = "";
  for (const match of line.matchAll(/\[([^\]]+)\]/g)) {
    parts.push({ chord, text: line.slice(cursor, match.index) });
    chord = match[1];
    cursor = match.index! + match[0].length;
  }
  parts.push({ chord, text: line.slice(cursor) });
  return parts.filter((p) => p.chord || p.text);
}
export function chordsIn(body: string): string[] {
  return [
    ...new Set(
      [...body.matchAll(/\[([^\]]+)\]/g)]
        .map((m) => m[1])
        .filter((c) => CHORD_RE.test(c)),
    ),
  ];
}
export function newSong(): Song {
  return {
    id: crypto.randomUUID(),
    title: "",
    artist: "",
    key: "C",
    capo: 0,
    bpm: 90,
    body: "{section: Verse 1}\n",
    favorite: false,
    kind: "original",
  };
}
export function validSongs(value: unknown): value is Song[] {
  return (
    Array.isArray(value) &&
    value.length <= 1000 &&
    value.every(
      (s) =>
        s &&
        typeof s.id === "string" &&
        typeof s.title === "string" &&
        typeof s.artist === "string" &&
        typeof s.body === "string" &&
        s.body.length < 200000 &&
        typeof s.key === "string" &&
        /^[A-G](?:#|b)?m?$/.test(s.key) &&
        Number.isInteger(s.capo) &&
        s.capo >= 0 &&
        s.capo <= 12 &&
        Number.isFinite(s.bpm) &&
        s.bpm >= 30 &&
        s.bpm <= 240 &&
        typeof s.favorite === "boolean" &&
        ["original", "traditional", "starter"].includes(s.kind),
    )
  );
}
export function toChordPro(song: Song) {
  return `{title: ${song.title}}\n{artist: ${song.artist}}\n{key: ${song.key}}\n{capo: ${song.capo}}\n{tempo: ${song.bpm}}\n\n${song.body}`;
}
// Looser than CHORD_RE: recognises chords such as Dm7b5 or E7#9 on a chord line.
const CHORD_TOKEN =
  /^[A-G][#b]?(?:maj|min|dim|aug|sus|add|m|M|\+|°)?\d*(?:(?:sus|add|maj|[#b+-])\d+|sus)*(?:\([^)]+\))?(?:\/[A-G][#b]?)?$/;
const FILLER = /^(?:\|+|-+|%|\(?x\d+\)?|N\.?C\.?)$/i;
const SECTION =
  /^(?:\[([^\]]+)\]|((?:intro|verse|pre-?chorus|chorus|bridge|outro|solo|instrumental|interlude|refrain)(?: ?\d+)?):?)$/i;
const isChordLine = (line: string) => {
  const tokens = line.trim().split(/\s+/);
  return (
    tokens.some((t) => CHORD_TOKEN.test(t)) &&
    tokens.every((t) => CHORD_TOKEN.test(t) || FILLER.test(t))
  );
};
// Chord sites put chords on their own line above the lyric. Fold each chord
// line into the lyric below it; text that is already ChordPro passes through.
export function inlineChords(text: string): string {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const section = line.trim().match(SECTION);
    const label = section?.[1] ?? section?.[2];
    if (label && !CHORD_TOKEN.test(label) && !FILLER.test(label)) {
      out.push(`{section: ${label}}`);
      continue;
    }
    if (!isChordLine(line)) {
      out.push(line);
      continue;
    }
    const next = lines[i + 1];
    if (
      !next?.trim() ||
      /[[{]/.test(next) ||
      isChordLine(next) ||
      SECTION.test(next.trim())
    ) {
      out.push(
        line.replace(/\S+/g, (t) => (CHORD_TOKEN.test(t) ? `[${t}]` : t)),
      );
      continue;
    }
    let lyric = next.padEnd(line.length);
    for (const m of [...line.matchAll(/\S+/g)].reverse())
      if (CHORD_TOKEN.test(m[0]))
        lyric = `${lyric.slice(0, m.index)}[${m[0]}]${lyric.slice(m.index)}`;
    out.push(lyric.trimEnd());
    i++;
  }
  return out.join("\n");
}
export function fromChordPro(text: string): Song {
  if (text.length > 200000)
    throw new Error("Please use a file smaller than 200 KB.");
  const song = newSong();
  song.title = "Imported song";
  song.body = inlineChords(text)
    .replace(
      /\{(title|t|artist|subtitle|st|key|capo|tempo):\s*([^}]*)\}/gi,
      (_, tag: string, value: string) => {
        const k = tag.toLowerCase();
        value = value.trim();
        if (["title", "t"].includes(k)) song.title = value;
        if (["artist", "subtitle", "st"].includes(k)) song.artist = value;
        if (k === "key" && /^[A-G](?:#|b)?m?$/.test(value)) song.key = value;
        if (k === "capo" && /^\d+$/.test(value) && +value <= 12)
          song.capo = +value;
        if (k === "tempo" && +value >= 30 && +value <= 240) song.bpm = +value;
        return "";
      },
    )
    .trim();
  return song;
}
// Open-position guitar voicings, low E → high E. -1 is muted.
export const VOICINGS: Record<string, number[]> = {
  C: [-1, 3, 2, 0, 1, 0],
  D: [-1, -1, 0, 2, 3, 2],
  E: [0, 2, 2, 1, 0, 0],
  F: [1, 3, 3, 2, 1, 1],
  G: [3, 2, 0, 0, 0, 3],
  A: [-1, 0, 2, 2, 2, 0],
  B: [-1, 2, 4, 4, 4, 2],
  Am: [-1, 0, 2, 2, 1, 0],
  Em: [0, 2, 2, 0, 0, 0],
  Dm: [-1, -1, 0, 2, 3, 1],
  Bm: [-1, 2, 4, 4, 3, 2],
  C7: [-1, 3, 2, 3, 1, 0],
  D7: [-1, -1, 0, 2, 1, 2],
  E7: [0, 2, 0, 1, 0, 0],
  G7: [3, 2, 0, 0, 0, 1],
  A7: [-1, 0, 2, 0, 2, 0],
  B7: [-1, 2, 1, 2, 0, 2],
  Dsus4: [-1, -1, 0, 2, 3, 3],
  Cadd9: [-1, 3, 2, 0, 3, 3],
  Fmaj7: [-1, -1, 3, 2, 1, 0],
  "D/F#": [2, 0, 0, 2, 3, 2],
};
