import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../auth";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
  Auth.logout(() => {
    setOpen(false);

    navigate("/");
  });
};
  // If not logged in → don't render sidebar at all
  if (!Auth.isAuthenticated) return null;

  return (
    <>
      {/* MENU BUTTON */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={styles.menuButton}
        >
          ☰
        </div>
      )}

      {/* BACKDROP (prevents overlap click issues) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={styles.backdrop}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,
          left: open ? "0" : "-260px",
        }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <div
            onClick={() => setOpen(false)}
            style={styles.closeBtn}
          >
            ✖
          </div>

          <h2 style={{ margin: 0, fontSize: "22px" }}>
            NEX VOLT
          </h2>
        </div>

        {/* NAVIGATION */}
        <nav style={styles.nav}>
          <Link style={styles.link} to="/dashboard">
            ⚡ Dashboard
          </Link>

          <Link style={styles.link} to="/analytics">
            📊 Analytics
          </Link>

          <Link style={styles.link} to="/history">
            🕒 History
          </Link>

          <Link style={styles.link} to="/reports">
            📄 Reports
          </Link>

          <Link style={styles.link} to="/settings">
            ⚙ Settings
          </Link>

          {/* LOGOUT */}
          <button onClick={handleLogout} style={styles.logout}>
            Logout
          </button>
        </nav>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  sidebar: {
    width: "240px",
    height: "100vh",
    background: "rgba(15,23,42,0.95)",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: "25px",
    position: "fixed",
    top: 0,
    transition: "0.3s",
    zIndex: 1001,
    boxShadow: "0 0 20px rgba(0,255,255,0.3)",
  },

  menuButton: {
    position: "fixed",
    top: "20px",
    left: "20px",
    fontSize: "32px",
    cursor: "pointer",
    zIndex: 1002,
    color: "white",
    background: "#0f172a",
    padding: "10px 15px",
    borderRadius: "10px",
    boxShadow: "0 0 10px cyan",
  },

  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    zIndex: 1000,
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
  },

  closeBtn: {
    fontSize: "26px",
    cursor: "pointer",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    padding: "14px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.08)",
  },

  logout: {
    marginTop: "30px",
    padding: "12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default Sidebar;