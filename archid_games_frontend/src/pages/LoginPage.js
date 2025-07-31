import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";

// PUBLIC_INTERFACE
const LoginPage = () => {
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleLogin = async e => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    }
    setLoading(false);
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate("/");
  };

  return (
    <Card style={{maxWidth:340}}>
      <h2 style={{color:"#1e90ff", fontWeight:700, textAlign:"center"}}>Log In</h2>
      <form onSubmit={handleLogin}>
        <div style={{margin:"1.2em 0"}}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{width:"100%",marginBottom:12,border:"1.4px solid #e9ecef",borderRadius:8}}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{width:"100%",border:"1.4px solid #e9ecef",borderRadius:8}}
          />
        </div>
        {error && <div style={{color:"#d32f2f", marginBottom:6}}>{error}</div>}
        <button className="btn-accent" style={{width:"100%"}} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <button
        className="btn-accent"
        style={{width:"100%",marginTop:"0.8em",background:"#fbbf24",color:"#23272f"}}
        onClick={handleGuest}
        aria-label="Continue as guest"
      >
        Continue as Guest
      </button>
      <div style={{marginTop:"1em",fontSize:"1em",textAlign:"center"}}>
        Don't have an account? <Link to="/signup" style={{color:"#1e90ff"}}>Sign Up</Link>
      </div>
    </Card>
  );
};

export default LoginPage;
