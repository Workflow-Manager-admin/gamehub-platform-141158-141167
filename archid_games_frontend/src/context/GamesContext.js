import React, { createContext, useContext, useEffect, useState } from "react";
import { getGamesFromStorage, setGamesToStorage } from "../utils/storage";
import sampleGames from "../mock/sampleGames"; // mock game data

const GamesContext = createContext(null);

// PUBLIC_INTERFACE
export function GamesProvider({ children }) {
  const [games, setGames] = useState(() => getGamesFromStorage() || sampleGames);

  useEffect(() => {
    if (!getGamesFromStorage() || getGamesFromStorage().length === 0) {
      setGamesToStorage(sampleGames);
      setGames(sampleGames);
    }
  }, []);

  const refreshGames = () => {
    setGames(getGamesFromStorage());
  };

  return (
    <GamesContext.Provider value={{ games, refreshGames }}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  return useContext(GamesContext);
}
