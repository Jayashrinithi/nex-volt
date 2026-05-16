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

function ProtectedRoute({ children }) {
  if (!Auth.isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  const [settings, setSettings] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("settings")) || {
        darkMode: true,
      }
    );
  });

  // ✅ CLEAN SETTINGS LISTENER (FIXED)
  useEffect(() => {
    const updateSettings = () => {
      const updated = JSON.parse(localStorage.getItem("settings"));
      if (updated) setSettings(updated);
    };

    // custom event listener (same tab fix)
    window.addEventListener("settingsChanged", updateSettings);

    return () => {
      window.removeEventListener("settingsChanged", updateSettings);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: settings.darkMode
          ? "linear-gradient(to right, #0f172a, #1e293b)"
          : "#f1f5f9",
        color: settings.darkMode ? "white" : "black",
        transition: "0.3s",
      }}
    >
      {Auth.isAuthenticated() && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />

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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;