import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBolt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserShield,
} from "react-icons/fa";

import { Auth } from "../auth";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (isLogin) {
      const success = Auth.login(email, password, () => {
        navigate("/dashboard");
      });

      if (!success) {
        alert("Invalid email or password");
      }
    } else {
      Auth.signup(email, password, () => {
        alert("Signup Successful");
        navigate("/dashboard");
      });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* LOGO */}
        <div style={styles.logoBox}>
          <FaBolt />
        </div>

        {/* TITLE */}
        <h1 style={styles.title}>
          {isLogin ? "NEX VOLT LOGIN" : "NEX VOLT SIGN UP"}
        </h1>

        {/* EMAIL */}
        <div style={styles.inputBox}>
          <FaEnvelope style={styles.icon} />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* PASSWORD */}
        <div style={styles.inputBox}>
          <FaLock style={styles.icon} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <div
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eye}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>

        {/* BUTTON */}
        <button onClick={handleSubmit} style={styles.button}>
          <FaUserShield />
          <span>{isLogin ? "LOGIN" : "SIGN UP"}</span>
        </button>

        {/* TOGGLE */}
        <p onClick={() => setIsLogin(!isLogin)} style={styles.toggle}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "40px",
    borderRadius: "25px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 0 25px rgba(0,255,255,0.3)",
    textAlign: "center",
  },

  logoBox: {
    width: "80px",
    height: "80px",
    margin: "0 auto 20px",
    borderRadius: "20px",
    background: "cyan",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "38px",
    color: "#0f172a",
    boxShadow: "0 0 20px cyan",
  },

  title: {
    color: "white",
    marginBottom: "35px",
    fontSize: "32px",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "12px",
    marginBottom: "22px",
    padding: "0 15px",
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

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    background: "cyan",
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 0 15px cyan",
  },

  toggle: {
    marginTop: "25px",
    color: "#cbd5e1",
    cursor: "pointer",
    fontSize: "15px",
  },
};

export default Login;