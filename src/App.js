import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { useState } from "react";

import Sidebar from "./components/Sidebar";

import PrivateRoute from "./PrivateRoute";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

function Layout() {
  const [open, setOpen] =
    useState(false);

  const location = useLocation();

  // HIDE SIDEBAR IN LOGIN PAGE
  const hideSidebar =
    location.pathname === "/";

  return (
    <div
      style={{
        display: "flex",

        background: "#020617",

        minHeight: "100vh",

        overflowX: "hidden",
      }}
    >
      {/* SIDEBAR */}
      {!hideSidebar && (
        <Sidebar
          open={open}
          setOpen={setOpen}
        />
      )}

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,

          width: "100%",

          marginLeft: hideSidebar
            ? "0px"
            : open
            ? "240px"
            : "80px",

          transition:
            "all 0.3s ease",

          minHeight: "100vh",

          overflowX: "hidden",
        }}
      >
        <Routes>
          {/* LOGIN PAGE */}
          <Route
            path="/"
            element={<Login />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* ANALYTICS */}
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />

          {/* HISTORY */}
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />

          {/* REPORTS */}
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />

          {/* SETTINGS */}
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          {/* UNKNOWN ROUTES */}
          <Route
            path="*"
            element={
              <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;