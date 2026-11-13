import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  Download,
  Edit3,
  Maximize,
  Pause,
  Play,
  Plus,
} from "lucide-react";
import { chordsIn, transpose, toChordPro, type Song } from "./music";
import { ChordDiagram, Sheet } from "./Sheet";
import type { ReaderPrefs } from "./Settings";
export interface ReaderMemory {
  position: number;
}
export default function Reader({
  song,
  prefs,
  memory,
  active,
  playing,
  setPlaying,
  edit,
  back,
  update,
  notify,
  next,
}: {
  song: Song;
  prefs: ReaderPrefs;
  memory: Map<string, ReaderMemory>;
  active: boolean;
  playing: boolean;
  setPlaying: (v: boolean) => void;
  edit: () => void;
  back: () => void;
  update: (s: Song) => boolean;
  notify: (s: string) => void;
  next: () => void;
}) {
  const shift = song.shift ?? 0,
    capo = song.capo,
    { size, flats, diagrams, wake } = prefs;
  const [speed, setSpeed] = useState(24),
    [metro, setMetro] = useState(false),
    [bpm, setBpm] = useState(song.bpm);
  const [tempoText, setTempoText] = useState(String(song.bpm));
  const scroll = useRef<HTMLDivElement>(null);
  const reader = useRef<HTMLElement>(null);
  const snapshot = useRef<ReaderMemory>({
    position: memory.get(song.id)?.position ?? 0,
  });
  useEffect(() => {
    const el = scroll.current;
    if (el) el.scrollTop = snapshot.current.position;
    const record = () => {
      if (el) snapshot.current.position = el.scrollTop;
    };
    el?.addEventListener("scroll", record);
    return () => {
      memory.set(song.id, snapshot.current);
      el?.removeEventListener("scroll", record);
    };
  }, [memory, song.id]);
  useEffect(() => {
    setBpm(song.bpm);
    setTempoText(String(song.bpm));
  }, [song.bpm]);
  useEffect(() => {
    if (!active) {
      setPlaying(false);
      setMetro(false);
    }
  }, [active, setPlaying]);
  useEffect(() => {
    if (!playing || !active) return;
    let id = 0,
      last = 0,
      remainder = 0;
    const step = (time: number) => {
      if (last && scroll.current) {
        remainder += (Math.min(time - last, 100) / 1000) * speed;
        const whole = Math.floor(remainder);
        if (whole) {
          scroll.current.scrollTop += whole;
          remainder -= whole;
        }
        if (
          scroll.current.scrollHeight > scroll.current.clientHeight &&
          scroll.current.scrollTop >=
            scroll.current.scrollHeight - scroll.current.clientHeight - 1
        ) {
          setPlaying(false);
          return;
        }
      }
      last = time;
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [playing, speed, active, setPlaying]);
  useEffect(() => {
    if (!active || (!playing && !wake)) return;
    let lock: WakeLockSentinel | undefined;
    let cancelled = false;
    const acquire = async () => {
      if (document.visibilityState !== "visible" || !("wakeLock" in navigator))
        return;
      try {
        const acquired = await navigator.wakeLock.request("screen");
        if (cancelled) void acquired.release();
        else lock = acquired;
      } catch {
        notify("Keep-awake is unavailable. Your device may still dim.");
      }
    };
    void acquire();
    const visibility = () => {
      if (document.hidden) {
        setPlaying(false);
        setMetro(false);
      } else void acquire();
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelled = true;
      void lock?.release();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [playing, wake, active, notify, setPlaying]);
  useEffect(() => {
    if (!metro || !active) return;
    const audio = new AudioContext();
    void audio.resume().catch(() => {
      setMetro(false);
      notify("Audio could not start. Tap the metronome again.");
    });
    const tick = () => {
      const o = audio.createOscillator(),
        g = audio.createGain();
      o.frequency.value = 900;
      g.gain.setValueAtTime(0.12, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.06);
      o.connect(g);
      g.connect(audio.destination);
      o.start();
      o.stop(audio.currentTime + 0.07);
    };
    tick();
    const timer = setInterval(tick, 60000 / bpm);
    const hide = () => {
      if (document.hidden) setMetro(false);
    };
    document.addEventListener("visibilitychange", hide);
    return () => {
      clearInterval(timer);
      void audio.close();
      document.removeEventListener("visibilitychange", hide);
    };
  }, [metro, bpm, active, notify]);
  const chordList = chordsIn(song.body).map((c) => transpose(c, shift, flats));
  const exportSong = () => {
    const transposed = {
      ...song,
      key: transpose(song.key, shift, flats),
      capo,
      bpm,
      body: song.body.replace(
        /\[([^\]]+)\]/g,
        (_, c: string) => `[${transpose(c, shift, flats)}]`,
      ),
    };
    download(
      toChordPro(transposed),
      `${song.title.replace(/[^a-z0-9]/gi, "-")}.cho`,
      "text/plain",
    );
    notify("ChordPro file exported with your current transpose and capo.");
  };
  return (
    <article ref={reader} className="song-reader">
      <div className="reader-top">
        <button className="mobile-back" onClick={back}>
          <ArrowLeft size={18} /> Songs
        </button>
        <div className="reader-actions">
          <button
            className="icon-button"
            aria-label="Export song"
            onClick={exportSong}
          >
            <Download size={18} />
          </button>
          <button
            className="icon-button"
            aria-label="Fullscreen song"
            onClick={() => {
              if (document.fullscreenElement) void document.exitFullscreen();
              else if (reader.current?.requestFullscreen)
                void reader.current
                  .requestFullscreen()
                  .catch(() =>
                    notify("Fullscreen is unavailable in this browser."),
                  );
              else
                notify(
                  "Fullscreen is unavailable. Use the play view as your music stand.",
                );
            }}
          >
            <Maximize size={17} />
          </button>
          <button
            className="small-button"
            onClick={() => {
              setPlaying(false);
              setMetro(false);
              edit();
            }}
          >
            <Edit3 size={15} /> Edit song
          </button>
        </div>
      </div>
      <div className="song-heading">
        <h2>{song.title}</h2>
      </div>
      {diagrams && chordList.length > 0 && (
        <div className="chord-diagrams" aria-label="Guitar chord shapes">
          {chordList.map((c) => (
            <ChordDiagram key={c} chord={c} />
          ))}
        </div>
      )}
      <div
        ref={scroll}
        className="sheet-scroll"
        style={{ "--sheet-size": `${size / 16}rem` } as CSSProperties}
        tabIndex={0}
        aria-label="Scrollable chord sheet"
      >
        <Sheet body={song.body} shift={shift} flats={flats} />
        {song.kind === "starter" && (
          <div className="starter-note">
            <Edit3 size={20} />
            <strong>Your arrangement starts here.</strong>
            <p>
              This is a simplified chord palette. Tap Edit song to add your
              lyrics and place chords exactly where you want them.
            </p>
            <button onClick={edit}>
              Add lyrics <Plus size={15} />
            </button>
          </div>
        )}
        <div className="end-mark">◇</div>
        {song.note && <p className="arrangement-note">{song.note}</p>}
      </div>
      <div className="transport">
        <button
          className={`play-button ${playing ? "running" : ""}`}
          onClick={() => {
            if (
              !playing &&
              scroll.current &&
              scroll.current.scrollTop >=
                scroll.current.scrollHeight - scroll.current.clientHeight - 1
            )
              scroll.current.scrollTop = 0;
            setPlaying(!playing);
          }}
          aria-label={playing ? "Pause autoscroll" : "Start autoscroll"}
        >
          {playing ? (
            <Pause size={19} fill="currentColor" />
          ) : (
            <Play size={19} fill="currentColor" />
          )}
          <span>{playing ? "Pause" : "Autoscroll"}</span>
        </button>
        <label className="scroll-speed">
          SPEED
          <input
            aria-label="Autoscroll speed"
            type="range"
            min="8"
            max="70"
            value={speed}
            onChange={(e) => setSpeed(+e.target.value)}
          />
          <span>{speed}</span>
        </label>
        <div className="tempo-control">
          <button
            className={metro ? "metronome active" : "metronome"}
            aria-label={metro ? "Stop metronome" : "Start metronome"}
            aria-pressed={metro}
            onClick={() => setMetro((v) => !v)}
          >
            <span className="metro-dot" />♩
          </button>
          <label>
            <input
              aria-label="Tempo BPM"
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
                setBpm(next);
                setTempoText(String(next));
                if (next !== song.bpm) update({ ...song, bpm: next });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
              }}
            />
            <span>BPM</span>
          </label>
        </div>
        <button
          className="next-song"
          onClick={() => {
            setPlaying(false);
            setMetro(false);
            next();
          }}
          aria-label="Next song"
        >
          Next →
        </button>
      </div>
    </article>
  );
}
function download(text: string, name: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
