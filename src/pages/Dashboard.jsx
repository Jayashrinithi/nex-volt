import { useEffect, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";

import {
  FaBolt,
  FaChargingStation,
  FaBatteryHalf,
  FaWater,
  FaExclamationTriangle,
} from "react-icons/fa";

import { checkAlerts } from "../utils/checkAlerts";

function Dashboard() {
  const [data, setData] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    energy: 0,
    waterFlow: 0,
  });

  const [alerts, setAlerts] = useState([]);
useEffect(() => {
  if (alerts.length > 0) {
    const audio = new Audio("/alert.mp3");
    audio.play();
  }
}, [alerts]);
  // store last alerts to avoid spam
  const lastAlertsRef = useRef([]);
const playedRef = useRef(false);

useEffect(() => {
  if (alerts.length > 0 && !playedRef.current) {
    const audio = new Audio("/alert.mp3");
    audio.play();
    playedRef.current = true;
  }

  if (alerts.length === 0) {
    playedRef.current = false;
  }
}, [alerts]);
  // =========================
  // SOUND FUNCTION
  // =========================
  const playSound = () => {
    const audio = new Audio("/alert.mp3");
    audio.play().catch(() => {
      console.log("Sound blocked by browser");
    });
  };

  // =========================
  // POPUP NOTIFICATION
  // =========================
  const showPopup = (message) => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      new Notification("⚠ IoT Alert", {
        body: message,
        icon: "/logo192.png",
      });
    }
  };

  // ask permission once
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // =========================
  // FIREBASE DATA
  // =========================
  useEffect(() => {
    const sensorRef = ref(db, "sensorData");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const firebaseData = snapshot.val();

      if (!firebaseData) return;

      const formattedData = {
        voltage: Number(firebaseData.voltage || 0),
        current: Number(firebaseData.current || 0),
        power: Number(firebaseData.power || 0),
        energy: Number(firebaseData.energy || 0),
        waterFlow: Number(firebaseData.waterFlow || 0),
      };

      setData(formattedData);

      const newAlerts = checkAlerts(formattedData);
      setAlerts(newAlerts);

      // =========================
      // ALERT TRIGGER LOGIC
      // =========================
      const prev = lastAlertsRef.current;

      const isNewAlert =
        newAlerts.length > 0 &&
        JSON.stringify(newAlerts) !== JSON.stringify(prev);

      if (isNewAlert) {
        // SOUND
        playSound();

        // POPUP
        newAlerts.forEach((msg) => showPopup(msg));
      }

      lastAlertsRef.current = newAlerts;
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚡ NEX VOLT DASHBOARD</h1>

      {/* ALERT BOX */}
      {alerts.length > 0 && (
        <div
  style={{
    ...styles.alertBox,
    animation: alerts.length > 0 ? "blink 1s infinite" : "none",
    borderColor: alerts.length > 0 ? "red" : "transparent",
  }}
>
          <div style={styles.alertTitle}>
            <FaExclamationTriangle />
            <span>Alerts Detected</span>
          </div>

          {alerts.map((alert, index) => (
            <div key={index} style={styles.alertText}>
              {alert}
            </div>
          ))}
        </div>
      )}

      {/* CARDS */}
      <div style={styles.grid}>
        <Card icon={<FaBolt />} title="Voltage" value={`${data.voltage} V`} glow="cyan" />
        <Card icon={<FaChargingStation />} title="Current" value={`${data.current} A`} glow="#22c55e" />
        <Card icon={<FaBolt />} title="Power" value={`${data.power} W`} glow="#f59e0b" />
        <Card icon={<FaBatteryHalf />} title="Energy" value={`${data.energy} kWh`} glow="#a855f7" />
        <Card icon={<FaWater />} title="Water Flow" value={`${data.waterFlow} L/min`} glow="#06b6d4" />
      </div>
    </div>
  );
}

/* ================= CARD ================= */

function Card({ icon, title, value, glow }) {
  const isDanger =
    title === "Voltage" && Number(value) > 250;

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: isDanger
          ? "0 0 25px red"
          : `0 0 20px ${glow}`,
        animation: isDanger ? "blink 1s infinite" : "none",
        border: isDanger ? "2px solid red" : "none",
      }}
    >
      <div
        style={{
          ...styles.iconBox,
          background: isDanger ? "red" : glow,
        }}
      >
        {icon}
      </div>

      <h2 style={styles.cardTitle}>{title}</h2>

      <h1 style={styles.cardValue}>{value}</h1>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    paddingLeft: "90px",
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    color: "white",
  },

  title: { fontSize: "38px", marginBottom: "30px" },

  alertBox: {
    background: "rgba(255,0,0,0.15)",
    border: "1px solid red",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 0 20px rgba(255,0,0,0.4)",
  },

  alertTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "22px",
    marginBottom: "15px",
    color: "#ff4d4f",
    fontWeight: "bold",
  },

  alertText: {
    marginBottom: "10px",
    fontSize: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
  },

  iconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    color: "#0f172a",
    marginBottom: "20px",
  },

  cardTitle: { color: "#cbd5e1", marginBottom: "15px" },
  cardValue: { fontSize: "36px", fontWeight: "bold" },
};

export default Dashboard;