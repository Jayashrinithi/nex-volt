import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

import { Auth } from "./auth";

/* ================= PROTECTED ROUTE ================= */

function ProtectedRoute({ children }) {

  const authenticated = Auth.isAuthenticated();

  if (!authenticated) {

    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    Auth.isAuthenticated()
  );

  const [settings, setSettings] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("settings")) || {
        darkMode: true,
      }
    );
  });

  // ================= AUTH LISTENER =================

  useEffect(() => {

    const updateAuth = () => {
      setIsLoggedIn(Auth.isAuthenticated());
    };

    window.addEventListener("authChanged", updateAuth);

    return () => {
      window.removeEventListener(
        "authChanged",
        updateAuth
      );
    };

  }, []);

  // ================= SETTINGS LISTENER =================

  useEffect(() => {

    const updateSettings = () => {

      const updated =
        JSON.parse(localStorage.getItem("settings"));

      if (updated) {
        setSettings(updated);
      }
    };

    window.addEventListener(
      "settingsChanged",
      updateSettings
    );

    return () => {

      window.removeEventListener(
        "settingsChanged",
        updateSettings
      );
    };

  }, []);

  return (

    <div
      style={{
        minHeight: "100vh",

        background: settings.darkMode
          ? "linear-gradient(to right, #0f172a, #1e293b)"
          : "#f1f5f9",

        color: settings.darkMode
          ? "white"
          : "black",

        transition: "0.3s",
      }}
    >

      {/* SIDEBAR ONLY AFTER LOGIN */}

      {isLoggedIn && <Navbar />}

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;