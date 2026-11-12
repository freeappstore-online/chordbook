# Chordbook

A pocket music stand for guitar. Mobile chord-and-lyrics editing, semitone transposition (including slash basses), capo and sounding key, guitar chord diagrams, favorites and ordered setlists, autoscroll, screen wake lock where supported, fullscreen, text sizing, metronome, and ChordPro import/export.

Built with React, TypeScript and the FreeAppStore SDK. Library persistence uses `@freeappstore/sdk/persist`; account/profile, theme and text preferences use the SDK Shell; the offline app shell uses the SDK PWA controller. No account is needed. Songs are stored only in this browser on this device; clearing site data removes them. Export your important songs as ChordPro files.

Live: https://chordbook.freeappstore.online

## Song library

The searchable catalog contains **770 entries** across classic rock, pop, indie, country, folk, soul, reggae, sea shanties, carols and more:

- **55 traditional lyric selections with practice chords** (not necessarily every verse).
- **223 simplified chord practice starters** for modern songs, without copyrighted lyrics. Key/capo values are practice settings, not verified recording keys; palettes are not full transcriptions.
- **492 chart references** with external search links and a create-your-own-sheet action. No chords or keys are inferred for these entries.

Browse by genre and availability, sort by artist/title, and search without matching accents or punctuation. Results show 24 entries per page. Existing device-local libraries are preserved; catalog songs are added only when chosen. New installations begin with the traditional collection. Users can enter their own lyrics or import their own ChordPro/plain-text sheets. Library content attribution is in `web/src/library.ts`, `web/src/traditional-extra.ts` and each traditional sheet's note. Modern titles and artists are curated factual references in `web/src/catalog-data.ts`; practice palettes are in `web/src/chord-starters.ts`. No scraped lyric dataset is included.

## Development

Node 22+, pnpm 10.30.3.

```sh
pnpm install
pnpm dev
pnpm typecheck
pnpm test
pnpm build
fas check
```

Pushes to `main` deploy through the FAS keyless workflow.

MIT license covers app source code and the original simple practice arrangements. Traditional lyric texts are public domain; song titles and artist names are descriptive references.
