import React, { createContext, useContext, useState, useCallback } from "react";
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

const PlayerContext = createContext(undefined);

const PlayerProvider = ({ children }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  /**
   * 0 - Not replaying
   * 1 - Replaying all
   * 2 - Replaying one
   */
  const [mode, setMode] = useState(0);

  const selectSong = useCallback((index) => {
    setCurrentSongIndex(index);
  }, []);

  const changeMode = useCallback(() => {
    setMode((prev) => (prev + 1) % buttonLabels.length);
  }, []);

  const nextSong = useCallback(() => {
    if (currentSongIndex === null) return;

    if (mode === 2) {
      // Replaying one
      return;
    }

    if (mode === 0) {
      // Not replaying
      if (currentSongIndex + 1 < songList.length) {
        setCurrentSongIndex(currentSongIndex + 1);
      } else {
        setCurrentSongIndex(null);
      }
      return;
    }

    if (mode === 1) {
      // Replaying all
      if (currentSongIndex + 1 < songList.length) {
        setCurrentSongIndex(currentSongIndex + 1);
      } else {
        setCurrentSongIndex(0);
      }
    }
  }, [currentSongIndex, mode]);

  const previousSong = useCallback(() => {
    if (currentSongIndex === null) return;

    if (mode === 2) {
      // Replaying one
      return;
    }

    if (mode === 0) {
      // Not replaying
      if (currentSongIndex - 1 >= 0) {
        setCurrentSongIndex(currentSongIndex - 1);
      } else {
        // stay same
      }
      return;
    }

    if (mode === 1) {
      // Replaying all
      if (currentSongIndex - 1 >= 0) {
        setCurrentSongIndex(currentSongIndex - 1);
      } else {
        setCurrentSongIndex(songList.length - 1);
      }
    }
  }, [currentSongIndex, mode]);

  const value = {
    currentSongIndex,
    currentSong: currentSongIndex !== null ? songList[currentSongIndex] : null,
    mode,
    selectSong,
    changeMode,
    nextSong,
    previousSong,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
};

const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext must be used within a PlayerProvider");
  }
  return context;
};

const ControlBar = () => {
  const { currentSong, nextSong, previousSong, mode, changeMode } =
    usePlayerContext();

  const title = currentSong
    ? `${currentSong.author} - ${currentSong.title}`
    : "";

  return (
    <BottomBar>
      <BarSongTitle data-testid="barTitle">{title}</BarSongTitle>
      <div>
        <Button data-testid="previousButton" onClick={previousSong}>
          Previous
        </Button>
        <Button data-testid="nextButton" onClick={nextSong}>
          Next
        </Button>
        <Button data-testid="currentModeButton" onClick={changeMode}>
          {buttonLabels[mode]}
        </Button>
      </div>
    </BottomBar>
  );
};

const Songs = () => {
  const { currentSongIndex, selectSong } = usePlayerContext();

  return (
    <PlayList>
      {songList.map(({ title, author, id }, index) => (
        <Song key={id} onClick={() => selectSong(index)}>
          <SongTitle data-testid={id} active={index === currentSongIndex}>
            {title}
          </SongTitle>
          <p>{author}</p>
        </Song>
      ))}
    </PlayList>
  );
};

export { PlayerProvider, Songs, ControlBar };
