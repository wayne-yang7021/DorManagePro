import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      console.log("Login successful");
      navigate("/");
    } else {
      console.log("Error logging in");
    }
  };

  return (
    <div style={styles.container}>
      {/* Branding Section */}
      <div style={styles.branding}>
        <h1 style={styles.brand}>DorManagePro</h1>
      </div>

      {/* Login Card */}
      <div style={styles.card}>
        <p style={styles.title}>Student Login</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Student ID
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
              placeholder="Enter your student ID"
            />
          </div>

          {/* Password Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Ssn
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              placeholder="Enter your Ssn"
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {/* Admin Section */}
        <div style={styles.adminLink}>
          <p>
            Admin?{" "}
            <a href="/adminLogin" style={styles.adminLoginLink}>
              Click here for admin login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    fontFamily: '"Poppins", sans-serif',
    position: "relative",
  },
  branding: {
    position: "absolute",
    top: "20px",
    left: "40px",
  },
  brand: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#00d4ff",
    margin: "0",
    textShadow: "0 0 10px #00d4ff, 0 0 20px #00d4ff",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "40px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: "23px",
    fontWeight: "1000",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "0 0 10px #fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ddd",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box',
    background: 'rgba(255, 255, 255, 0.3)',
    color: '#fff',
    outline: 'none',
    boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
  },
  button: {
    padding: "12px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg, #00d4ff, #0099ff)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px",
    textShadow: "0 0 10px #fff",
    transition: "transform 0.3s",
  },
  adminLink: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#ddd",
  },
  adminLoginLink: {
    color: "#00d4ff",
    textDecoration: "none",
    fontWeight: "600",
    textShadow: "0 0 10px #00d4ff",
  },
};

export default LoginPage;
