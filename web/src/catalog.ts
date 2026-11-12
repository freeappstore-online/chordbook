import { CHORD_STARTERS } from "./chord-starters";
import { CATALOG_DATA } from "./catalog-data";
import { LIBRARY, POPULAR, popularStarter, type PopularSong } from "./library";
import { newSong, type Song } from "./music";
export type CatalogKind = "sheet" | "starter" | "reference";
export interface CatalogEntry {
  id: string;
  title: string;
  artist: string;
  genre: string;
  kind: CatalogKind;
  song?: Song;
  starter?: PopularSong;
}
export function normalizeSearch(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
export function identity(title: string, artist: string) {
  return `${normalizeSearch(artist)}:${normalizeSearch(title)}`;
}
const palettes = CHORD_STARTERS.trim()
  .split("\n")
  .map((line) => {
    const [artist, title, key, chords] = line.split("|");
    return { artist, title, key, chords: chords.split(" "), capo: 0 };
  });
const modern: CatalogEntry[] = [];
const seen = new Set<string>();
for (const line of CATALOG_DATA.trim().split("\n")) {
  const [genre, artist, ...titles] = line.split("|");
  for (const title of titles) {
    const id = identity(title, artist);
    if (seen.has(id)) continue;
    seen.add(id);
    const starter =
      POPULAR.find((s) => identity(s.title, s.artist) === id) ??
      palettes.find((s) => identity(s.title, s.artist) === id);
    modern.push({
      id,
      title,
      artist,
      genre,
      kind: starter ? "starter" : "reference",
      starter,
    });
  }
}
for (const starter of POPULAR) {
  const id = identity(starter.title, starter.artist);
  if (!seen.has(id)) {
    seen.add(id);
    modern.unshift({
      id,
      title: starter.title,
      artist: starter.artist,
      genre: "Folk & acoustic",
      kind: "starter",
      starter,
    });
  }
}
const CAROLS = new Set([
  "silent-night",
  "jingle-bells",
  "joy-world",
  "deck-halls",
  "o-christmas-tree",
  "we-three-kings",
  "god-rest",
  "first-noel",
  "what-child",
  "go-tell-mountain",
]);
const CHILDREN = new Set([
  "twinkle-star",
  "row-boat",
  "frere-jacques",
  "au-clair-lune",
  "london-bridge",
  "old-macdonald",
  "skip-lou",
  "shortnin-bread",
]);
const SHANTIES = new Set([
  "drunken-sailor",
  "leave-her-johnny",
  "shenandoah",
  "spanish-ladies",
]);
const HYMNS = new Set([
  "amazing-grace",
  "will-the-circle",
  "swing-low",
  "wayfaring-stranger",
  "down-riverside",
  "nearer-my-god",
  "abide-with-me",
  "holy-holy",
  "when-the-saints",
]);
export const CATALOG: CatalogEntry[] = [
  ...LIBRARY.map((song) => ({
    id: song.id,
    title: song.title,
    artist: song.artist,
    genre: CAROLS.has(song.id)
      ? "Christmas"
      : CHILDREN.has(song.id)
        ? "Children & rounds"
        : SHANTIES.has(song.id)
          ? "Sea shanties"
          : HYMNS.has(song.id)
            ? "Hymns & spirituals"
            : "Traditional folk",
    kind: "sheet" as const,
    song,
  })),
  ...modern,
];
export const GENRES = [...new Set(CATALOG.map((s) => s.genre))].sort();
export function filterCatalog(
  query: string,
  genre: string,
  kind: CatalogKind | "all",
  sort: string,
): CatalogEntry[] {
  const terms = normalizeSearch(query).split(" ").filter(Boolean);
  const entries = CATALOG.filter(
    (s) =>
      (genre === "all" || s.genre === genre) &&
      (kind === "all" || s.kind === kind) &&
      terms.every((t) =>
        normalizeSearch(`${s.title} ${s.artist} ${s.genre}`).includes(t),
      ),
  );
  if (sort === "featured") {
    const featured = new Set(POPULAR.map((s) => identity(s.title, s.artist)));
    const rank = (entry: CatalogEntry) =>
      featured.has(entry.id)
        ? 0
        : entry.kind === "starter"
          ? 1
          : entry.kind === "sheet"
            ? 2
            : 3;
    entries.sort((a, b) => rank(a) - rank(b));
  }
  if (sort === "title") entries.sort((a, b) => a.title.localeCompare(b.title));
  if (sort === "artist")
    entries.sort(
      (a, b) =>
        a.artist.localeCompare(b.artist) || a.title.localeCompare(b.title),
    );
  return entries;
}
export function catalogSong(entry: CatalogEntry): Song {
  if (entry.song) return { ...entry.song };
  if (entry.starter) return popularStarter(entry.starter);
  return {
    ...newSong(),
    title: entry.title,
    artist: entry.artist,
    kind: "original",
    note: "Personal arrangement created from a song reference. The initial key is an editable starting point, not the recorded key.",
  };
}
