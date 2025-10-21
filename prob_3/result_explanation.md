# Explanation of Implementation

## 1. Context & Provider

- Holds `currentSongIndex`, `mode`, and all control functions.
- Uses `createContext` and `useContext` with proper error handling per requirement **#8**.

## 2. `usePlayerContext`

- Throws an error if used outside `<PlayerProvider>` — `"usePlayerContext must be used within a PlayerProvider"`.

## 3. Loop Modes

| Mode Index | Label         | Behavior             |
| ---------- | ------------- | -------------------- |
| 0          | Not replaying | Stops at ends        |
| 1          | Replaying all | Loops all songs      |
| 2          | Replaying one | Repeats current song |

## 4. Navigation

- `nextSong` and `previousSong` adjust based on `mode`.
- Handles edge cases (e.g., `null` current song or boundaries).

## 5. ControlBar

- Shows formatted `"Author - Title"` or empty string.
- Buttons trigger proper context actions.

## 6. Songs

- Maps over `songList` and highlights (`active={true}`) the selected one.
