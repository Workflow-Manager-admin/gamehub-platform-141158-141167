import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGames } from "../context/GamesContext";
import { useAuth } from "../context/AuthContext";
import { useLeaderboard } from "../context/LeaderboardContext";
import Card from "../components/Card";

// PUBLIC_INTERFACE
const GameDetailsPage = () => {
  const { id } = useParams();
  const { games } = useGames();
  const { user } = useAuth();
  const { submitScore } = useLeaderboard();
  const [score, setScore] = useState("");
  const [result, setResult] = useState(null);

  const game = games.find(g => g.id === id);

  if (!game) return <Card>Game not found.</Card>;

  const handlePlay = e => {
    e.preventDefault();
    setResult(null);
    if (!user) {
      setResult({ error: "You must be logged in to submit a score." });
      return;
    }
    if (score && !isNaN(Number(score))) {
      submitScore(user.name, game.id, Number(score));
      setResult({ success: "Score submitted!" });
      setScore("");
    } else {
      setResult({ error: "Please enter a valid score." });
    }
  };

  return (
    <Card>
      <div style={{display:"flex",flexDirection:"row",gap:30,alignItems:"flex-start",flexWrap:"wrap"}}>
        <img src={game.cover_url || "/default_game.jpg"} alt={game.title} style={{height:160,width:140,objectFit:"cover",borderRadius:10}} />
        <div>
          <h2 style={{color:"#1e90ff"}}>{game.title}</h2>
          <p style={{color:"#505161",fontSize:"1.07em"}}>{game.description}</p>
          <div style={{marginTop:14}}>
            <b>Genre:</b> {game.genre}
            <span style={{marginLeft:30}}><b>Release:</b> {game.release_date}</span>
          </div>
        </div>
      </div>
      <hr style={{margin:"1.7em 0 1.1em 0",border:"none",borderTop:"1.5px solid #e9ecef"}} />
      <h3>Play and Submit Score</h3>
      <form onSubmit={handlePlay} style={{display:"flex", gap:"0.7em",alignItems:"center"}}>
        <input
          type="number"
          step="1"
          min="0"
          max="999999"
          value={score}
          onChange={e=>setScore(e.target.value)}
          placeholder="Your score"
          required
          style={{padding:"0.7em",border:"1.2px solid #e9ecef",borderRadius:7,width:120,fontSize:"1.1em"}}
        />
        <button className="btn-accent">Submit</button>
        {result && result.success && <span style={{color:"#4caf50",marginLeft:6}}>{result.success}</span>}
        {result && result.error && <span style={{color:"#d32f2f",marginLeft:6}}>{result.error}</span>}
      </form>
    </Card>
  );
};

export default GameDetailsPage;
