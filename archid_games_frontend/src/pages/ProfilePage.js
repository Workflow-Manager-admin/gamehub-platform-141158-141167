import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useLeaderboard } from "../context/LeaderboardContext";
import Card from "../components/Card";

// PUBLIC_INTERFACE
const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [message, setMessage] = useState("");
  const { leaderboard } = useLeaderboard();

  // List user’s scores (search leaderboard)
  const myScores = leaderboard.filter(l => l.username === user.name);

  const handleSave = e => {
    e.preventDefault();
    updateUser(form);
    setMessage("Profile updated!");
    setEdit(false);
  };

  return (
    <Card>
      <h2 style={{color:"#1e90ff"}}>Profile</h2>
      {edit ? (
        <form className="form-card" style={{display:"flex",flexDirection:"column",gap:"1em"}} onSubmit={handleSave}>
          <div>
            <label>Name:</label>
            <input type="text" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} required />
          </div>
          <div>
            <button className="btn-accent">Save</button>
            <button type="button" onClick={()=>setEdit(false)} style={{marginLeft:12,background:"#e9ecef"}}>Cancel</button>
          </div>
        </form>
      ) : (
        <div style={{marginBottom:"1.5em"}}>
          <div><b>Name:</b> {user.name}</div>
          <div><b>Email:</b> {user.email}</div>
          <button className="btn-accent" style={{background:"#fbbf24",color:"#23272f",marginTop:"0.9em"}} onClick={()=>setEdit(true)}>
            Edit Profile
          </button>
        </div>
      )}
      {message && <div style={{color:"#409060",fontWeight:600,marginBottom:"0.7em"}}>{message}</div>}
      <hr style={{margin:"1em 0",border:"none",borderTop:"1.3px solid #e9ecef"}}/>
      <h3>My Scores</h3>
      {myScores.length === 0 && <div style={{color:"#7b8797"}}>No scores yet.</div>}
      <ul>
        {myScores.map(s => (
          <li key={s.id}>
            <b>{s.game_title || s.game_id}</b>:
            <span style={{color:"#fbbf24"}}> {s.score}</span> pts ({s.date.slice(0,10)})
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ProfilePage;
