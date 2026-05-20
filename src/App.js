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

/* ================= APP ================= */

function App() {

  // ================= SETTINGS =================

  const [settings, setSettings] = useState(() => {

    const savedSettings =
      localStorage.getItem("settings");

    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          darkMode: true,
        };
  });

  // ================= SETTINGS LISTENER =================

  useEffect(() => {

    const updateSettings = () => {

      const updatedSettings =
        JSON.parse(localStorage.getItem("settings"));

      if (updatedSettings) {

        setSettings(updatedSettings);
      }
    };

    // Same tab update
    window.addEventListener(
      "settingsChanged",
      updateSettings
    );

    // Multi-tab update
    window.addEventListener(
      "storage",
      updateSettings
    );

    return () => {

      window.removeEventListener(
        "settingsChanged",
        updateSettings
      );

      window.removeEventListener(
        "storage",
        updateSettings
      );
    };

  }, []);

  // ================= THEME =================

  const darkMode = settings.darkMode;

  const appStyle = {

    minHeight: "100vh",

    background: darkMode
      ? "linear-gradient(to right, #0f172a, #1e293b)"
      : "linear-gradient(to right, #e2e8f0, #f8fafc)",

    color: darkMode
      ? "white"
      : "#0f172a",

    transition: "all 0.3s ease",

    overflowX: "hidden",
  };

  return (

    <div style={appStyle}>

      {/* ================= NAVBAR ================= */}

      {Auth.isAuthenticated() && <Navbar />}

      {/* ================= ROUTES ================= */}

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={
            Auth.isAuthenticated()
              ? <Navigate to="/dashboard" replace />
              : <Login />
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ANALYTICS */}

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* HISTORY */}

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* REPORTS */}

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* UNKNOWN ROUTES */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                Auth.isAuthenticated()
                  ? "/dashboard"
                  : "/"
              }
              replace
            />
          }
        />

      </Routes>

    </div>
  );
}

export default App;