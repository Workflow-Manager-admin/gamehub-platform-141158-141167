import React from "react";
import { useLeaderboard } from "../context/LeaderboardContext";
import { useGames } from "../context/GamesContext";
import Card from "../components/Card";

// PUBLIC_INTERFACE
const LeaderboardPage = () => {
  const { leaderboard } = useLeaderboard();
  const { games } = useGames();

  // Join leaderboard with game titles
  const lb = leaderboard.map(e => ({
    ...e,
    game_title: games.find(g => g.id === e.game_id)?.title || e.game_id
  }));

  return (
    <Card>
      <h2 style={{color:"#1e90ff", fontWeight:700}}>Leaderboard</h2>
      <p style={{color:"#505161",fontSize:"1.09em"}}>See the highest scores across all games!</p>
      <table style={{width:"100%",borderCollapse:"collapse",marginTop:"1.5em"}}>
        <thead>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Player</th>
            <th style={th}>Game</th>
            <th style={th}>Score</th>
            <th style={th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {lb.length === 0 && (
            <tr><td colSpan={5} style={{padding:"2em 0",textAlign:"center",color:"#7b7b8f"}}>No high scores submitted yet.</td></tr>
          )}
          {lb.map((entry,i) => (
            <tr key={entry.id} style={{borderBottom:"1px solid #e9ecef",background:"#fafcff"}}>
              <td style={td}>{i+1}</td>
              <td style={td}>{entry.username}</td>
              <td style={td}>{entry.game_title}</td>
              <td style={{...td, fontWeight:600, color:"#fbbf24"}}>{entry.score}</td>
              <td style={td}>{entry.date.slice(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

const th = {textAlign:"left",fontWeight:700,padding:"12px 6px",color:"#1e90ff"};
const td = {textAlign:"left",padding:"11px 6px"};

export default LeaderboardPage;
