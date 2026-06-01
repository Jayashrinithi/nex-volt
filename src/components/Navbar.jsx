import { Link, useLocation, useNavigate } from "react-router-dom";
import { Auth } from "../auth";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await Auth.logout();
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? "#06b6d4" : "white",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "bold" : "normal",
    paddingBottom: "3px",
    borderBottom:
      location.pathname === path
        ? "2px solid #06b6d4"
        : "2px solid transparent",
  });

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#111827",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2 style={{ margin: 0, color: "#06b6d4" }}>
        Nex Volt Monitor
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link to="/dashboard" style={linkStyle("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/analytics" style={linkStyle("/analytics")}>
          Analytics
        </Link>

        <Link to="/history" style={linkStyle("/history")}>
          History
        </Link>

        <Link to="/reports" style={linkStyle("/reports")}>
          Reports
        </Link>

        <Link to="/settings" style={linkStyle("/settings")}>
          Settings
        </Link>

        <button
          onClick={logout}
          style={{
            marginLeft: "10px",
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;