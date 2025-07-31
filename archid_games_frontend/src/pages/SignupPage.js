import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Card from "../components/Card";

// PUBLIC_INTERFACE
const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSignup = async e => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Sign up failed. Try again.");
    }
    setLoading(false);
  };

  return (
    <Card style={{maxWidth:340}}>
      <h2 style={{color:"#1e90ff", fontWeight:700, textAlign:"center"}}>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div style={{margin:"1.2em 0"}}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{width:"100%",marginBottom:12,border:"1.4px solid #e9ecef",borderRadius:8}}
          />
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
            minLength={6}
            onChange={handleChange}
            required
            style={{width:"100%",border:"1.4px solid #e9ecef",borderRadius:8}}
          />
        </div>
        {error && <div style={{color:"#d32f2f", marginBottom:6}}>{error}</div>}
        <button className="btn-accent" style={{width:"100%"}} disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div style={{marginTop:"1em",fontSize:"1em",textAlign:"center"}}>
        Already have an account? <Link to="/login" style={{color:"#1e90ff"}}>Log In</Link>
      </div>
    </Card>
  );
};

export default SignupPage;
