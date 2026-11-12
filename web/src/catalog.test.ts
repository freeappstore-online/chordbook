import { describe, expect, it } from "vitest";
import { CATALOG, filterCatalog, catalogSong, identity } from "./catalog";
import { CHORD_RE, chordsIn, validSongs } from "./music";
describe("expanded catalog", () => {
  it("contains a large unique collection with real playable sheets and practice palettes", () => {
    expect(CATALOG.length).toBeGreaterThan(750);
    expect(CATALOG.filter((s) => s.kind === "sheet").length).toBeGreaterThan(
      50,
    );
    expect(CATALOG.filter((s) => s.kind === "starter").length).toBeGreaterThan(
      200,
    );
    expect(new Set(CATALOG.map((s) => s.id)).size).toBe(CATALOG.length);
    console.log(
      "Catalog:",
      CATALOG.length,
      "sheets:",
      CATALOG.filter((s) => s.kind === "sheet").length,
      "starters:",
      CATALOG.filter((s) => s.kind === "starter").length,
      "references:",
      CATALOG.filter((s) => s.kind === "reference").length,
    );
  });
  it("builds valid, exportable songs and only assigns chords to actual palettes", () => {
    expect(validSongs(CATALOG.map(catalogSong))).toBe(true);
    for (const entry of CATALOG) {
      const song = catalogSong(entry);
      for (const chord of chordsIn(song.body))
        expect(CHORD_RE.test(chord)).toBe(true);
      if (entry.kind === "reference")
        expect(chordsIn(song.body)).toHaveLength(0);
      else expect(chordsIn(song.body).length).toBeGreaterThan(0);
    }
  });
  it("searches by multiple words with accents and punctuation normalized", () => {
    expect(
      filterCatalog("beatles blackbird", "all", "all", "featured").map(
        (s) => s.title,
      ),
    ).toEqual(["Blackbird"]);
    expect(
      filterCatalog("frere jacques", "all", "sheet", "title").map(
        (s) => s.title,
      ),
    ).toEqual(["Frère Jacques"]);
    expect(identity("Knockin’ on Heaven’s Door", "Bob Dylan")).toBe(
      identity("Knockin' on Heaven's Door", "Bob Dylan"),
    );
  });
  it("combines genre and availability, sorts results, and returns no fabricated matches", () => {
    const carols = filterCatalog("", "Christmas", "sheet", "title");
    expect(carols.length).toBeGreaterThan(5);
    expect(
      carols.every((s) => s.kind === "sheet" && s.genre === "Christmas"),
    ).toBe(true);
    expect(carols.map((s) => s.title)).toEqual(
      carols.map((s) => s.title).sort((a, b) => a.localeCompare(b)),
    );
    expect(
      filterCatalog("not-a-real-song-xyz", "all", "all", "featured"),
    ).toEqual([]);
    expect(
      filterCatalog("radiohead", "all", "starter", "title").length,
    ).toBeGreaterThan(3);
  });
});
