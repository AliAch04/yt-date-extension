# YouTube Exact Date on Hover

A lightweight browser extension for any Chromium browser that shows the **exact upload date and time** of a video when you hover over it in your YouTube feed.

YouTube normally only shows vague labels like "3 days ago" or "2 years ago". This extension replaces the guesswork with the real date.

## Features

- Shows a small tooltip with the exact date and time (e.g. `March 4, 2025, 14:32`) when you hover a video
- Works on the home feed, search results, subscriptions and recommendations
- Keeps the tooltip visible while the inline video preview is playing
- Caches results, so each video is only fetched once
- No API key, no account, no tracking, no external server

## How it works

1. When you hover a video link, the extension reads its URL.
2. It fetches that video's page in the background.
3. It extracts the `uploadDate` from the page metadata.
4. It formats the date in your local format and displays it in a tooltip over the thumbnail.

## Installation

The extension isn't on the Chrome Web Store, so you load it manually:

1. Download or clone this repository:
   ```bash
   git clone https://github.com/AliAch04/yt-date-extension.git
   ```
2. Open Brave and go to `brave://extensions` (or `chrome://extensions` in Chrome).
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the `yt-date-extension` folder.
5. Open or refresh YouTube.

## Usage

1. Go to [youtube.com](https://www.youtube.com).
2. Hover your mouse over any video thumbnail.
3. A dark box appears at the top-left corner of the thumbnail, first showing `Loading...`, then the exact date.

## Project structure

```
yt-date-extension/
├── manifest.json   # Extension configuration (Manifest V3)
├── content.js      # Hover detection, date fetching and tooltip
└── README.md
```

## Troubleshooting

| Problem | Fix |
|---|---|
| Nothing appears on hover | Reload the extension in `brave://extensions`, then refresh the YouTube tab (F5) |
| Shows `Date not found` | YouTube may have changed its page format; check the regex in `getDate()` in `content.js` |
| Shows `Error loading date` | Check your connection or whether a blocker is stopping the request |
| Works on some layouts but not others | YouTube changes its HTML often; inspect the element and adjust the selector in `content.js` |

Console messages like `ERR_BLOCKED_BY_CLIENT` or `LegacyDataMixin` come from YouTube and Brave Shields, not from this extension, and can be ignored.

## Customization

- **Date format:** edit the options passed to `toLocaleString()` in `getDate()`.
- **Tooltip style:** edit the `Object.assign(tip.style, {...})` block in `makeTip()`.
- **Tooltip position:** edit the `left` and `top` values in `showTip()`.

## Limitations

- Relies on YouTube's page structure, which may change over time.
- Hovering many videos quickly triggers many background requests (mitigated by caching).
- Shorts and some newer layouts may need extra selectors.

## Privacy

The extension only runs on `youtube.com`. It sends no data anywhere except the normal page requests to YouTube itself, and it stores nothing outside the current page session.

## License

MIT. Feel free to use, modify and share.
