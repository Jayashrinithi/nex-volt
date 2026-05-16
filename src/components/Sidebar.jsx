import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaHome,
  FaChartLine,
  FaHistory,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaBolt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { Auth } from "../auth";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const location = useLocation();

  // LOGOUT
  const handleLogout = () => {
    Auth.logout(() => {
      setOpen(false);

      navigate("/");
    });
  };

  // HIDE SIDEBAR IF NOT LOGGED IN
  if (!Auth.isAuthenticated)
    return null;

  // NAV ITEMS
  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartLine />,
    },

    {
      name: "History",
      path: "/history",
      icon: <FaHistory />,
    },

    {
      name: "Reports",
      path: "/reports",
      icon: <FaFileAlt />,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <>
      {/* MENU BUTTON */}
      {!open && (
        <div
          onClick={() =>
            setOpen(true)
          }
          style={styles.menuButton}
        >
          <FaBars />
        </div>
      )}

      {/* BACKDROP */}
      {open && (
        <div
          style={styles.backdrop}
          onClick={() =>
            setOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          ...styles.sidebar,

          left: open
            ? "0"
            : "-260px",
        }}
      >
        {/* HEADER */}
        <div style={styles.header}>
          <div
            style={styles.logoBox}
          >
            <FaBolt
              style={{
                color: "#06b6d4",
                marginRight:
                  "10px",
              }}
            />

            <h2
              style={{
                margin: 0,
              }}
            >
              NEX VOLT
            </h2>
          </div>

          <div
            style={styles.closeBtn}
            onClick={() =>
              setOpen(false)
            }
          >
            <FaTimes />
          </div>
        </div>

        {/* USER INFO */}
        <div style={styles.userCard}>
          <div
            style={styles.avatar}
          >
            👤
          </div>

          <div>
            <h3
              style={{
                margin: 0,
              }}
            >
              Smart IoT User
            </h3>

            <p
              style={{
                margin: 0,
                color:
                  "#cbd5e1",
                fontSize:
                  "14px",
              }}
            >
              System Active
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav style={styles.nav}>
          {navItems.map(
            (item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() =>
                  setOpen(false)
                }
                style={{
                  ...styles.link,

                  background:
                    location.pathname ===
                    item.path
                      ? "linear-gradient(to right, #06b6d4, #0891b2)"
                      : "rgba(255,255,255,0.06)",

                  boxShadow:
                    location.pathname ===
                    item.path
                      ? "0 0 15px rgba(0,255,255,0.5)"
                      : "none",
                }}
              >
                <span
                  style={{
                    fontSize:
                      "20px",
                  }}
                >
                  {item.icon}
                </span>

                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* FOOTER */}
        <div
          style={styles.footer}
        >
          <button
            onClick={
              handleLogout
            }
            style={
              styles.logout
            }
          >
            <FaSignOutAlt
              style={{
                marginRight:
                  "10px",
              }}
            />
            Logout
          </button>

          <p
            style={{
              marginTop: "20px",
              color:
                "#94a3b8",
              fontSize:
                "13px",
              textAlign:
                "center",
            }}
          >
            Smart IoT Multimeter
            v2.0
          </p>
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  sidebar: {
    width: "240px",

    height: "100vh",

    background:
      "rgba(15,23,42,0.96)",

    backdropFilter:
      "blur(12px)",

    color: "white",

    padding: "25px",

    position: "fixed",

    top: 0,

    transition:
      "0.3s ease",

    zIndex: 1001,

    boxShadow:
      "0 0 25px rgba(0,255,255,0.2)",

    display: "flex",

    flexDirection:
      "column",

    justifyContent:
      "space-between",
  },

  menuButton: {
    position: "fixed",

    top: "20px",

    left: "20px",

    width: "55px",

    height: "55px",

    display: "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    fontSize: "24px",

    cursor: "pointer",

    zIndex: 1002,

    color: "white",

    background:
      "linear-gradient(to right, #06b6d4, #0891b2)",

    borderRadius: "15px",

    boxShadow:
      "0 0 15px cyan",
  },

  backdrop: {
    position: "fixed",

    top: 0,

    left: 0,

    width: "100%",

    height: "100%",

    background:
      "rgba(0,0,0,0.45)",

    zIndex: 1000,
  },

  header: {
    display: "flex",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    marginBottom: "30px",
  },

  logoBox: {
    display: "flex",

    alignItems:
      "center",

    fontSize: "22px",

    fontWeight: "bold",
  },

  closeBtn: {
    fontSize: "24px",

    cursor: "pointer",

    transition:
      "0.3s",
  },

  userCard: {
    display: "flex",

    alignItems:
      "center",

    gap: "15px",

    background:
      "rgba(255,255,255,0.08)",

    padding: "15px",

    borderRadius: "15px",

    marginBottom: "30px",

    boxShadow:
      "0 0 10px rgba(0,255,255,0.1)",
  },

  avatar: {
    width: "50px",

    height: "50px",

    borderRadius: "50%",

    background:
      "linear-gradient(to right, #06b6d4, #0891b2)",

    display: "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    fontSize: "24px",
  },

  nav: {
    display: "flex",

    flexDirection:
      "column",

    gap: "18px",

    flex: 1,
  },

  link: {
    display: "flex",

    alignItems:
      "center",

    gap: "15px",

    color: "white",

    textDecoration:
      "none",

    fontSize: "18px",

    padding: "15px",

    borderRadius: "14px",

    transition:
      "0.3s ease",
  },

  footer: {
    marginTop: "30px",
  },

  logout: {
    width: "100%",

    padding: "14px",

    background:
      "linear-gradient(to right, #ef4444, #dc2626)",

    color: "white",

    border: "none",

    borderRadius: "12px",

    cursor: "pointer",

    fontSize: "17px",

    fontWeight: "bold",

    display: "flex",

    alignItems:
      "center",

    justifyContent:
      "center",

    boxShadow:
      "0 0 15px rgba(255,0,0,0.3)",
  },
};

export default Sidebar;