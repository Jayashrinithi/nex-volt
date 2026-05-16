import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaChartLine,
  FaHistory,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { Auth } from "../auth";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Auth.logout(() => {
      setOpen(false);
      navigate("/");
    });
  };

  // IF NOT LOGGED IN
  if (!Auth.isAuthenticated()) return null;

  return (
    <>
      {/* MENU BUTTON */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={styles.menuButton}
        >
          <FaBars />
        </div>
      )}

      {/* BACKDROP */}
      {open && (
        <div
          style={styles.backdrop}
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,
          left: open ? "0" : "-270px",
        }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.logo}>
            ⚡ NEX VOLT
          </h2>

          <div
            style={styles.closeBtn}
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </div>
        </div>

        {/* NAVIGATION */}
        <nav style={styles.nav}>

          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            style={{
              ...styles.link,
              ...(location.pathname === "/dashboard"
                ? styles.activeLink
                : {}),
            }}
            onClick={() => setOpen(false)}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </Link>

          {/* ANALYTICS */}
          <Link
            to="/analytics"
            style={{
              ...styles.link,
              ...(location.pathname === "/analytics"
                ? styles.activeLink
                : {}),
            }}
            onClick={() => setOpen(false)}
          >
            <FaChartLine />
            <span>Analytics</span>
          </Link>

          {/* HISTORY */}
          <Link
            to="/history"
            style={{
              ...styles.link,
              ...(location.pathname === "/history"
                ? styles.activeLink
                : {}),
            }}
            onClick={() => setOpen(false)}
          >
            <FaHistory />
            <span>History</span>
          </Link>

          {/* REPORTS */}
          <Link
            to="/reports"
            style={{
              ...styles.link,
              ...(location.pathname === "/reports"
                ? styles.activeLink
                : {}),
            }}
            onClick={() => setOpen(false)}
          >
            <FaFileAlt />
            <span>Reports</span>
          </Link>

          {/* SETTINGS */}
          <Link
            to="/settings"
            style={{
              ...styles.link,
              ...(location.pathname === "/settings"
                ? styles.activeLink
                : {}),
            }}
            onClick={() => setOpen(false)}
          >
            <FaCog />
            <span>Settings</span>
          </Link>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            style={styles.logout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
}

const styles = {
  sidebar: {
    width: "250px",
    height: "100vh",
    background: "rgba(15,23,42,0.98)",
    backdropFilter: "blur(12px)",
    color: "white",
    padding: "25px",
    position: "fixed",
    top: 0,
    transition: "0.3s ease",
    zIndex: 1001,
    boxShadow: "0 0 20px rgba(0,255,255,0.3)",
  },

  menuButton: {
    position: "fixed",
    top: "20px",
    left: "20px",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 1002,
    color: "white",
    background: "#0f172a",
    borderRadius: "12px",
    boxShadow: "0 0 15px cyan",
  },

  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    zIndex: 1000,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  logo: {
    margin: 0,
    fontSize: "24px",
    color: "cyan",
  },

  closeBtn: {
    fontSize: "22px",
    cursor: "pointer",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "white",
    background: "rgba(255,255,255,0.06)",
    fontSize: "17px",
    transition: "0.3s",
  },

  activeLink: {
    background: "cyan",
    color: "#0f172a",
    fontWeight: "bold",
    boxShadow: "0 0 15px cyan",
  },

  logout: {
    marginTop: "30px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    background: "#ef4444",
    color: "white",
    fontSize: "17px",
    cursor: "pointer",
    boxShadow: "0 0 15px rgba(255,0,0,0.5)",
  },
};

export default Sidebar;