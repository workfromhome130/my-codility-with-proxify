# Problem 3 - `react_music_player`

Implement the logic of a music player.

## Introduction

You are given an empty context function and two components called `ControlBar` and `Songs`. Your task is to implement the logic of the components that would make up a music player.

The `ControlBar` component renders a bar at the bottom of the page consisting of:

- the title and the author of the currently played song;
- the next song button;
- the previous song button;
- the loop mode button (Not replaying / Replaying all / Replaying one).

The `Songs` component is responsible for displaying song titles and authors, and for choosing and highlighting the currently played song.

Assume that the synchronization of data between the components will only be handled through a Context. Below you can find a mental model of how the components will relate to each other.

```jsx
<PlayerProvider>
  <main data-testid="mainPart">
    <Songs />
    <ControlBar />
  </main>
</PlayerProvider>
```

## Requirements

1. In the `Songs` component, the current song should be chosen by clicking on the `Song` component. The current song should have the `active` property set to `true` in `<SongTitle>`. If handled properly, the active song should look like this:

```
The Wizard
Black Sabbath
```

2. In the `ControlBar` component, the currently played song should be displayed in the following format: `${author} - ${songTitle}`. If no song is selected, return an empty string "".

```
		Yes - Owner of a lonely heart
Previous		Next 		Not replaying
```

3. In the `ControlBar` component, the `currentMode` button should display the current label for each loop mode (`Not replaying` / `Replaying all` / `Replaying one`). Initially, the current mode should be set to `Not replaying`.

4. Clicking the `currentMode` button should change the mode in the following order: `Not replaying` -> `Replaying all` -> `Replaying one` -> `Not replaying` -> ...

5. Each loop mode specifies the logic behind how the songs should be played:

   - `Not replaying` mode: if the `previous` button is pressed when there is no previous song, the current song should stay the same; if the `next` button is pressed when there is no next song, no song should be played.

   - `Replaying all` mode: if the `previous` button is pressed when there is no previous song, the last song should be played; if the `next` button is pressed when there is no next song, the first song should be played.

   - `Replaying one` mode: if the `previous` or `next` button is pressed, the current song should stay the same.

6. Clicking the `previous` button should change the current song to the previous song. If there is no previous song, it should change the song appropriately to the enabled mode.

7. Clicking the `next` button should change the current song to the next song. If there is no next song, it should change the song appropriately to the enabled mode.

8. In `usePlayerContext` create a mechanism for throwing errors when the consumer (`usePlayerContext`) is used within components not wrapped with the provider. Such errors should state `usePlayerContext must be used within a PlayerProvider` instead of returning the context data.

## Assumptions

- Components, styles, etc. will be prepared upfront; your only task is to focus on the logic to handle the player. Try not to alter the existing components, or some tests might fail.
- Assume that all necessary data exchanged between components will be transported via Context. Don't try to pass any data to `ControlBar` or `Songs` via props or by pasting code from one component to another to avoid having to use Context.

## Hints

- Use the Preview tab to visually check the correctness of your code.
- Use the browser's developer tools in the Preview tab to debug your code (`console.log`).

## Available packages/libraries

- Please use React version 18 and styled-components version 5.3.5

## SongList structure

The `songList` array imported from the `constants.js` file has the following structure:

```js
[
  {
    title: "My heart will go on",
    author: "Celine Dion",
    id: "a5ff0896",
  },
  {
    title: "Court of the Crimson King",
    author: "King Crimson",
    id: "a5ff0cb0",
  },
];
```

## Examples

```
My heart will go on
Celine Dion

Court of the Crimson King
King Crimson

Owner of a lonely heart
Yes

The Wizard
Black Sabbath
```

### Example scenario

- Click on the first song
- The first song title is green
- Press the `next` button
- The second song title is green
- Keep pressing `next` until you reach the last song
- Click `next` when the last song is active
- No song is active
- Click on the first song
- Press the current mode button
- The current mode button label says `Replaying one`
- Press `next`
- The first song is still active
- Press `previous`
- The first song is still active
- Click on the first song
- Press the current mode button
- The current mode button label says `Replaying one`
- Press `next`
- The first song is still active
- Press the current mode button
- The current mode button label says `Not replaying`
- Press `next`
- The second song is now active

---

## Boilerplate code

```jsx
import React from "react";
import {
  BarSongTitle,
  BottomBar,
  Button,
  PlayList,
  Song,
  SongTitle,
} from "./styles.js";
import { songList } from "./constants.js";

const buttonLabels = ["Not replaying", "Replaying all", "Replaying one"];

const PlayerProvider = ({ children }) => {
  return children;
};

const usePlayerContext = () => {};

const ControlBar = () => {
  const title = "test - song";
  return (
    <BottomBar>
      <BarSongTitle data-testid="barTitle">{title}</BarSongTitle>
      <div>
        <Button data-testid="previousButton">Previous</Button>
        <Button data-testid="nextButton">Next</Button>
        <Button data-testid="currentModeButton">{"replay mode"}</Button>
      </div>
    </BottomBar>
  );
};

const Songs = () => {
  return (
    <PlayList>
      {songList.map(({ title, author, id }) => (
        <Song key={id}>
          <SongTitle data-testid={id} active={false}>
            {title}
          </SongTitle>
          <p>{author}</p>
        </Song>
      ))}
    </PlayList>
  );
};

export { PlayerProvider, Songs, ControlBar };
```
