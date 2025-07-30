import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

export function SignupPage() {
  const { signup, user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user) return <Navigate to="/" />;

  // PUBLIC_INTERFACE
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signup(form.name, form.email, form.password);
      navigate("/");
    } catch {
      setError("Sign up failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <div style={{maxWidth:340, margin:"4em auto", background:"#fff", borderRadius:12, padding:"2.2em", boxShadow:"0 5px 32px 0 rgba(30,144,255,0.09)"}}>
      <h2 style={{color:"#1e90ff", fontWeight:700, textAlign:"center"}}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div style={{margin:"1.2em 0"}}>
          <input
            type="text"
            placeholder="Name"
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            style={{width:"100%", padding:"0.9em", marginBottom:12, border:"1.4px solid #e9ecef", borderRadius:8, fontSize:"1.1em"}}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            style={{width:"100%", padding:"0.9em", marginBottom:12, border:"1.4px solid #e9ecef", borderRadius:8, fontSize:"1.1em"}}
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength="6"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            style={{width:"100%", padding:"0.9em", border:"1.4px solid #e9ecef", borderRadius:8, fontSize:"1.1em"}}
          />
        </div>
        {error && <div style={{color:"#d32f2f", marginBottom: 8}}>{error}</div>}
        <button type="submit" disabled={loading}
          style={{width:"100%", background:"#1e90ff", color:"#fff", border:"none", borderRadius:7, fontWeight:600, padding:"1em", fontSize:"1.14em", cursor:"pointer"}}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div style={{marginTop:"1em", fontSize:"1em", textAlign:"center"}}>
        Already have an account? <a href="/login" style={{color:"#1e90ff"}}>Log In</a>
      </div>
    </div>
  );
}
