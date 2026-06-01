import { useEffect, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";

import {
  FaBolt,
  FaChargingStation,
  FaBatteryHalf,
  FaWater,
  FaExclamationTriangle,
  FaRulerVertical,
} from "react-icons/fa";

import { checkAlerts } from "../utils/checkAlerts";

function Dashboard() {
  const [data, setData] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    energy: 0,
    waterFlow: 0,
    waterLevel: 0,
    relay: false,
  });

  const [alerts, setAlerts] = useState([]);
  const [status, setStatus] = useState({});
  const [lastUpdated, setLastUpdated] = useState("--:--");

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("settings"))
      ?.darkMode ?? true
  );

  const lastAlertsRef = useRef([]);

  const getSavedSettings = () => {
    try {
      return (
        JSON.parse(localStorage.getItem("settings")) || {}
      );
    } catch {
      return {};
    }
  };

  const requestNotificationPermission = () => {
    const savedSettings = getSavedSettings();

    if (
      savedSettings.notificationEnabled !== false &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    const updateSettings = () => {
      const saved = getSavedSettings();

      setDarkMode(saved?.darkMode ?? true);

      if (saved.alertsEnabled === false) {
        setAlerts([]);
        lastAlertsRef.current = [];
      }

      requestNotificationPermission();
    };

    updateSettings();

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

  const playSound = () => {
    const audio = new Audio(
      process.env.PUBLIC_URL + "/alert.mp3"
    );

    audio.play().catch(() => {
      console.log("Sound blocked");
    });
  };

  const showPopup = (message) => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      new Notification("IoT Alert", {
        body: message,
        icon: process.env.PUBLIC_URL + "/logo192.png",
      });
    }
  };

  useEffect(() => {
    const sensorRef = ref(db, "liveData");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const firebaseData = snapshot.val();

      if (!firebaseData) return;

      const formattedData = {
        voltage: Number(firebaseData.voltage ?? 0),
        current: Number(firebaseData.current ?? 0),
        power: Number(firebaseData.power ?? 0),
        energy: Number(firebaseData.energy ?? 0),
        waterFlow: Number(firebaseData.waterFlow ?? 0),
        waterLevel: Number(firebaseData.waterLevel ?? 0),
        relay: false,
      };

      setData(formattedData);
      setLastUpdated(new Date().toLocaleTimeString());

      const savedSettings = getSavedSettings();

      const result = checkAlerts(
        formattedData,
        savedSettings
      );

      setStatus(result.status);

      if (savedSettings.alertsEnabled === false) {
        setAlerts([]);
        lastAlertsRef.current = [];
        return;
      }

      setAlerts(result.alerts);

      const previousAlerts = lastAlertsRef.current;

      const hasNewAlerts =
        JSON.stringify(previousAlerts) !==
        JSON.stringify(result.alerts);

      if (
        result.alerts.length > 0 &&
        hasNewAlerts
      ) {
        if (savedSettings.soundEnabled !== false) {
          playSound();
        }

        if (
          savedSettings.notificationEnabled !== false
        ) {
          result.alerts.forEach((msg) => {
            showPopup(msg);
          });
        }
      }

      lastAlertsRef.current = result.alerts;
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      style={{
        ...styles.container,
        background: darkMode
          ? "linear-gradient(to right, #0f172a, #1e293b)"
          : "linear-gradient(to right, #e2e8f0, #f8fafc)",
        color: darkMode ? "white" : "#0f172a",
      }}
    >
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            NEX VOLT DASHBOARD
          </h1>

          <p style={styles.subTitle}>
            Real-Time IoT Monitoring System
          </p>
        </div>

        <div style={styles.statusBox}>
          <div style={styles.statusDot}></div>

          <div>
            <p style={styles.statusText}>
              System Online
            </p>

            <span style={styles.updateText}>
              Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </div>

      {alerts.length > 0 && (
        <div style={styles.alertBox}>
          <div style={styles.alertTitle}>
            <FaExclamationTriangle />

            <span>Alerts Detected</span>
          </div>

          {alerts.map((alert, index) => (
            <div
              key={index}
              style={styles.alertText}
            >
              {alert}
            </div>
          ))}
        </div>
      )}

      <div style={styles.grid}>
        <Card
          icon={<FaBolt />}
          title="Voltage"
          value={`${data.voltage.toFixed(1)} V`}
          status={status.voltage}
        />

        <Card
          icon={<FaChargingStation />}
          title="Current"
          value={`${data.current.toFixed(2)} A`}
          status={status.current}
        />

        <Card
          icon={<FaBolt />}
          title="Power"
          value={`${data.power.toFixed(1)} W`}
          status={status.power}
        />

        <Card
          icon={<FaBatteryHalf />}
          title="Energy"
          value={`${data.energy.toFixed(3)} kWh`}
          status={status.energy}
        />

        <Card
          icon={<FaWater />}
          title="Water Flow"
          value={`${data.waterFlow.toFixed(2)} L/min`}
          status={status.waterFlow}
        />

        <Card
          icon={<FaRulerVertical />}
          title="Water Level"
          value={`${data.waterLevel.toFixed(1)} cm`}
          status={status.waterLevel}
        />
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  value,
  status = "normal",
}) {
  return (
    <div
      style={{
        ...styles.card,

        background:
          status === "danger"
            ? "rgba(255,0,0,0.25)"
            : status === "warning"
            ? "rgba(255,165,0,0.25)"
            : "rgba(0,255,255,0.15)",

        boxShadow:
          status === "danger"
            ? "0 0 25px red"
            : status === "warning"
            ? "0 0 25px orange"
            : "0 0 25px cyan",

        border:
          status === "danger"
            ? "2px solid red"
            : status === "warning"
            ? "2px solid orange"
            : "2px solid cyan",
      }}
    >
      <div
        style={{
          ...styles.iconBox,
          background:
            status === "danger"
              ? "#ef4444"
              : status === "warning"
              ? "#f97316"
              : "#06b6d4",
        }}
      >
        {icon}
      </div>

      <h2 style={styles.cardTitle}>
        {title}
      </h2>

      <h1 style={styles.cardValue}>
        {value}
      </h1>

      {status === "danger" && (
        <p style={styles.warning}>
          Danger
        </p>
      )}

      {status === "warning" && (
        <p style={{ color: "orange" }}>
          Warning
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "20px",
  },

  title: {
    fontSize: "38px",
    margin: 0,
    fontWeight: "bold",
  },

  subTitle: {
    color: "#94a3b8",
    marginTop: "8px",
  },

  statusBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255,255,255,0.08)",
    padding: "14px 22px",
    borderRadius: "15px",
    boxShadow: "0 0 15px rgba(0,255,255,0.2)",
  },

  statusDot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 15px #22c55e",
  },

  statusText: {
    margin: 0,
    fontWeight: "bold",
  },

  updateText: {
    fontSize: "13px",
    color: "#cbd5e1",
  },

  alertBox: {
    background: "rgba(255,0,0,0.1)",
    border: "1px solid red",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 0 15px rgba(255,0,0,0.3)",
  },

  alertTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#ff4d4f",
    fontSize: "22px",
    marginBottom: "15px",
    fontWeight: "bold",
  },

  alertText: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#fecaca",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "28px",
    borderRadius: "22px",
    backdropFilter: "blur(10px)",
    transition: "0.3s",
    position: "relative",
  },

  iconBox: {
    width: "70px",
    height: "70px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "32px",
    color: "#0f172a",
    marginBottom: "20px",
  },

  cardTitle: {
    color: "#cbd5e1",
    marginBottom: "15px",
    fontSize: "20px",
  },

  cardValue: {
    fontSize: "34px",
    fontWeight: "bold",
    margin: 0,
  },

  warning: {
    marginTop: "15px",
    color: "#ff6b6b",
    fontWeight: "bold",
  },
};

export default Dashboard;