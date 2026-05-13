import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Auth } from "../auth";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] =
    useState(true);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = () => {

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    // LOGIN
    if (isLogin) {
      const success = Auth.login(
        email,
        password,
        () => {
          navigate("/dashboard");
        }
      );

      if (!success) {
        alert(
          "Invalid email or password"
        );
      }
    }

    // SIGNUP
    else {
      Auth.signup(
        email,
        password,
        () => {
          alert(
            "Signup Successful"
          );

          navigate("/dashboard");
        }
      );
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>
          {isLogin
            ? "NEX VOLT LOGIN"
            : "NEX VOLT SIGN UP"}
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />

        <button
          onClick={handleSubmit}
          style={styles.button}
        >
          {isLogin
            ? "LOGIN"
            : "SIGN UP"}
        </button>

        <p
          onClick={() =>
            setIsLogin(!isLogin)
          }
          style={styles.toggle}
        >
          {isLogin
            ? "Don't have account? Sign Up"
            : "Already have account? Login"}
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
    height: "100vh",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
  },

  card: {
    width: "350px",
    padding: "40px",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 20px cyan",
    textAlign: "center",
  },

  title: {
    color: "white",
    marginBottom: "30px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "cyan",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  toggle: {
    marginTop: "20px",
    color: "#cbd5e1",
    cursor: "pointer",
  },
};

export default Login;