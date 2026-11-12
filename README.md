# Chordbook

A pocket music stand for guitar. Mobile chord-and-lyrics editing, semitone transposition (including slash basses), capo and sounding key, guitar chord diagrams, favorites and ordered setlists, autoscroll, screen wake lock where supported, fullscreen, text sizing, metronome, and ChordPro import/export.

Built with React, TypeScript and the FreeAppStore SDK. Library persistence uses `@freeappstore/sdk/persist`; account/profile, theme and text preferences use the SDK Shell; the offline app shell uses the SDK PWA controller. No account is needed. Songs are stored only in this browser on this device; clearing site data removes them. Export your important songs as ChordPro files.

Live: https://chordbook.freeappstore.online

## Song library

Six traditional public-domain lyric selections with simple practice arrangements. Modern song discovery contains twelve popular-song references, simplified chord palettes and external chart-search links. These are not complete transcriptions and do not include copyrighted lyrics. Users can enter their own lyrics or import their own ChordPro/plain-text sheets. Library content attribution is in `web/src/library.ts` and each traditional sheet's note.

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
