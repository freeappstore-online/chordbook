import type { Song } from "./music";
import { EXTRA_TRADITIONAL } from "./traditional-extra";
const traditional = (
  id: string,
  title: string,
  key: string,
  bpm: number,
  body: string,
  note: string,
): Song => ({
  id,
  title,
  artist: "Traditional · Public domain",
  key,
  capo: 0,
  bpm,
  body,
  favorite: false,
  kind: "traditional",
  note,
});
export const LIBRARY: Song[] = [
  traditional(
    "amazing-grace",
    "Amazing Grace",
    "G",
    80,
    `{section: Verse 1}
[G]Amazing grace, how [C]sweet the [G]sound,
That saved a wretch like [D]me!
I [G]once was lost, but [C]now am [G]found,
Was [Em]blind, but [D]now I [G]see.

{section: Verse 2}
'Twas [G]grace that taught my [C]heart to [G]fear,
And grace my fears re[D]lieved;
How [G]precious did that [C]grace ap[G]pear
The [Em]hour I [D]first be[G]lieved!

{section: Verse 3}
Through [G]many dangers, [C]toils and [G]snares,
I have already [D]come;
'Tis [G]grace hath brought me [C]safe thus [G]far,
And [Em]grace will [D]lead me [G]home.

{section: Verse 4}
The [G]Lord has promised [C]good to [G]me,
His word my hope se[D]cures;
He [G]will my shield and [C]portion [G]be,
As [Em]long as [D]life en[G]dures.`,
    "Words: John Newton, 1779. Traditional melody. Simple chord arrangement for practice. Source: https://hymnary.org/text/amazing_grace_how_sweet_the_sound",
  ),
  traditional(
    "scarborough-fair",
    "Scarborough Fair",
    "Am",
    90,
    `{section: Verse 1}
[Am]Are you going to [G]Scarborough [Am]Fair?
[C]Parsley, [Am]sage, rose[C]mary and [G]thyme.
Re[Am]member [C]me to [G]one who lives [Am]there,
She [G]once was a [Em]true love of [Am]mine.

{section: Verse 2}
[Am]Tell her to make me a [G]cambric [Am]shirt,
[C]Parsley, [Am]sage, rose[C]mary and [G]thyme.
With[Am]out any [C]seam nor [G]needle[Am]work,
Then [G]she'll be a [Em]true love of [Am]mine.

{section: Instrumental}
[Am]    [G]    [Am]    [C]
[Am]    [G]    [Em]    [Am]`,
    "Traditional English ballad. Traditional verses only; no modern counter-melody or arrangement.",
  ),
  traditional(
    "greensleeves",
    "Greensleeves",
    "Am",
    85,
    `{section: Verse}
A[Am]las, my [C]love, you [G]do me [Em]wrong,
To [Am]cast me off dis[E]courteously.
For [Am]I have [C]loved you [G]well and [Em]long,
De[Am]lighting in your [E]compa[Am]ny.

{section: Chorus}
[C]Greensleeves was [G]all my [Em]joy,
[Am]Greensleeves was my [E]delight,
[C]Greensleeves was my [G]heart of [Em]gold,
And [Am]who but my [E]lady [Am]Greensleeves.

{section: Instrumental}
[Am]    [C]    [G]    [Em]
[Am]    [E]    [Am]`,
    "Traditional English song, first published in 1580. Simple practice arrangement.",
  ),
  traditional(
    "auld-lang-syne",
    "Auld Lang Syne",
    "G",
    90,
    `{section: Verse 1}
Should [G]auld acquaintance [D]be forgot,
And [G]never brought to [C]mind?
Should [G]auld acquaintance [D]be forgot,
And [C]auld lang [G]syne?

{section: Chorus}
For [G]auld lang [D]syne, my dear,
For [G]auld lang [C]syne,
We'll [G]take a cup of [D]kindness yet,
For [C]auld lang [G]syne.

{section: Verse 2}
And [G]surely ye'll be [D]your pint-stowp,
And [G]surely I'll be [C]mine!
And [G]we'll tak a cup o' [D]kindness yet,
For [C]auld lang [G]syne.`,
    "Words: Robert Burns, 1788. Traditional melody. Simple practice arrangement.",
  ),
  traditional(
    "oh-susanna",
    "Oh! Susanna",
    "C",
    110,
    `{section: Verse}
I [C]come from Alabama
With my banjo on my [G]knee,
I'm [C]going to Louisiana,
My [G]true love for to [C]see.

{section: Chorus}
[F]Oh! Susanna,
Oh [C]don't you cry for [G]me,
For I [C]come from Alabama
With my [G]banjo on my [C]knee.`,
    "Stephen Foster, 1848. Selected verse and chorus; simple practice arrangement.",
  ),
  traditional(
    "when-the-saints",
    "When the Saints Go Marching In",
    "G",
    105,
    `{section: Verse}
Oh, when the [G]saints go marching in,
Oh, when the saints go marching [D]in,
Oh [G]Lord, I want to [C]be in that number,
When the [G]saints go [D]marching [G]in.

{section: Verse 2}
Oh, when the [G]sun refuses to shine,
Oh, when the sun refuses to [D]shine,
Oh [G]Lord, I want to [C]be in that number,
When the [G]sun re[D]fuses to [G]shine.

{section: Instrumental}
[G]    [G]    [D]    [D]
[G]    [C]    [G] [D] [G]`,
    "Traditional spiritual. Simple practice arrangement; not a transcription of a recording.",
  ),
  ...EXTRA_TRADITIONAL,
];
export interface PopularSong {
  title: string;
  artist: string;
  key: string;
  chords: string[];
  capo: number;
}
export const POPULAR: PopularSong[] = [
  {
    title: "Wonderwall",
    artist: "Oasis",
    key: "Em",
    chords: ["Em", "G", "D", "A7"],
    capo: 2,
  },
  {
    title: "Let It Be",
    artist: "The Beatles",
    key: "C",
    chords: ["C", "G", "Am", "F"],
    capo: 0,
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    key: "G",
    chords: ["G", "Em", "C", "D"],
    capo: 1,
  },
  {
    title: "Take Me Home, Country Roads",
    artist: "John Denver",
    key: "G",
    chords: ["G", "Em", "D", "C"],
    capo: 2,
  },
  {
    title: "Riptide",
    artist: "Vance Joy",
    key: "Am",
    chords: ["Am", "G", "C"],
    capo: 1,
  },
  {
    title: "Stand by Me",
    artist: "Ben E. King",
    key: "G",
    chords: ["G", "Em", "C", "D"],
    capo: 2,
  },
  {
    title: "Hallelujah",
    artist: "Leonard Cohen",
    key: "C",
    chords: ["C", "Am", "F", "G", "Em"],
    capo: 0,
  },
  {
    title: "Knockin’ on Heaven’s Door",
    artist: "Bob Dylan",
    key: "G",
    chords: ["G", "D", "Am", "C"],
    capo: 0,
  },
  {
    title: "I'm Yours",
    artist: "Jason Mraz",
    key: "G",
    chords: ["G", "D", "Em", "C"],
    capo: 4,
  },
  {
    title: "Someone Like You",
    artist: "Adele",
    key: "G",
    chords: ["G", "D", "Em", "C"],
    capo: 2,
  },
  {
    title: "Yellow",
    artist: "Coldplay",
    key: "G",
    chords: ["G", "D", "C", "Em"],
    capo: 4,
  },
  {
    title: "Hey Jude",
    artist: "The Beatles",
    key: "D",
    chords: ["D", "A", "G", "D7"],
    capo: 3,
  },
];
export function popularStarter(item: PopularSong): Song {
  return {
    id: crypto.randomUUID(),
    title: item.title,
    artist: item.artist,
    key: item.key,
    capo: item.capo,
    bpm: 90,
    favorite: false,
    kind: "starter",
    note: "Simplified practice chord palette, not a complete transcription. Key and capo are practice settings, not a claim about the recording. Add your own lyrics and arrangement.",
    body: `{section: Chord practice}\n${item.chords.map((c) => "[" + c + "]").join("    ")}\n\n{section: Verse}\n\n{section: Chorus}\n`,
  };
}
