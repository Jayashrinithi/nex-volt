import { useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaBolt,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

import { Auth } from "../auth";

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

  // SUBMIT
  const handleSubmit = () => {
    if (!email || !password) {
      alert("⚠ Fill all fields");

      return;
    }

    setLoading(true);

    // LOGIN
    if (isLogin) {
      const success = Auth.login(
        email,
        password,
        () => {
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      );

      if (!success) {
        setLoading(false);

        alert(
          "❌ Invalid Email or Password"
        );
      }
    }

    // SIGNUP
    else {
      Auth.signup(
        email,
        password,
        () => {
          setTimeout(() => {
            alert(
              "✅ Signup Successful"
            );

            navigate("/dashboard");
          }, 1000);
        }
      );
    }
  };

  return (
    <div style={styles.container}>
      {/* BACKGROUND EFFECT */}
      <div style={styles.blur1}></div>

      <div style={styles.blur2}></div>

      {/* LOGIN CARD */}
      <div style={styles.card}>
        {/* LOGO */}
        <div style={styles.logoBox}>
          <FaBolt
            style={styles.logoIcon}
          />

          <h1 style={styles.logoText}>
            NEX VOLT
          </h1>
        </div>

        {/* TITLE */}
        <h2 style={styles.title}>
          {isLogin
            ? "Smart IoT Login"
            : "Create Account"}
        </h2>

        <p style={styles.subtitle}>
          Smart Energy Monitoring
          System
        </p>

        {/* EMAIL */}
        <div style={styles.inputBox}>
          <FaEnvelope
            style={styles.icon}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            style={styles.input}
          />
        </div>

        {/* PASSWORD */}
        <div style={styles.inputBox}>
          <FaLock
            style={styles.icon}
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
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
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          {loading ? (
            "Please Wait..."
          ) : isLogin ? (
            <>
              <FaUserShield
                style={{
                  marginRight:
                    "10px",
                }}
              />
              LOGIN
            </>
          ) : (
            <>
              <FaUserShield
                style={{
                  marginRight:
                    "10px",
                }}
              />
              SIGN UP
            </>
          )}
        </button>

        {/* TOGGLE */}
        <p
          onClick={() => {
            setIsLogin(
              !isLogin
            );

            setLoading(false);
          }}
          style={styles.toggle}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

        {/* FOOTER */}
        <p style={styles.footer}>
          Smart IoT Multimeter v2.0
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

    height: "100vh",

    overflow: "hidden",

    position: "relative",

    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
  },

  blur1: {
    position: "absolute",

    width: "300px",

    height: "300px",

    background: "#06b6d4",

    filter: "blur(140px)",

    top: "-80px",

    left: "-80px",

    opacity: 0.4,
  },

  blur2: {
    position: "absolute",

    width: "300px",

    height: "300px",

    background: "#3b82f6",

    filter: "blur(140px)",

    bottom: "-80px",

    right: "-80px",

    opacity: 0.4,
  },

  card: {
    width: "380px",

    padding: "40px",

    borderRadius: "25px",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter:
      "blur(12px)",

    boxShadow:
      "0 0 30px rgba(0,255,255,0.2)",

    textAlign: "center",

    position: "relative",

    zIndex: 2,
  },

  logoBox: {
    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: "20px",
  },

  logoIcon: {
    fontSize: "40px",

    color: "#06b6d4",

    marginRight: "10px",
  },

  logoText: {
    color: "white",

    margin: 0,

    fontSize: "34px",
  },

  title: {
    color: "white",

    marginBottom: "10px",

    fontSize: "28px",
  },

  subtitle: {
    color: "#cbd5e1",

    marginBottom: "30px",

    fontSize: "15px",
  },

  inputBox: {
    display: "flex",

    alignItems: "center",

    background:
      "rgba(255,255,255,0.08)",

    padding: "14px",

    borderRadius: "14px",

    marginBottom: "20px",

    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  icon: {
    color: "#06b6d4",

    marginRight: "12px",

    fontSize: "18px",
  },

  input: {
    flex: 1,

    background: "transparent",

    border: "none",

    outline: "none",

    color: "white",

    fontSize: "16px",
  },

  eye: {
    color: "#cbd5e1",

    cursor: "pointer",
  },

  button: {
    width: "100%",

    padding: "15px",

    background:
      "linear-gradient(to right, #06b6d4, #0891b2)",

    border: "none",

    borderRadius: "14px",

    color: "white",

    fontSize: "18px",

    fontWeight: "bold",

    cursor: "pointer",

    marginTop: "10px",

    boxShadow:
      "0 0 15px rgba(0,255,255,0.4)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",
  },

  toggle: {
    marginTop: "25px",

    color: "#cbd5e1",

    cursor: "pointer",

    fontSize: "15px",
  },

  footer: {
    marginTop: "30px",

    color: "#94a3b8",

    fontSize: "13px",
  },
};

export default Login;