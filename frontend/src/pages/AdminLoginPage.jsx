import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const { loginAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page
    const success = await loginAdmin(email, password); // Call login and await response
    if (success) {
      console.log("Login successful");
      navigate("/admin"); // Redirect to admin dashboard
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
        <p style={styles.title}>Admin Login</p>
        {/* <p style={styles.subtitle}>Access administration tools of your dorm</p> */}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              SSN
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              placeholder="Enter your SSN"
            />
          </div>

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {/* Redirect to Student Login */}
        <div style={styles.redirect}>
          <p>
            Are you a student?{" "}
            <a href="/login" style={styles.link}>
              Go to Student Login
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
    background: "linear-gradient(135deg, #f9f9f9, #e3e3e3)",
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
    color: "#0a66c2",
    margin: "0",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "40px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    fontSize: "23px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
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
    color: "#333",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    marginTop: "15px",
    border: "none",
    background: "#0a66c2",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "10px",
  },
  redirect: {
    marginTop: "20px",
    fontSize: "14px",
    color: "#333",
  },
  link: {
    color: "#0a66c2",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default AdminLoginPage;
