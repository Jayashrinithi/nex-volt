import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#222",
        color: "white",
      }}
    >
      <h2>Nex Volt Monitor</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link style={{ color: "white" }} to="/dashboard">
          Dashboard
        </Link>

        <Link style={{ color: "white" }} to="/analytics">
          Analytics
        </Link>

        <Link style={{ color: "white" }} to="/history">
          History
        </Link>

        <Link style={{ color: "white" }} to="/reports">
          Reports
        </Link>

        <Link style={{ color: "white" }} to="/settings">
          Settings
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;