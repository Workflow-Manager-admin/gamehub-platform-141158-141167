import React, { createContext, useContext, useEffect, useState } from "react";
import { getLeaderboardFromStorage, setLeaderboardToStorage } from "../utils/storage";
import { sampleLeaderboard } from "../mock/sampleLeaderboard";

const LeaderboardContext = createContext(null);

// PUBLIC_INTERFACE
export function LeaderboardProvider({ children }) {
  const [leaderboard, setLeaderboard] = useState(() =>
    getLeaderboardFromStorage() || sampleLeaderboard
  );

  useEffect(() => {
    if (!getLeaderboardFromStorage() || getLeaderboardFromStorage().length === 0) {
      setLeaderboardToStorage(sampleLeaderboard);
      setLeaderboard(sampleLeaderboard);
    }
  }, []);

  const submitScore = (username, game_id, score) => {
    let leaderboardData = getLeaderboardFromStorage() || [];
    const entry = {
      id: Date.now(),
      username,
      game_id,
      score,
      date: new Date().toISOString(),
    };
    leaderboardData = [entry, ...leaderboardData].sort((a, b) => b.score - a.score);
    setLeaderboardToStorage(leaderboardData);
    setLeaderboard(leaderboardData);
  };

  return (
    <LeaderboardContext.Provider value={{ leaderboard, submitScore }}>
      {children}
    </LeaderboardContext.Provider>
  );
}

export function useLeaderboard() {
  return useContext(LeaderboardContext);
}
