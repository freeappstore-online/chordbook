import type { Song } from "./music";
// Historical lyric selections; these are our simple practice arrangements,
// not transcriptions of any modern recording. Provenance is retained per song.
const DATA: [string, string, string, number, string, string][] = [
  [
    "will-the-circle",
    "Will the Circle Be Unbroken",
    "G",
    95,
    `{section: Verse}
There are [G]loved ones in the glory,
Whose dear forms you often [C]miss;
When you [G]close your earthly [Em]story,
Will you [G]join them [D]in their [G]bliss?

{section: Chorus}
Will the [G]circle be unbroken,
By and by, by and [C]by?
Is a [G]better home a[Em]waiting
In the [G]sky, Lord, [D]in the [G]sky?`,
    "Ada R. Habershon / Charles H. Gabriel, 1907. Original hymn text; not the later Carter Family rewrite.",
  ],
  [
    "swing-low",
    "Swing Low, Sweet Chariot",
    "G",
    80,
    `{section: Chorus}
Swing [G]low, sweet [C]chari[G]ot,
Coming for to carry me [D]home.
Swing [G]low, sweet [C]chari[G]ot,
Coming for to [D]carry me [G]home.

{section: Verse}
I looked [G]over Jordan, and [C]what did I [G]see,
Coming for to carry me [D]home?
A [G]band of angels coming [C]after [G]me,
Coming for to [D]carry me [G]home.`,
    "Traditional spiritual, associated with Wallace Willis, nineteenth century.",
  ],
  [
    "wayfaring-stranger",
    "Wayfaring Stranger",
    "Am",
    80,
    `{section: Verse}
I am a [Am]poor wayfaring stranger,
While travelling through this world of [Dm]woe.
Yet there's no [Am]sickness, toil nor danger,
In that bright world to [E]which I [Am]go.

{section: Refrain}
I'm going [F]there to see my [C]father,
I'm going [F]there no more to [E]roam.
I'm only [Am]going over Jordan,
I'm only going [E]over [Am]home.`,
    "Traditional American spiritual, nineteenth century. Traditional verse selection.",
  ],
  [
    "down-riverside",
    "Down by the Riverside",
    "G",
    110,
    `{section: Verse}
Gonna [G]lay down my sword and shield,
Down by the riverside,
[D]Down by the riverside,
[G]Down by the riverside.
Gonna lay down my sword and shield,
Down by the riverside,
I ain't gonna study [D]war no [G]more.

{section: Chorus}
I ain't gonna study [C]war no more,
Ain't gonna study [G]war no more,
I ain't gonna study [D]war no [G]more.`,
    "Traditional spiritual; documented before 1920.",
  ],
  [
    "go-tell-mountain",
    "Go Tell It on the Mountain",
    "G",
    100,
    `{section: Chorus}
[G]Go, tell it on the mountain,
[D]Over the hills and [G]everywhere.
Go, tell it on the mountain,
That Jesus [D]Christ is [G]born.

{section: Verse}
While [G]shepherds kept their watching
O'er silent flocks by [D]night,
Be[G]hold throughout the heavens
There shone a [D]holy [G]light.`,
    "Traditional spiritual; published by John Wesley Work Jr. in 1907.",
  ],
  [
    "drunken-sailor",
    "Drunken Sailor",
    "Dm",
    120,
    `{section: Verse}
[Dm]What shall we do with a drunken sailor?
[C]What shall we do with a drunken sailor?
[Dm]What shall we do with a drunken sailor,
[C]Early in the [Dm]morning?

{section: Chorus}
[Dm]Way, hey, and up she rises,
[C]Way, hey, and up she rises,
[Dm]Way, hey, and up she rises,
[C]Early in the [Dm]morning.

{section: Verse 2}
[Dm]Put him in the longboat till he's sober,
[C]Put him in the longboat till he's sober,
[Dm]Put him in the longboat till he's sober,
[C]Early in the [Dm]morning.`,
    "Traditional sea shanty, nineteenth century.",
  ],
  [
    "leave-her-johnny",
    "Leave Her, Johnny",
    "C",
    90,
    `{section: Verse}
Oh, [C]the times are hard and the [F]wages [C]low,
[F]Leave her, Johnny, [C]leave her.
I guess it's time for [F]us to [C]go,
And it's [G]time for us to [C]leave her.

{section: Chorus}
[C]Leave her, Johnny, [F]leave [C]her,
Oh, [F]leave her, Johnny, [C]leave her.
For the voyage is done and the [F]winds don't [C]blow,
And it's [G]time for us to [C]leave her.`,
    "Traditional sea shanty, nineteenth century. Traditional verse and refrain selection.",
  ],
  [
    "shenandoah",
    "Shenandoah",
    "C",
    75,
    `{section: Verse 1}
Oh, [C]Shenandoah, I [F]long to [C]hear you,
A[F]way, you rolling [C]river.
Oh, Shenandoah, I [F]long to [C]hear you,
A[Am]way, I'm bound a[C]way,
Across the [G]wide Mis[C]souri.

{section: Verse 2}
Oh, [C]Shenandoah, I [F]love your [C]daughter,
A[F]way, you rolling [C]river.
For her I'd cross your [F]roaming [C]water,
A[Am]way, I'm bound a[C]way,
Across the [G]wide Mis[C]souri.`,
    "Traditional American folk song and sea shanty, nineteenth century.",
  ],
  [
    "spanish-ladies",
    "Spanish Ladies",
    "Am",
    105,
    `{section: Verse}
Fare[Am]well and adieu to you [G]Spanish [Am]ladies,
Farewell and adieu to you [C]ladies of [E]Spain;
For [Am]we've received orders for to [G]sail for old [Am]England,
But we hope in a short time to [E]see you a[Am]gain.

{section: Chorus}
We'll [Am]rant and we'll roar like [G]true British [Am]sailors,
We'll rant and we'll roar all a[C]long the salt [E]seas;
Un[Am]til we strike soundings in the [G]Channel of old [Am]England,
From Ushant to Scilly is [E]thirty-five [Am]leagues.`,
    "Traditional British naval song, documented in the eighteenth century.",
  ],
  [
    "wild-rover",
    "The Wild Rover",
    "G",
    110,
    `{section: Verse}
I've [G]been a wild rover for many's a [C]year,
And I've [G]spent all my money on [D]whiskey and [G]beer.
And now I'm returning with gold in great [C]store,
And I [G]never will play the wild [D]rover no [G]more.

{section: Chorus}
And it's [D]no, nay, never,
[G]No, nay, never, no [C]more,
Will I [G]play the wild rover,
No, [D]never, no [G]more.`,
    "Traditional folk song; versions documented in the nineteenth century.",
  ],
  [
    "molly-malone",
    "Molly Malone",
    "C",
    95,
    `{section: Verse}
In [C]Dublin's fair [Am]city, where the [Dm]girls are so [G]pretty,
I [C]first set my [Am]eyes on sweet [Dm]Molly Ma[G]lone.
As she [C]wheeled her wheel[Am]barrow through [Dm]streets broad and [G]narrow,
Crying [C]cockles and [Am]mussels, a[Dm]live, a[G]live, [C]oh!

{section: Chorus}
A[C]live, alive [Am]oh! A[Dm]live, alive [G]oh!
Crying [C]cockles and [Am]mussels, a[Dm]live, a[G]live, [C]oh!`,
    "Traditional Irish song, nineteenth century.",
  ],
  [
    "danny-boy",
    "Danny Boy",
    "C",
    75,
    `{section: Verse}
Oh, [C]Danny boy, the pipes, the [C7]pipes are [F]calling,
From glen to [C]glen, and down the mountainside.[G]
The [C]summer's gone, and all the [C7]roses [F]falling,
'Tis you, 'tis [C]you must [G]go and I must [C]bide.

{section: Refrain}
But come ye [F]back when [G]summer's in the [C]meadow,
Or when the [F]valley's [G]hushed and white with [C]snow.
'Tis I'll be [C]here in [C7]sunshine or in [F]shadow,
Oh, Danny [C]boy, oh, Danny [G]boy, I love you [C]so.`,
    "Words: Frederic Weatherly, 1913; traditional Londonderry Air.",
  ],
  [
    "loch-lomond",
    "Loch Lomond",
    "G",
    85,
    `{section: Verse}
By [G]yon bonnie banks and by [C]yon bonnie [G]braes,
Where the sun shines bright on Loch [D]Lomond,
Where [G]me and my true love were [C]ever wont to [G]gae,
On the bonnie, bonnie [D]banks of Loch [G]Lomond.

{section: Chorus}
Oh, [G]ye'll tak the high road and [C]I'll tak the [G]low road,
And I'll be in Scotland a[D]fore ye;
But [G]me and my true love will [C]never meet a[G]gain,
On the bonnie, bonnie [D]banks of Loch [G]Lomond.`,
    "Traditional Scottish song; published in 1841.",
  ],
  [
    "waltzing-matilda",
    "Waltzing Matilda",
    "G",
    105,
    `{section: Verse}
[G]Once a jolly swagman [D]camped by a billabong,
[G]Under the shade of a [C]coolibah tree,
And he [G]sang as he watched and [D]waited till his billy boiled,
[G]You'll come a-waltzing Ma[D]tilda with [G]me.

{section: Chorus}
[G]Waltzing Matilda, [C]waltzing Ma[G]tilda,
You'll come a-waltzing Ma[D]tilda with me,
And he [G]sang as he watched and [C]waited till his billy boiled,
[G]You'll come a-waltzing Ma[D]tilda with [G]me.`,
    "Words: Banjo Paterson, 1895. Traditional folk-song text selection.",
  ],
  [
    "red-river-valley",
    "Red River Valley",
    "G",
    90,
    `{section: Verse}
From this [G]valley they say you are leaving,
We will miss your bright eyes and sweet [D]smile,
For they [G]say you are taking the [C]sunshine
That has [G]brightened our [D]pathway a [G]while.

{section: Chorus}
Come and [G]sit by my side if you love me,
Do not hasten to bid me a[D]dieu,
But re[G]member the Red River [C]Valley,
And the [G]one who has [D]loved you so [G]true.`,
    "Traditional North American folk song, nineteenth century.",
  ],
  [
    "home-range",
    "Home on the Range",
    "G",
    85,
    `{section: Verse}
Oh, [G]give me a home where the [C]buffalo roam,
Where the [G]deer and the antelope [D]play,
Where [G]seldom is heard a dis[C]couraging word,
And the [G]skies are not [D]cloudy all [G]day.

{section: Chorus}
[G]Home, home on the [D]range,
Where the deer and the antelope [G]play,
Where seldom is heard a dis[C]couraging word,
And the [G]skies are not [D]cloudy all [G]day.`,
    "Words: Brewster M. Higley, 1872; music: Daniel E. Kelley.",
  ],
  [
    "clementine",
    "Oh My Darling, Clementine",
    "G",
    100,
    `{section: Verse}
In a [G]cavern, in a canyon,
Excavating for a [D]mine,
Dwelt a miner, forty-[G]niner,
And his [D]daughter Clemen[G]tine.

{section: Chorus}
Oh my [G]darling, oh my darling,
Oh my darling Clemen[D]tine,
You are lost and gone for[G]ever,
Dreadful [D]sorry, Clemen[G]tine.`,
    "Percy Montrose, 1884; traditional melody.",
  ],
  [
    "camptown-races",
    "Camptown Races",
    "G",
    120,
    `{section: Verse}
[G]Camptown ladies sing this song,
[D]Doo-dah! Doo-dah!
[G]Camptown racetrack's five miles long,
Oh! [D]Doo-dah [G]day!

{section: Chorus}
[G]Goin' to run all night,
[C]Goin' to run all [G]day,
I'll bet my money on the bobtail nag,
Somebody [D]bet on the [G]bay.`,
    "Stephen Foster, 1850. Selected verse and refrain in standard modern spelling.",
  ],
  [
    "bicycle-two",
    "Daisy Bell (Bicycle Built for Two)",
    "C",
    95,
    `{section: Chorus}
[C]Daisy, Daisy, [F]give me your answer [C]do.
[G]I'm half crazy, [C]all for the love of you.
It [C]won't be a stylish [F]marriage,
I [C]can't afford a [G]carriage.
But [C]you'll look [G]sweet upon the [C]seat
Of a [F]bicycle [G]built for [C]two.`,
    "Harry Dacre, 1892. Chorus selection.",
  ],
  [
    "take-ballgame",
    "Take Me Out to the Ball Game",
    "C",
    110,
    `{section: Chorus}
[C]Take me out to the [G]ball game,
Take me out with the [C]crowd.
[A7]Buy me some peanuts and [Dm]Cracker Jack,
[D7]I don't care if I [G]never get back.
Let me [C]root, root, root for the [G]home team,
If they don't win it's a [A7]shame.
For it's [F]one, [C]two, [A7]three strikes you're [Dm]out,
At the [G]old ball [C]game.`,
    "Jack Norworth / Albert Von Tilzer, 1908. Original chorus selection.",
  ],
  [
    "auld-robin",
    "Auld Robin Gray",
    "G",
    85,
    `{section: Verse}
[G]When the sheep are in the fauld, and the [C]kye at [G]hame,
And a' the world to sleep are [D]gane,
The [G]waes o' my heart fa' in [C]showers frae my [G]e'e,
While my gudeman lies [D]sound by [G]me.`,
    "Lady Anne Lindsay, 1772. Opening verse selection.",
  ],
  [
    "beautiful-dreamer",
    "Beautiful Dreamer",
    "C",
    80,
    `{section: Verse}
[C]Beautiful dreamer, wake unto me,
[G]Starlight and dewdrops are waiting for [C]thee;
Sounds of the rude world, heard in the day,
[G]Lulled by the moonlight have all passed a[C]way.

{section: Refrain}
[F]Beautiful dreamer, queen of my [C]song,
[D7]List while I woo thee with soft melo[G]dy;
[C]Gone are the cares of life's busy throng,
[G]Beautiful dreamer, awake unto [C]me.`,
    "Stephen Foster, published 1864. First verse and refrain selection.",
  ],
  [
    "aura-lee",
    "Aura Lee",
    "G",
    85,
    `{section: Verse}
[G]As the blackbird in the [A7]spring,
[D]Neath the willow [G]tree,
Sat and piped, I heard him [A7]sing,
[D]Singing Aura [G]Lee.

{section: Chorus}
[G]Aura Lee, [B7]Aura Lee,
[C]Maid of golden [G]hair;
[C]Sunshine came a[G]long with thee,
And [D]swallows in the [G]air.`,
    "Words: W. W. Fosdick; music: George R. Poulton, 1861. Original text, not Love Me Tender.",
  ],
  [
    "silent-night",
    "Silent Night",
    "G",
    75,
    `{section: Verse 1}
[G]Silent night, holy night,
[D]All is calm, [G]all is bright.
[C]Round yon virgin, [G]mother and child,
[C]Holy infant so [G]tender and mild,
[D]Sleep in heavenly [G]peace,
Sleep in [D]heavenly [G]peace.

{section: Verse 2}
[G]Silent night, holy night,
[D]Shepherds quake [G]at the sight;
[C]Glories stream from [G]heaven afar,
[C]Heavenly hosts sing [G]Alleluia,
[D]Christ the Saviour is [G]born,
Christ the [D]Saviour is [G]born.`,
    "Joseph Mohr / Franz Xaver Gruber, 1818. English translation: John Freeman Young, 1859.",
  ],
  [
    "jingle-bells",
    "Jingle Bells",
    "G",
    120,
    `{section: Verse}
[G]Dashing through the snow,
In a one-horse open [C]sleigh,
O'er the fields we [D]go,
Laughing all the [G]way.
Bells on bobtails ring,
Making spirits [C]bright,
What fun it is to [D]ride and sing
A sleighing song to[G]night!

{section: Chorus}
[G]Jingle bells, jingle bells,
Jingle all the way!
[C]Oh, what fun it [G]is to ride
In a [A7]one-horse open [D]sleigh!
[G]Jingle bells, jingle bells,
Jingle all the way!
[C]Oh, what fun it [G]is to ride
In a [D]one-horse open [G]sleigh!`,
    "James Lord Pierpont, 1857. Traditional verse and chorus text.",
  ],
  [
    "joy-world",
    "Joy to the World",
    "D",
    105,
    `{section: Verse}
[D]Joy to the world, the [A]Lord is [D]come!
Let [G]earth re[A]ceive her [D]King;
Let every heart pre[G]pare Him [D]room,
And heaven and nature sing,
And [A]heaven and nature sing,
And [D]heaven, and [G]heaven, and [D]nature [A]sing.[D]`,
    "Words: Isaac Watts, 1719. Tune: Antioch, nineteenth century.",
  ],
  [
    "deck-halls",
    "Deck the Halls",
    "G",
    115,
    `{section: Verse}
[G]Deck the halls with boughs of holly,
[C]Fa la la la [G]la, [D]la la la [G]la.
'Tis the season to be jolly,
[C]Fa la la la [G]la, [D]la la la [G]la.
[D]Don we now our [G]gay apparel,
[G]Fa la la, [C]la la la, [D]la la la.
[G]Troll the ancient Yuletide carol,
[C]Fa la la la [G]la, [D]la la la [G]la.`,
    "Traditional Welsh melody; English words: Thomas Oliphant, 1862.",
  ],
  [
    "o-christmas-tree",
    "O Christmas Tree",
    "G",
    90,
    `{section: Verse}
[G]O Christmas tree, O Christmas tree,
How [D]lovely are thy [G]branches!
O Christmas tree, O Christmas tree,
How [D]lovely are thy [G]branches!
Thy [C]boughs so green in [G]summertime
Do [C]bravely bear the [D]wintertime.
[G]O Christmas tree, O Christmas tree,
How [D]lovely are thy [G]branches!`,
    "Traditional German carol. Traditional English verse selection.",
  ],
  [
    "we-three-kings",
    "We Three Kings",
    "Em",
    85,
    `{section: Verse}
[Em]We three kings of [B7]Orient [Em]are,
Bearing gifts we [B7]traverse a[Em]far,
[G]Field and fountain, [D]moor and mountain,
[Am]Following [B7]yonder [Em]star.

{section: Chorus}
[G]O star of wonder, [C]star of [G]night,
Star with royal [C]beauty [G]bright,
[Em]Westward [D]leading, [C]still pro[D]ceeding,
[G]Guide us to thy [C]perfect [G]light.`,
    "John Henry Hopkins Jr., 1857. First verse and chorus selection.",
  ],
  [
    "god-rest",
    "God Rest Ye Merry, Gentlemen",
    "Em",
    95,
    `{section: Verse}
God [Em]rest ye merry, gentlemen,
Let nothing you dis[B7]may,
Re[Em]member Christ our Saviour
Was born on Christmas [B7]Day,
To [Am]save us all from [G]Satan's power
When [Em]we were gone as[D]tray;
O [G]tidings of [B7]comfort and [Em]joy,
Comfort and [D]joy,
O [G]tidings of [B7]comfort and [Em]joy.`,
    "Traditional English carol, eighteenth century.",
  ],
  [
    "first-noel",
    "The First Noel",
    "D",
    80,
    `{section: Verse}
The [D]first No[A]el, the [G]angel did [D]say,
Was to [G]certain poor [D]shepherds in [G]fields as they [A]lay;
In [D]fields where [A]they lay [G]keeping their [D]sheep,
On a [G]cold winter's [D]night that [G]was so [A]deep.

{section: Chorus}
No[D]el, No[A]el, No[G]el, No[D]el,
[G]Born is the [D]King of [G]Isra[A]el.[D]`,
    "Traditional English carol, published in the early nineteenth century.",
  ],
  [
    "what-child",
    "What Child Is This?",
    "Am",
    85,
    `{section: Verse}
What [Am]child is [C]this, who, [G]laid to [Em]rest,
On [Am]Mary's lap is [E]sleeping?
Whom [Am]angels [C]greet with [G]anthems [Em]sweet,
While [Am]shepherds watch are [E]keep[Am]ing?

{section: Chorus}
[C]This, this is [G]Christ the [Em]King,
Whom [Am]shepherds guard and [E]angels sing;
[C]Haste, haste to [G]bring Him [Em]laud,
The [Am]Babe, the Son of [E]Ma[Am]ry.`,
    "Words: William Chatterton Dix, 1865; traditional Greensleeves melody.",
  ],
  [
    "twinkle-star",
    "Twinkle, Twinkle, Little Star",
    "C",
    95,
    `{section: Verse}
[C]Twinkle, twinkle, [F]little [C]star,
[F]How I [C]wonder [G]what you [C]are.
Up a[F]bove the [C]world so [G]high,
[C]Like a [F]diamond [C]in the [G]sky.
[C]Twinkle, twinkle, [F]little [C]star,
[F]How I [C]wonder [G]what you [C]are.`,
    "Jane Taylor, 1806; traditional French melody.",
  ],
  [
    "row-boat",
    "Row, Row, Row Your Boat",
    "C",
    90,
    `{section: Round}
[C]Row, row, row your boat,
Gently down the [G]stream.
[C]Merrily, merrily, merrily, merrily,
[G]Life is but a [C]dream.`,
    "Traditional nursery song, nineteenth century.",
  ],
  [
    "frere-jacques",
    "Frère Jacques",
    "C",
    95,
    `{section: Round · French}
[C]Frère Jacques, frère Jacques,
Dormez-vous? [G]Dormez-[C]vous?
Sonnez les matines, sonnez les matines,
[G]Ding, dang, [C]dong! [G]Ding, dang, [C]dong!`,
    "Traditional French round, eighteenth century. Original French text.",
  ],
  [
    "au-clair-lune",
    "Au clair de la lune",
    "C",
    85,
    `{section: Verse · French}
[C]Au clair de la lune,
[G]Mon ami Pier[C]rot,
Prête-moi ta plume
[G]Pour écrire un [C]mot.
[F]Ma chandelle est [C]morte,
[G]Je n'ai plus de [C]feu;
Ouvre-moi ta porte,
[G]Pour l'amour de [C]Dieu.`,
    "Traditional French song, eighteenth century. Original French text.",
  ],
  [
    "london-bridge",
    "London Bridge Is Falling Down",
    "G",
    100,
    `{section: Verse}
[G]London Bridge is falling down,
[D]Falling down, [G]falling down.
London Bridge is falling down,
[D]My fair [G]lady.

{section: Verse 2}
[G]Build it up with wood and clay,
[D]Wood and clay, [G]wood and clay.
Build it up with wood and clay,
[D]My fair [G]lady.`,
    "Traditional English nursery rhyme.",
  ],
  [
    "old-macdonald",
    "Old MacDonald Had a Farm",
    "G",
    105,
    `{section: Verse}
[G]Old MacDonald [C]had a [G]farm,
E-I-[D]E-I-[G]O.
And on that farm he [C]had a [G]cow,
E-I-[D]E-I-[G]O.
With a moo moo here and a moo moo there,
Here a moo, there a moo, everywhere a moo moo.
Old MacDonald [C]had a [G]farm,
E-I-[D]E-I-[G]O.`,
    "Traditional American nursery song, published in the early twentieth century.",
  ],
  [
    "skip-lou",
    "Skip to My Lou",
    "C",
    115,
    `{section: Chorus}
[C]Lou, Lou, skip to my Lou,
[G]Lou, Lou, skip to my Lou,
[C]Lou, Lou, skip to my Lou,
[G]Skip to my Lou, my [C]darling.

{section: Verse}
[C]Lost my partner, what'll I do?
[G]Lost my partner, what'll I do?
[C]Lost my partner, what'll I do?
[G]Skip to my Lou, my [C]darling.`,
    "Traditional American folk dance song, nineteenth century.",
  ],
  [
    "shortnin-bread",
    "Shortnin’ Bread",
    "G",
    115,
    `{section: Chorus}
[G]Mama's little baby loves shortnin', shortnin',
Mama's little baby loves [D]shortnin' [G]bread.
Mama's little baby loves shortnin', shortnin',
Mama's little baby loves [D]shortnin' [G]bread.`,
    "Traditional African American folk song. Refrain selection.",
  ],
  [
    "grandfather-clock",
    "My Grandfather’s Clock",
    "G",
    95,
    `{section: Verse}
My [G]grandfather's [D]clock was too [G]large for the [C]shelf,
So it [G]stood ninety [D]years on the [G]floor;
It was taller by [D]half than the [G]old man him[C]self,
Though it [G]weighed not a [D]pennyweight [G]more.
It was [G]bought on the morn of the [C]day that he was [G]born,
And was always his [A7]treasure and [D]pride;
But it [G]stopped short, [D]never to [G]go a[C]gain,
When the [G]old [D]man [G]died.`,
    "Henry Clay Work, 1876. First verse selection.",
  ],
  [
    "ash-grove",
    "The Ash Grove",
    "G",
    85,
    `{section: Verse}
Down [G]yonder green valley, where [C]streamlets me[G]ander,
When twilight is fading, I [D]pensively rove;
Or at [G]the bright noontide in [C]solitude [G]wander,
Amid the dark shades of the [D]lonely ash [G]grove.`,
    "Traditional Welsh tune. English text: Thomas Oliphant, nineteenth century. Opening verse selection.",
  ],
  [
    "water-wide",
    "The Water Is Wide",
    "G",
    80,
    `{section: Verse 1}
The water is [G]wide, I cannot cross [C]o'er,
And neither [G]have I wings to [D]fly.
Give me a [G]boat that can carry [C]two,
And both shall [G]row, my [D]love and [G]I.

{section: Verse 2}
A ship there [G]is, and she sails the [C]sea,
She's loaded [G]deep, as deep can [D]be;
But not so [G]deep as the love I'm [C]in,
I know not [G]how I [D]sink or [G]swim.`,
    "Traditional British folk song, collected by Cecil Sharp in the early twentieth century.",
  ],
  [
    "nearer-my-god",
    "Nearer, My God, to Thee",
    "G",
    75,
    `{section: Verse}
[G]Nearer, my [C]God, to [G]Thee,
[D]Nearer to [G]Thee!
E'en though it [C]be a [G]cross
[D]That raiseth [G]me,
Still all my song would be,
Nearer, my [C]God, to [G]Thee,
Nearer, my [C]God, to [G]Thee,
[D]Nearer to [G]Thee!`,
    "Sarah Flower Adams, 1841. Tune: Bethany, Lowell Mason, 1856.",
  ],
  [
    "abide-with-me",
    "Abide with Me",
    "C",
    75,
    `{section: Verse}
[C]Abide with [F]me; fast [G]falls the even[C]tide;
The darkness [F]deepens; [G]Lord, with me a[C]bide.
When other [F]helpers [C]fail and comforts [G]flee,
[C]Help of the [F]helpless, [G]O abide with [C]me.`,
    "Henry Francis Lyte, 1847. Tune: Eventide, William Henry Monk, 1861.",
  ],
  [
    "holy-holy",
    "Holy, Holy, Holy",
    "D",
    85,
    `{section: Verse}
[D]Holy, holy, holy! [G]Lord God Al[D]mighty!
[A]Early in the [D]morning our [A]song shall rise to [D]Thee.
Holy, holy, holy! [G]Merciful and [D]mighty!
[Bm]God in three [G]persons, [D]blessed [A]Trini[D]ty!`,
    "Reginald Heber, 1826. Tune: Nicaea, John Bacchus Dykes, 1861.",
  ],
  [
    "when-johnny",
    "When Johnny Comes Marching Home",
    "Am",
    110,
    `{section: Verse}
When [Am]Johnny comes marching home again,
Hur[C]rah! Hur[G]rah!
We'll [Am]give him a hearty welcome then,
Hur[C]rah! Hur[E]rah!
The [Am]men will cheer and the ladies shout,
The [C]lads and lasses will [E]all turn out,
And we'll [Am]all feel gay when Johnny comes [E]marching [Am]home.`,
    "Patrick Gilmore, 1863. Original opening verse selection.",
  ],
  [
    "yankee-doodle",
    "Yankee Doodle",
    "G",
    110,
    `{section: Verse}
[G]Yankee Doodle went to town,
A-riding on a [D]pony;
[G]Stuck a feather in his cap
And [D]called it maca[G]roni.

{section: Chorus}
[C]Yankee Doodle keep it up,
[G]Yankee Doodle dandy,
[C]Mind the music and the step,
And [D]with the girls be [G]handy.`,
    "Traditional eighteenth-century American song.",
  ],
  [
    "america-beautiful",
    "America the Beautiful",
    "C",
    85,
    `{section: Verse}
O [C]beautiful for [G]spacious skies,
For [G7]amber waves of [C]grain,
For [C]purple mountain [F]majesties
A[G]bove the fruited [C]plain!
America! A[G]merica!
God shed His grace on [C]thee,
And [F]crown thy good with [C]brotherhood
From [G]sea to shining [C]sea!`,
    "Katharine Lee Bates, 1893; tune: Materna, Samuel A. Ward, 1882.",
  ],
];
export const EXTRA_TRADITIONAL: Song[] = DATA.map(
  ([id, title, key, bpm, body, note]) => ({
    id,
    title,
    key,
    bpm,
    body,
    note:
      note +
      " Simple practice arrangement; lyric selection, not a modern recording transcription.",
    artist: "Traditional · Public domain",
    capo: 0,
    favorite: false,
    kind: "traditional",
  }),
);
