import Reader, { type ReaderMemory } from "./Reader";
import Editor from "./Editor";
import { useEffect, useRef, useState } from "react";
import { initApp } from "@freeappstore/sdk";
import { Shell } from "@freeappstore/sdk/ui";
import { getPreference, setPreference } from "@freeappstore/sdk/persist";
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Guitar,
  Heart,
  Library,
  ListMusic,
  Music2,
  Plus,
  Search,
  Upload,
  X,
} from "lucide-react";
import {
  chordsIn,
  fromChordPro,
  newSong,
  validSongs,
  type Song,
} from "./music";
import { LIBRARY, POPULAR, popularStarter } from "./library";
import { pwa } from "./pwa";
export const fas = initApp({ appId: "chordbook" });
const INITIAL = getPreference("chordbook", "songs", validSongs);

export default function App() {
  const [path, setPath] = useState(location.pathname);
  const [songs, setSongs] = useState<Song[]>(
    INITIAL.ok && INITIAL.value ? INITIAL.value : LIBRARY,
  );
  const [selected, setSelected] = useState("amazing-grace");
  const [tab, setTab] = useState<"library" | "discover" | "setlist">("library");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState<Song | null>(null);
  const [notice, setNotice] = useState(
    INITIAL.ok
      ? ""
      : "Saved library could not be read. Export any recoverable data before saving changes.",
  );
  const [playing, setPlaying] = useState(false);
  const [mobileSheet, setMobileSheet] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const readerMemory = useRef(new Map<string, ReaderMemory>());
  const song = songs.find((s) => s.id === selected) ?? songs[0];
  useEffect(() => {
    const sync = () => {
      setPath(location.pathname);
      setPlaying(false);
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  const navigate = (href: string) => {
    history.pushState(null, "", href);
    setPath(href);
    setPlaying(false);
  };
  useEffect(
    () => pwa.addBusyGuard(() => Boolean(draft) || playing),
    [draft, playing],
  );
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 6500);
    return () => clearTimeout(t);
  }, [notice]);
  const persist = (next: Song[]) => {
    const result = setPreference("chordbook", "songs", next, validSongs);
    if (!result.ok) {
      setNotice(
        `Could not save (${result.reason}). Please export your song and try again.`,
      );
      return false;
    }
    setSongs(next);
    return true;
  };
  const update = (next: Song) =>
    persist(songs.map((s) => (s.id === next.id ? next : s)));
  const save = (next: Song) => {
    if (!next.title.trim()) {
      setNotice("Give your song a title before saving.");
      return;
    }
    if (!next.body.trim()) {
      setNotice("Add lyrics or at least one chord before saving.");
      return;
    }
    const cleaned = {
      ...next,
      title: next.title.trim(),
      artist: next.artist.trim(),
    };
    if (
      persist(
        songs.some((s) => s.id === next.id)
          ? songs.map((s) => (s.id === next.id ? cleaned : s))
          : [...songs, cleaned],
      )
    ) {
      setSelected(next.id);
      setDraft(null);
      setMobileSheet(true);
      setNotice("Song saved on this device.");
    }
  };
  const add = (next: Song) => {
    if (persist([...songs, next])) {
      setSelected(next.id);
      setMobileSheet(true);
      setNotice("Added to your library.");
    }
  };
  const choose = (s: Song) => {
    setSelected(s.id);
    setPlaying(false);
    setMobileSheet(true);
  };
  const importFile = async (file?: File) => {
    if (!file) return;
    try {
      if (file.size > 200000)
        throw new Error("Please use a file smaller than 200 KB.");
      setDraft(fromChordPro(await file.text()));
    } catch (e) {
      setNotice(e instanceof Error ? e.message : "Could not import file.");
    }
    if (input.current) input.current.value = "";
  };
  const visible = songs.filter(
    (s) =>
      (tab !== "setlist" || s.favorite) &&
      `${s.title} ${s.artist}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <Shell
      app={fas}
      appName="Chordbook"
      onNavigate={navigate}
      headerActions={
        <span className="header-note">
          <span className="status-dot" /> Made for your next song
        </span>
      }
    >
      <div className={`chordbook ${playing ? "is-playing" : ""}`}>
        {notice && (
          <div className="notice" role="status">
            {notice}
            <button aria-label="Dismiss message" onClick={() => setNotice("")}>
              <X size={16} />
            </button>
          </div>
        )}
        <input
          ref={input}
          type="file"
          accept=".cho,.chordpro,.pro,.txt"
          className="visually-hidden"
          aria-label="Import ChordPro file"
          onChange={(e) => void importFile(e.target.files?.[0])}
        />
        <div className={`workspace ${mobileSheet ? "mobile-sheet" : ""}`}>
          <aside className="sidebar">
            <div className="brand">
              <div className="brand-mark">
                <Guitar size={23} />
              </div>
              <div>
                <strong>
                  Chordbook<span className="brand-period">.</span>
                </strong>
                <span>Your songs. Within reach.</span>
              </div>
            </div>
            <button
              className="primary new-song"
              onClick={() => setDraft(newSong())}
            >
              <Plus size={18} /> New song <span>＋</span>
            </button>
            <div className="sidebar-caption">YOUR SPACE</div>
            <nav aria-label="Song collection" className="collection-nav">
              <button
                className={tab === "library" ? "active" : ""}
                onClick={() => {
                  setTab("library");
                  setMobileSheet(false);
                }}
              >
                <Library size={19} />
                My library<span>{songs.length}</span>
              </button>
              <button
                className={tab === "setlist" ? "active" : ""}
                onClick={() => {
                  setTab("setlist");
                  setMobileSheet(false);
                }}
              >
                <ListMusic size={19} />
                My setlist<span>{songs.filter((s) => s.favorite).length}</span>
              </button>
              <button
                className={tab === "discover" ? "active" : ""}
                onClick={() => {
                  setTab("discover");
                  setMobileSheet(false);
                }}
              >
                <Music2 size={19} />
                Discover songs
              </button>
            </nav>
            <div className="sidebar-tip">
              <div className="tiny-icon">
                <BookOpen size={20} />
              </div>
              <strong>A little practice, every day.</strong>
              <p>One song is all it takes to pick up your guitar.</p>
              <span>LESS SCROLLING. MORE STRUMMING.</span>
            </div>
            <button
              className="import-button"
              onClick={() => input.current?.click()}
            >
              <Upload size={17} /> Import ChordPro / text
            </button>
            <p className="device-note">
              <span className="status-dot" /> Saved on this device · No account
              needed
            </p>
          </aside>
          <section className="library-pane">
            <div className="pane-heading">
              <div>
                <span className="eyebrow">PICK UP & PLAY</span>
                <h1>
                  {tab === "discover"
                    ? "Find your next song"
                    : tab === "setlist"
                      ? "Your next set"
                      : "Your songbook"}
                </h1>
              </div>
              <span className="count-pill">
                {tab === "discover" ? POPULAR.length : visible.length} songs
              </span>
            </div>
            <label className="search-box">
              <Search size={18} />
              <input
                aria-label="Search songs"
                placeholder="Search songs or artists"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button aria-label="Clear search" onClick={() => setSearch("")}>
                  <X size={15} />
                </button>
              )}
            </label>
            {tab === "discover" ? (
              <>
                <div className="discover-intro">
                  <span className="eyebrow">CAMPFIRE FAVORITES</span>
                  <h2>
                    Know it. Play it.<span> Make it yours.</span>
                  </h2>
                  <p>
                    Popular songs to start from. Add a chord palette, then bring
                    your own lyrics and arrangement.
                  </p>
                </div>
                <div className="popular-list">
                  {POPULAR.filter((s) =>
                    `${s.title} ${s.artist}`
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                  ).map((s, i) => (
                    <div className="popular-card" key={s.title}>
                      <span className="song-number">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <strong>{s.title}</strong>
                        <small>{s.artist}</small>
                        <span className="popular-chords">
                          {s.chords.join(" · ")}
                        </span>
                        <a
                          href={`https://www.ultimate-guitar.com/search.php?search_type=title&value=${encodeURIComponent(s.title + " " + s.artist)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Find a chart ↗
                        </a>
                      </div>
                      <button
                        className="icon-button"
                        aria-label={`Add ${s.title}`}
                        onClick={() => add(popularStarter(s))}
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  ))}
                </div>
                <p className="library-footnote">
                  Practice starters contain chords only. They are not full song
                  transcriptions. Full lyric sheets below use traditional
                  public-domain material.
                </p>
                <h3 className="section-heading">
                  Ready to play · Traditional favorites
                </h3>
                {LIBRARY.map((s) => (
                  <button
                    className="traditional-add"
                    key={s.id}
                    onClick={() => {
                      const existing = songs.find((x) => x.id === s.id);
                      if (existing) choose(existing);
                      else add(s);
                    }}
                  >
                    <Music2 size={17} />
                    <span>{s.title}</span>
                    <Plus size={16} />
                  </button>
                ))}
              </>
            ) : (
              <>
                <div className="list-label">
                  <span>
                    {tab === "setlist"
                      ? "FAVORITES · IN PLAY ORDER"
                      : "ALL SONGS"}
                  </span>
                  <span>
                    {tab === "setlist" ? "YOUR NEXT SESSION" : "TITLE / KEY"}
                  </span>
                </div>
                <div className="song-list">
                  {visible.map((s, i) => (
                    <div
                      key={s.id}
                      className={`song-row ${song?.id === s.id ? "selected" : ""}`}
                    >
                      <button className="song-select" onClick={() => choose(s)}>
                        <span className={`song-art art-${i % 4}`}>
                          <Music2 size={21} />
                        </span>
                        <span className="song-info">
                          <strong>{s.title}</strong>
                          <small>{s.artist || "Your original"}</small>
                          <span className="song-detail">
                            {chordsIn(s.body).length} chords <i>·</i>{" "}
                            {s.kind === "starter"
                              ? "Chord starter"
                              : s.kind === "traditional"
                                ? "Traditional"
                                : "Your song"}
                          </span>
                        </span>
                        <span className="key-badge">{s.key}</span>
                      </button>
                      <button
                        className={`favorite ${s.favorite ? "favorited" : ""}`}
                        aria-label={`${s.favorite ? "Remove" : "Add"} ${s.title} ${s.favorite ? "from" : "to"} setlist`}
                        onClick={() => update({ ...s, favorite: !s.favorite })}
                      >
                        <Heart
                          size={17}
                          fill={s.favorite ? "currentColor" : "none"}
                        />
                      </button>
                      {tab === "setlist" && (
                        <div className="reorder">
                          <button
                            aria-label={`Move ${s.title} up`}
                            disabled={i === 0}
                            onClick={() => {
                              const other = visible[i - 1];
                              const next = [...songs];
                              const a = next.indexOf(s),
                                b = next.indexOf(other);
                              [next[a], next[b]] = [next[b], next[a]];
                              persist(next);
                            }}
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            aria-label={`Move ${s.title} down`}
                            disabled={i === visible.length - 1}
                            onClick={() => {
                              const other = visible[i + 1];
                              const next = [...songs];
                              const a = next.indexOf(s),
                                b = next.indexOf(other);
                              [next[a], next[b]] = [next[b], next[a]];
                              persist(next);
                            }}
                          >
                            <ArrowDown size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {!visible.length && (
                  <div className="empty-state">
                    <Music2 size={30} />
                    <h2>{search ? "No matching songs" : "Build your set"}</h2>
                    <p>
                      {search
                        ? "Try another title or artist."
                        : "Tap the heart on any song to add it here."}
                    </p>
                  </div>
                )}
                <button
                  className="add-song-dashed"
                  onClick={() => setDraft(newSong())}
                >
                  <Plus size={19} /> Add a song of your own
                </button>
                <div className="library-bottom">
                  <span>Something familiar?</span>
                  <button
                    onClick={() => {
                      setTab("discover");
                      setSearch("");
                    }}
                  >
                    Explore popular songs <span>↗</span>
                  </button>
                </div>
              </>
            )}
          </section>
          <div className="reader-pane">
            {song ? (
              <Reader
                memory={readerMemory.current}
                key={song.id}
                song={song}
                active={path !== "/profile" && !draft}
                playing={playing}
                setPlaying={setPlaying}
                edit={() => setDraft({ ...song })}
                back={() => {
                  setMobileSheet(false);
                  setPlaying(false);
                }}
                update={update}
                notify={setNotice}
                next={() => {
                  const pool =
                    tab === "setlist" ? songs.filter((s) => s.favorite) : songs;
                  const n =
                    pool[
                      (pool.findIndex((s) => s.id === song.id) + 1) %
                        pool.length
                    ];
                  if (n) choose(n);
                }}
              />
            ) : (
              <div className="empty-state">
                <Guitar size={40} />
                <h2>Your next song starts here.</h2>
                <p>Add lyrics and a few chords to get playing.</p>
                <button className="primary" onClick={() => setDraft(newSong())}>
                  Create a song
                </button>
              </div>
            )}
          </div>
        </div>
        {draft && (
          <Editor
            song={draft}
            onChange={setDraft}
            onSave={save}
            onClose={() => {
              if (
                JSON.stringify(draft) !==
                  JSON.stringify(songs.find((s) => s.id === draft.id)) &&
                !window.confirm("Discard this unsaved draft?")
              )
                return;
              setDraft(null);
            }}
            onDelete={() => {
              if (
                window.confirm(`Delete “${draft.title}” from this device?`) &&
                persist(songs.filter((s) => s.id !== draft.id))
              ) {
                setDraft(null);
                setMobileSheet(false);
              }
            }}
            existing={songs.some((s) => s.id === draft.id)}
          />
        )}
      </div>
    </Shell>
  );
}
