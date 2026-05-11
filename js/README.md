# Song Catalog

The song catalog is defined in [./songlist.js](./songlist.js).

## Adding Albums and Songs

To add a new album, append the [./songlist.js](./songlist.js) and locate the RAW_ALBUMS array.

For each album, single, or cover add an object to the array. See the Field Name table below for more information about each field.

This is an example showing an album, single, and cover
```js
  {
    id: "screaming-rhapsody",
    title: "SCREAMING RHAPSODY",
    year: 2017,
    cover: "img/albums/screamingRhapsody.jpg",
    songs: [
        { title: "夢花火", translation: "Yumehanabi" },
        { title: "恋ドラ!?", translation: "Koi Dora!?" },
        { title: "走れ!なでしこ!", translation: "Hashire! Nadeshiko!" },
        { title: "Breeder Breeder" },
        { title: "オトコとオンナ", translation: "Otoko to Onna" },
    ],
},
{
    id: "example-single",
    title: "Example Single Title",
    year: 2026,
    cover: "img/albums/exampleSingle.jpg",
    songs: [
        { title: "曲名", translation: "Song Title" },
    ],
    isSingle: true
},
{
    id: "example-cover",
    title: "Example Cover Title",
    year: 2026,
    cover: "img/albums/exampleCover.jpg",
    songs: [
        { title: "曲名", translation: "Song Title" },
    ],
    isCover: true,
},
```

## Duplicate Songs

Any songs that may appear on more than one album are de-duplicated so they will appear only once in the sort battle.

## Field Names

| Field Name          | Required? | Description                                                                                                                                        |
|---------------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| id                  | yes       | unique kebab-case slug (used as DOM value, must be unique)                                                                                         |
| title               | yes       | human-readable album name in any language (shown in UI)                                                                                            |
| year                | yes       | release year (used to sort albums chronologically)                                                                                                 |
| cover               | yes       | path to cover image, relative to the page                                                                                                          |
| songs               | yes       | array of song objects in track order. Each song is { title, translation? }:                                                                        |
| songs / title       | yes       | the title of the song in any language                                                                                                              |
| songs / translation | no        | English / romaji rendering shown as subtext                                                                                                        |
| isSingle            | no        | set to `true` if this is a standalone single. The song will get bundled into the "Singles" tile on the album grid instead of getting its own tile. |
| isCover             | no        | set to `true` if this is a cover of another artist's song — gets bundled into the "Covers" tile so they can be excluded as a group.                |

