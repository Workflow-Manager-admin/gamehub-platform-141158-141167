import React, { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function GameDetailsPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState("");
  const [playResult, setPlayResult] = useState(null);
  const { user, token } = useAuth();

  useEffect(() => {
    apiGet(`/games/${id}`)
      .then((data) => setGame(data.game))
      .catch(() => setGame(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePlay = async (ev) => {
    ev.preventDefault();
    setPlayResult(null);
    if (!user) {
      setPlayResult({ error: "You must be logged in to submit a score." });
      return;
    }
    try {
      const result = await apiPost(`/games/${game.id}/play`, { score: parseFloat(score) }, token);
      setPlayResult({ success: result.message || "Score submitted!" });
      setScore("");
    } catch (e) {
      setPlayResult({ error: "Failed to submit score." });
    }
  };

  if (loading) return <div style={{padding:"2em"}}>Loading game...</div>;
  if (!game) return <div style={{padding:"2em"}}>Game not found.</div>;

  return (
    <div style={{maxWidth:720, margin:"2.5em auto", background:"#fff", borderRadius:12, padding:"2.4em 2em", boxShadow:"0 2px 18px 0 rgba(30,144,255,0.05)"}}>
      <div style={{display:"flex", flexDirection:"row", gap:30, alignItems:"flex-start"}}>
        <img src={game.cover_url || "/default_game.jpg"} alt={game.title} style={{height:160, width:140, objectFit:"cover", borderRadius:10}}/>
        <div>
          <h2 style={{color:"#1e90ff"}}>{game.title}</h2>
          <p style={{color:"#505161", fontSize:"1.07em"}}>{game.description}</p>
          <div style={{marginTop:14}}>
            <b>Genre:</b> {game.genre} <span style={{marginLeft:30}}><b>Release:</b> {game.release_date}</span>
          </div>
        </div>
      </div>
      <hr style={{margin:"1.7em 0 1.1em 0", border:"none", borderTop:"1.5px solid #e9ecef"}}/>
      <h3>Play and Submit Score</h3>
      <form onSubmit={handlePlay} style={{display:"flex", gap:"0.7em", alignItems:"center"}}>
        <input
          type="number"
          required
          step="1"
          min="0"
          max="999999"
          value={score}
          onChange={e => setScore(e.target.value)}
          placeholder="Your score"
          style={{padding:"0.7em", border:"1.2px solid #e9ecef", borderRadius:7, width:120, fontSize:"1.1em"}}
        />
        <button style={{background:"#1e90ff", color:"#fff", border:"none", borderRadius:7, fontWeight:600, padding:"0.7em 1.4em", fontSize:"1em", cursor:"pointer"}}>
          Submit
        </button>
        {playResult?.success && <span style={{color:"#4caf50", marginLeft:6}}>{playResult.success}</span>}
        {playResult?.error && <span style={{color:"#d32f2f", marginLeft:6}}>{playResult.error}</span>}
      </form>
    </div>
  );
}
