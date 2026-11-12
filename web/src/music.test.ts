import { describe, expect, it } from "vitest";
import {
  transpose,
  parseLine,
  fromChordPro,
  toChordPro,
  validSongs,
  chordsIn,
} from "./music";
import { LIBRARY, POPULAR, popularStarter } from "./library";
describe("guitar chord sheets", () => {
  it("transposes roots and slash basses without changing chord quality", () => {
    expect(transpose("F#m7/C#", 2)).toBe("G#m7/D#");
    expect(transpose("Bbmaj7/F", -2, true)).toBe("Abmaj7/Eb");
    expect(transpose("Am", -14)).toBe("Gm");
    expect(transpose("C", 12)).toBe("C");
    expect(transpose("N.C.", 2)).toBe("N.C.");
  });
  it("preserves lyric spacing and associates chords with the following text", () => {
    expect(parseLine("Before [G]hello [C]world")).toEqual([
      { chord: "", text: "Before " },
      { chord: "G", text: "hello " },
      { chord: "C", text: "world" },
    ]);
    expect(parseLine("[Am]    [G]")).toEqual([
      { chord: "Am", text: "    " },
      { chord: "G", text: "" },
    ]);
    expect(chordsIn("[G]test [G]again [D/F#]end")).toEqual(["G", "D/F#"]);
  });
  it("round trips title, minor key, capo, tempo and lyrics through ChordPro", () => {
    const original = { ...LIBRARY[1], capo: 3, bpm: 116 };
    const imported = fromChordPro(toChordPro(original));
    expect(imported.title).toBe(original.title);
    expect(imported.body).toBe(original.body);
    expect(imported.key).toBe("Am");
    expect(imported.capo).toBe(3);
    expect(imported.bpm).toBe(116);
  });
  it("rejects malformed storage while accepting all included songs and starters", () => {
    expect(validSongs(LIBRARY)).toBe(true);
    expect(validSongs(POPULAR.map(popularStarter))).toBe(true);
    expect(validSongs([{ ...LIBRARY[0], capo: 99 }])).toBe(false);
    expect(validSongs([{ title: "bad" }])).toBe(false);
  });
  it("bounds imported files and ignores invalid metadata", () => {
    expect(() => fromChordPro("x".repeat(200001))).toThrow();
    expect(
      fromChordPro("{capo: 99}\n{tempo: -1}\n{key: banana}\n[C]Hello").capo,
    ).toBe(0);
  });
});
