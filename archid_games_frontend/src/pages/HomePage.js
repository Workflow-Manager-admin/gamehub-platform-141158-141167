import React, { useEffect, useState } from "react";
import { apiGet } from "../api";
import { Link } from "react-router-dom";

const galleryStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "2.5em",
  marginTop: "2.8em",
};

const cardStyle = {
  background: "#fff",
  border: "1.5px solid #e9ecef",
  borderRadius: "1.2em",
  width: 230,
  minHeight: 256,
  boxShadow: "0 4px 18px 0 rgba(30,144,255,0.04)",
  overflow: "hidden",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  textDecoration: "none",
  color: "#23272f",
  transition: "box-shadow 0.18s, transform 0.15s",
};
const cardImgStyle = {
  height: 130,
  width: "100%",
  objectFit: "cover",
  background: "#eee",
  marginBottom: 9,
};
const cardTitle = {
  fontWeight: "bold",
  fontSize: "1.14em",
  marginTop: 10,
};
const cardDesc = {
  color: "#7b7e90",
  fontSize: "0.98em",
  margin: "10px 16px 1em 16px",
  flex: 1,
};

export function HomePage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/games")
      .then((data) => setGames(data.games))
      .catch(() => setGames([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{maxWidth: 1100, margin: "0 auto", padding: "3.5em 1em"}}>
      <h1 style={{fontWeight:700, fontSize:"2em", color:"#1e90ff", marginBottom: 8}}>Welcome to Archid Games 🎮</h1>
      <div style={{fontSize: "1.17em", color:"#414151", marginBottom:"2.5em"}}>
        Browse and play the best indie games. Sign up to save scores and compete on the leaderboard!
      </div>
      {loading ? (<div>Loading games...</div>) : (
        <div style={galleryStyle}>
          {games.map(game =>
            <Link
              key={game.id}
              to={`/games/${game.id}`}
              style={cardStyle}
            >
              <img src={game.cover_url || "/default_game.jpg"} alt={game.title} style={cardImgStyle}/>
              <div style={cardTitle}>{game.title}</div>
              <div style={cardDesc}>{game.short_description || "Fun game!"}</div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
