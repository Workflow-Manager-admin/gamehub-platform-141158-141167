import React, { useEffect, useState } from "react";
import { apiGet } from "../api";

const rowStyle = {
  borderBottom: "1px solid #e9ecef",
  background: "#fafcff",
};
const headerCell = {
  textAlign: "left", fontWeight: 700, padding: "12px 6px", color: "#1e90ff"
};
const cell = {
  textAlign: "left", padding: "11px 6px", fontSize: "1.06em"
};

export function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/leaderboard")
      .then((data) => setLeaders(data.leaderboard))
      .catch(() => setLeaders([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{maxWidth:700, margin:"2.7em auto", background:"#fff", borderRadius:12, padding:"2em 1.5em", boxShadow:"0 2px 16px 0 rgba(30,144,255,0.06)"}}>
      <h2 style={{color:"#1e90ff", fontWeight:700}}>Leaderboard</h2>
      <p style={{color:"#505161", fontSize:"1.09em"}}>See the highest scores across all games!</p>
      {loading ? (
        <div>Loading leaderboard...</div>
      ) : (
        <table style={{width:"100%", borderCollapse:"collapse", marginTop:"1.5em"}}>
          <thead>
            <tr>
              <th style={headerCell}>#</th>
              <th style={headerCell}>Player</th>
              <th style={headerCell}>Game</th>
              <th style={headerCell}>Score</th>
              <th style={headerCell}>Date</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((entry, idx) => (
              <tr key={entry.id} style={rowStyle}>
                <td style={cell}>{idx+1}</td>
                <td style={cell}>{entry.username}</td>
                <td style={cell}>{entry.game_title}</td>
                <td style={{...cell, fontWeight:600, color:"#fbbf24"}}>{entry.score}</td>
                <td style={cell}>{entry.date ? entry.date.substring(0,10) : ""}</td>
              </tr>
            ))}
            {leaders.length === 0 && (
              <tr>
                <td colSpan={5} style={{padding:"2em 0", textAlign:"center", color:"#7b7b8f"}}>
                  No high scores submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
