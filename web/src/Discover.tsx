import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Guitar,
  Music2,
  Plus,
  Search,
} from "lucide-react";
import {
  CATALOG,
  GENRES,
  catalogSong,
  filterCatalog,
  identity,
  type CatalogKind,
} from "./catalog";
import type { Song } from "./music";
const PAGE_SIZE = 24;
const LABELS = {
  sheet: "Lyrics + chords",
  starter: "Chord starter",
  reference: "Chart reference",
};
export default function Discover({
  songs,
  query,
  setQuery,
  add,
  choose,
  draft,
}: {
  songs: Song[];
  query: string;
  setQuery: (s: string) => void;
  add: (s: Song) => void;
  choose: (s: Song) => void;
  draft: (s: Song) => void;
}) {
  const [genre, setGenre] = useState("all"),
    [kind, setKind] = useState<CatalogKind | "all">("all"),
    [sort, setSort] = useState("featured"),
    [page, setPage] = useState(1);
  useEffect(() => setPage(1), [query]);
  const filtered = useMemo(
    () => filterCatalog(query, genre, kind, sort),
    [query, genre, kind, sort],
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice(
    (current - 1) * PAGE_SIZE,
    current * PAGE_SIZE,
  );
  const counts = {
    all: CATALOG.length,
    sheet: CATALOG.filter((s) => s.kind === "sheet").length,
    starter: CATALOG.filter((s) => s.kind === "starter").length,
    reference: CATALOG.filter((s) => s.kind === "reference").length,
  };
  const saved = useMemo(
    () => new Map(songs.map((s) => [identity(s.title, s.artist), s])),
    [songs],
  );
  const changePage = (next: number) => {
    setPage(next);
    document
      .querySelector(".catalog-toolbar")
      ?.scrollIntoView({ block: "start", behavior: "instant" });
  };
  return (
    <div className="catalog">
      <div className="discover-intro">
        <span className="eyebrow">A BIGGER WORLD OF SONGS</span>
        <h2>
          {counts.all} songs.
          <br />
          <span>Find your next favorite.</span>
        </h2>
        <p>
          {counts.sheet} playable traditional lyric selections, {counts.starter}{" "}
          chord starters, and {counts.reference} modern-song chart references.
        </p>
      </div>
      <div
        className="catalog-types"
        role="group"
        aria-label="Song availability"
      >
        {(["all", "sheet", "starter", "reference"] as const).map((value) => (
          <button
            key={value}
            aria-pressed={kind === value}
            className={kind === value ? "active" : ""}
            onClick={() => {
              setKind(value);
              setPage(1);
            }}
          >
            {value === "all"
              ? "All songs"
              : value === "sheet"
                ? "Ready to play"
                : value === "starter"
                  ? "Chord starters"
                  : "Chart links"}
            <span>{counts[value]}</span>
          </button>
        ))}
      </div>
      <div className="catalog-toolbar">
        <label>
          Genre
          <select
            aria-label="Filter songs by genre"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setPage(1);
            }}
          >
            <option value="all">All genres</option>
            {GENRES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label>
          Sort
          <select
            aria-label="Sort catalog"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
          >
            <option value="featured">Featured</option>
            <option value="title">Song title A–Z</option>
            <option value="artist">Artist A–Z</option>
          </select>
        </label>
      </div>
      <div className="catalog-results" role="status">
        {filtered.length
          ? `${(current - 1) * PAGE_SIZE + 1}–${Math.min(current * PAGE_SIZE, filtered.length)} of ${filtered.length} songs`
          : "No songs found"}
        {(query || genre !== "all" || kind !== "all") && (
          <button
            onClick={() => {
              setQuery("");
              setGenre("all");
              setKind("all");
              setPage(1);
            }}
          >
            Reset filters
          </button>
        )}
      </div>
      <div className="catalog-list">
        {visible.map((entry) => {
          const existing = entry.song
            ? songs.find((s) => s.id === entry.song!.id) ||
              saved.get(identity(entry.title, entry.artist))
            : saved.get(identity(entry.title, entry.artist));
          return (
            <div className="catalog-card" key={entry.id}>
              <div className={`catalog-art ${entry.kind}`} aria-hidden="true">
                {entry.kind === "sheet" ? (
                  <Guitar size={21} />
                ) : entry.kind === "starter" ? (
                  <Music2 size={21} />
                ) : (
                  <ExternalLink size={19} />
                )}
              </div>
              <div className="catalog-card-content">
                <strong>{entry.title}</strong>
                <small>{entry.artist}</small>
                <div className="catalog-tags">
                  <span>{entry.genre}</span>
                  <span className={`availability ${entry.kind}`}>
                    {LABELS[entry.kind]}
                  </span>
                </div>
                {entry.starter && (
                  <span className="popular-chords">
                    {entry.starter.chords.join(" · ")}
                  </span>
                )}
                <div className="catalog-card-actions">
                  {entry.kind === "reference" && (
                    <a
                      href={`https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodeURIComponent(entry.title + " " + entry.artist)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Find a chart <ExternalLink size={11} />
                    </a>
                  )}
                  <button
                    onClick={() => {
                      if (existing) choose(existing);
                      else if (entry.kind === "reference")
                        draft(catalogSong(entry));
                      else add(catalogSong(entry));
                    }}
                    aria-label={
                      existing
                        ? `Open ${entry.title}`
                        : entry.kind === "reference"
                          ? `Create sheet for ${entry.title}`
                          : `Add ${entry.title}`
                    }
                  >
                    {existing ? <Check size={13} /> : <Plus size={13} />}{" "}
                    {existing
                      ? "In your library"
                      : entry.kind === "reference"
                        ? "Create sheet"
                        : "Play & add"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Search size={30} />
          <h3>No matching songs</h3>
          <p>Try fewer words, another artist, or a different genre.</p>
        </div>
      )}
      {pages > 1 && (
        <nav className="catalog-pagination" aria-label="Catalog pages">
          <button
            disabled={current === 1}
            onClick={() => changePage(current - 1)}
            aria-label="Previous catalog page"
          >
            <ArrowLeft size={15} /> Previous
          </button>
          <span>
            Page {current} / {pages}
          </span>
          <button
            disabled={current === pages}
            onClick={() => changePage(current + 1)}
            aria-label="Next catalog page"
          >
            Next <ArrowRight size={15} />
          </button>
        </nav>
      )}
      <p className="library-footnote">
        Ready-to-play sheets contain traditional lyric selections and simple
        practice chords. Chord starters contain a palette, not a full
        transcription. Chart references link to external searches; create a
        sheet to add your own lyrics, chords and key. No song charts are
        inferred from titles.
      </p>
    </div>
  );
}
