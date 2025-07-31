import React, { useState } from "react";
import { useGames } from "../context/GamesContext";
import { Link } from "react-router-dom";
import Card from "../components/Card";

// PUBLIC_INTERFACE
const HomePage = () => {
  const { games } = useGames();
  const [query, setQuery] = useState("");
  const filtered = games?.filter(game =>
    game.title.toLowerCase().includes(query.toLowerCase()) ||
    game.genre.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page-container">
      <h1 className="card-title">Welcome to Archid Games 🎮</h1>
      <div style={{fontSize:'1.17em', color:'#414151', marginBottom:24}}>
        Browse and play the best indie games. Sign up to save scores and compete on the leaderboard!
      </div>
      <input
        placeholder="Search by title or genre..."
        style={{
          padding: ".8em", borderRadius: 9, border: "1.2px solid #e9ecef", minWidth:240,
          fontSize: "1.07em", marginBottom: 17
        }}
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div className="gallery">
        {filtered.length > 0 ? filtered.map(game => (
          <Link className="gallery-card" key={game.id} to={`/games/${game.id}`} aria-label={"See details/play "+game.title}>
            <img src={game.cover_url || "/default_game.jpg"} alt={game.title} />
            <div className="gallery-card-title">{game.title}</div>
            <div className="gallery-card-desc">{game.short_description || "Fun game!"}</div>
          </Link>
        )) : (
          <div style={{padding:"2em 0", color:"#bdbdbd"}}>No games found.</div>
        )}
      </div>
    </div>
  );
};
export default HomePage;
