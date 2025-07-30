import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { apiGet, apiPut } from "../api";

// PUBLIC_INTERFACE
export function ProfilePage() {
  const { user, token } = useAuth();

  const [profile, setProfile] = useState(null);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!user) return;
    apiGet("/profile", token)
      .then(data => {
        setProfile(data.user);
        setForm({ name: data.user.name, email: data.user.email });
        setScores(data.scores || []);
      })
      .catch(() => setProfile(user))
      .finally(() => setLoading(false));
  }, [user, token]);

  const handleEdit = () => setEdit(true);
  const handleChange = ev => {
    setForm(f => ({ ...f, [ev.target.name]: ev.target.value }));
  };
  const handleSave = async ev => {
    ev.preventDefault();
    try {
      await apiPut("/profile", form, token);
      setMessage("Profile updated!");
      setProfile(profile => ({ ...profile, name: form.name, email: form.email }));
      setEdit(false);
    } catch {
      setMessage("Failed to update profile.");
    }
  };

  if (loading) return <div style={{padding:"2em"}}>Loading profile...</div>;

  return (
    <div style={{maxWidth:600, margin:"2.5em auto", background:"#fff", borderRadius:12, padding:"2.2em 2em", boxShadow:"0 3px 25px 0 rgba(30,144,255,0.13)"}}>
      <h2 style={{color:"#1e90ff"}}>Profile</h2>
      {edit ? (
        <form onSubmit={handleSave} style={{marginBottom:"1.5em", display: "flex", flexDirection: "column", gap: "1em"}}>
          <div>
            <label>Name: </label>
            <input name="name" value={form.name} onChange={handleChange} style={{fontSize:"1em", padding:"6px 12px"}} required />
          </div>
          <div>
            <label>Email: </label>
            <input name="email" value={form.email} onChange={handleChange} style={{fontSize:"1em", padding:"6px 12px"}} type="email" required />
          </div>
          <div>
            <button style={{background:"#1e90ff", color:"#fff", border:"none", borderRadius:"7px", fontWeight:600, padding:"0.7em 1.5em", fontSize:"1em", cursor:"pointer"}}>
              Save
            </button>
            <button type="button" onClick={() => setEdit(false)} style={{marginLeft:"1em", background:"#e9ecef"}}>Cancel</button>
          </div>
        </form>
      ) : (
        <div style={{marginBottom:"1.5em"}}>
          <div><b>Name:</b> {profile?.name}</div>
          <div><b>Email:</b> {profile?.email}</div>
          <button onClick={handleEdit} style={{background:"#fbbf24", color:"#23272f", border:"none", padding:"7px 16px", borderRadius:8, fontWeight:600, cursor:"pointer", marginTop:"0.9em"}}>
            Edit Profile
          </button>
        </div>
      )}
      {message && <div style={{color:"#409060", fontWeight:600, marginBottom:"0.7em"}}>{message}</div>}
      <hr style={{margin:"1em 0", border:"none", borderTop:"1.3px solid #e9ecef"}}/>
      <h3>My Scores</h3>
      {scores.length === 0
        ? <div style={{color:"#7b8797"}}>No scores yet.</div>
        : (
          <ul>
            {scores.map((s, idx) =>
              <li key={idx} style={{marginBottom:6}}>
                <b>{s.game_title}</b>: <span style={{color:"#fbbf24"}}>{s.score}</span> pts ({s.date?.substring(0,10)})
              </li>
            )}
          </ul>
        )}
    </div>
  );
}
