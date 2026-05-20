import { useEffect, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";

import {
  FaBolt,
  FaChargingStation,
  FaBatteryHalf,
  FaWater,
  FaExclamationTriangle,
  FaToggleOn,
  FaToggleOff,
  FaRulerVertical,
} from "react-icons/fa";

import { checkAlerts } from "../utils/checkAlerts";

function Dashboard() {

  // ================= STATES =================
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

  const lastAlertsRef = useRef([]);

  // ================= SOUND =================
  const playSound = () => {

    const audio = new Audio("/alert.mp3");

    audio.play().catch(() => {
      console.log("Sound blocked");
    });
  };

  // ================= POPUP =================
  const showPopup = (message) => {

    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {

      new Notification("⚠ IoT Alert", {
        body: message,
        icon: "/logo192.png",
      });
    }
  };

  // ================= NOTIFICATION PERMISSION =================
  useEffect(() => {

    if ("Notification" in window) {

      Notification.requestPermission();
    }

  }, []);

  // ================= FIREBASE =================
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

        waterLevel: Number(firebaseData.waterLevel || 0),

        relay: firebaseData.relay || false,
      };

      setData(formattedData);

      // ================= ALERTS =================
      const newAlerts = checkAlerts(formattedData);

      setAlerts(newAlerts);

      const previousAlerts = lastAlertsRef.current;

      const hasNewAlerts =
        JSON.stringify(previousAlerts) !==
        JSON.stringify(newAlerts);

      if (newAlerts.length > 0 && hasNewAlerts) {

        playSound();

        newAlerts.forEach((msg) => {
          showPopup(msg);
        });
      }

      lastAlertsRef.current = newAlerts;
    });

    return () => unsubscribe();

  }, []);

  return (

    <div style={styles.container}>

      {/* ================= TITLE ================= */}

      <div style={styles.header}>

        <h1 style={styles.title}>
          ⚡ NEX VOLT DASHBOARD
        </h1>

        <div style={styles.statusBox}>

          <div style={styles.statusDot}></div>

          <span>System Online</span>

        </div>

      </div>

      {/* ================= ALERT BOX ================= */}

      {alerts.length > 0 && (

        <div style={styles.alertBox}>

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

      {/* ================= CARDS ================= */}

      <div style={styles.grid}>

        <Card
          icon={<FaBolt />}
          title="Voltage"
          value={`${data.voltage.toFixed(1)} V`}
          glow="#00e5ff"
          danger={data.voltage > 250}
        />

        <Card
          icon={<FaChargingStation />}
          title="Current"
          value={`${data.current.toFixed(2)} A`}
          glow="#22c55e"
          danger={data.current > 5}
        />

        <Card
          icon={<FaBolt />}
          title="Power"
          value={`${data.power.toFixed(1)} W`}
          glow="#f59e0b"
        />

        <Card
          icon={<FaBatteryHalf />}
          title="Energy"
          value={`${data.energy.toFixed(3)} kWh`}
          glow="#a855f7"
        />

        <Card
          icon={<FaWater />}
          title="Water Flow"
          value={`${data.waterFlow.toFixed(2)} L/min`}
          glow="#06b6d4"
        />

        <Card
          icon={<FaRulerVertical />}
          title="Water Level"
          value={`${data.waterLevel.toFixed(1)} cm`}
          glow="#14b8a6"
        />

        <Card
          icon={
            data.relay
              ? <FaToggleOn />
              : <FaToggleOff />
          }
          title="Relay Status"
          value={
            data.relay
              ? "ON"
              : "OFF"
          }
          glow={
            data.relay
              ? "#22c55e"
              : "#ef4444"
          }
        />

      </div>

    </div>
  );
}

/* ================= CARD COMPONENT ================= */

function Card({
  icon,
  title,
  value,
  glow,
  danger = false,
}) {

  return (

    <div
      style={{
        ...styles.card,

        boxShadow: danger
          ? "0 0 25px red"
          : `0 0 20px ${glow}`,

        border: danger
          ? "2px solid red"
          : "1px solid rgba(255,255,255,0.1)",

        animation: danger
          ? "blink 1s infinite"
          : "none",
      }}
    >

      <div
        style={{
          ...styles.iconBox,
          background: glow,
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

    </div>
  );
}

/* ================= STYLES ================= */

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
    fontWeight: "bold",
  },

  statusBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.08)",
    padding: "10px 20px",
    borderRadius: "12px",
  },

  statusDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 10px #22c55e",
  },

  alertBox: {
    background: "rgba(255,0,0,0.12)",
    border: "1px solid red",
    borderRadius: "15px",
    padding: "20px",
    marginBottom: "30px",
    animation: "blink 1s infinite",
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
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    transition: "0.3s",
  },

  iconBox: {
    width: "65px",
    height: "65px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
    color: "#0f172a",
    marginBottom: "20px",
  },

  cardTitle: {
    color: "#cbd5e1",
    marginBottom: "15px",
  },

  cardValue: {
    fontSize: "34px",
    fontWeight: "bold",
  },
};

export default Dashboard;