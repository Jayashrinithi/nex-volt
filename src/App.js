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

function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [settings, setSettings] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("settings")) || {
        darkMode: true,
      }
    );
  });

  // ================= FIREBASE AUTH LISTENER =================

  useEffect(() => {
    const unsubscribe = Auth.onAuthChanged((firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });

    return unsubscribe;
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

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: settings.darkMode
            ? "linear-gradient(to right, #0f172a, #1e293b)"
            : "#f1f5f9",
          color: settings.darkMode ? "white" : "black",
        }}
      >
        Loading...
      </div>
    );
  }

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
      {/* NAVBAR ONLY AFTER LOGIN */}

      {user && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            user
              ? <Navigate to="/dashboard" replace />
              : <Login />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute user={user}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute user={user}>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute user={user}>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;