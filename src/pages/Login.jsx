import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaBolt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaSpinner,
} from "react-icons/fa";

import { Auth } from "../auth";

/* ================= LOGIN ================= */

function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
    useState(true);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [remember, setRemember] =
    useState(false);

  // ================= SUBMIT =================

  const handleSubmit = async () => {

    if (!email || !password) {

      alert("⚠ Please fill all fields");

      return;
    }

    setLoading(true);

    setTimeout(() => {

      if (isLogin) {

        const success =
          Auth.login(
            email,
            password,
            () => {

              // save session
              if (remember) {

                localStorage.setItem(
                  "rememberUser",
                  "true"
                );
              }

              // redirect
              navigate("/dashboard");
            }
          );

        if (!success) {

          alert(
            "❌ Invalid email or password"
          );
        }

      } else {

        Auth.signup(
          email,
          password,
          () => {

            alert(
              "✅ Signup Successful"
            );

            navigate("/dashboard");
          }
        );
      }

      setLoading(false);

    }, 1200);
  };

  return (

    <div style={styles.container}>

      {/* BACKGROUND GLOW */}

      <div style={styles.glow1}></div>

      <div style={styles.glow2}></div>

      {/* LOGIN CARD */}

      <div style={styles.card}>

        {/* LOGO */}

        <div style={styles.logoBox}>

          <FaBolt />

        </div>

        {/* TITLE */}

        <h1 style={styles.title}>

          {isLogin
            ? "NEX VOLT LOGIN"
            : "NEX VOLT SIGN UP"}

        </h1>

        <p style={styles.subtitle}>
          Smart IoT Monitoring System
        </p>

        {/* EMAIL */}

        <div style={styles.inputBox}>

          <FaEnvelope style={styles.icon} />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
          />

        </div>

        {/* PASSWORD */}

        <div style={styles.inputBox}>

          <FaLock style={styles.icon} />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          <div
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            style={styles.eye}
          >

            {showPassword
              ? <FaEyeSlash />
              : <FaEye />}

          </div>

        </div>

        {/* REMEMBER */}

        <div style={styles.rememberRow}>

          <label style={styles.checkboxLabel}>

            <input
              type="checkbox"
              checked={remember}
              onChange={() =>
                setRemember(!remember)
              }
            />

            Remember Me

          </label>

        </div>

        {/* BUTTON */}

        <button
          onClick={handleSubmit}
          style={styles.button}
          disabled={loading}
        >

          {loading ? (
            <>
              <FaSpinner
                className="spin"
              />
              Processing...
            </>
          ) : (
            <>
              <FaUserShield />
              <span>
                {isLogin
                  ? "LOGIN"
                  : "SIGN UP"}
              </span>
            </>
          )}

        </button>

        {/* TOGGLE */}

        <p
          onClick={() =>
            setIsLogin(!isLogin)
          }
          style={styles.toggle}
        >

          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}

        </p>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    overflow: "hidden",
    position: "relative",
    padding: "20px",
  },

  glow1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    background: "cyan",
    borderRadius: "50%",
    filter: "blur(180px)",
    top: "-100px",
    left: "-100px",
    opacity: 0.3,
  },

  glow2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "#8b5cf6",
    borderRadius: "50%",
    filter: "blur(160px)",
    bottom: "-100px",
    right: "-100px",
    opacity: 0.3,
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    padding: "45px",
    borderRadius: "28px",
    background:
      "rgba(255,255,255,0.08)",
    backdropFilter: "blur(14px)",
    boxShadow:
      "0 0 30px rgba(0,255,255,0.25)",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },

  logoBox: {
    width: "90px",
    height: "90px",
    margin: "0 auto 20px",
    borderRadius: "22px",
    background: "cyan",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    color: "#0f172a",
    boxShadow: "0 0 25px cyan",
  },

  title: {
    color: "white",
    fontSize: "34px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#cbd5e1",
    marginBottom: "30px",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    background:
      "rgba(255,255,255,0.1)",
    borderRadius: "14px",
    marginBottom: "22px",
    padding: "0 15px",
    transition: "0.3s",
  },

  icon: {
    color: "#cbd5e1",
    fontSize: "18px",
  },

  input: {
    flex: 1,
    padding: "16px",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: "16px",
  },

  eye: {
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "18px",
  },

  rememberRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
    color: "#cbd5e1",
    fontSize: "14px",
  },

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "14px",
    background: "cyan",
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 0 18px cyan",
    transition: "0.3s",
  },

  toggle: {
    marginTop: "28px",
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default Login;