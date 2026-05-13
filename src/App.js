import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const hideSidebar = location.pathname === "/";

  return (
    <div style={{ display: "flex" }}>
      
      {/* SIDEBAR */}
      {!hideSidebar && (
        <Sidebar open={open} setOpen={setOpen} />
      )}

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          width: "100%",
          marginLeft: hideSidebar ? "0px" : open ? "240px" : "70px",
          transition: "0.3s ease",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />

          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
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