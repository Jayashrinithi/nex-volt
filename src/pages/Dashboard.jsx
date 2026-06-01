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

  const [lastUpdated, setLastUpdated] =
    useState("--:--");

  const lastAlertsRef = useRef([]);

  // ================= SOUND =================

  const playSound = () => {

    const audio = new Audio(
  process.env.PUBLIC_URL + "/alert.mp3"
);

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
        icon: process.env.PUBLIC_URL + "/logo192.png",
      });
    }
  };

  // ================= NOTIFICATION =================

  useEffect(() => {

    if ("Notification" in window) {

      Notification.requestPermission();
    }

  }, []);

  // ================= FIREBASE LIVE DATA =================

  useEffect(() => {

    const sensorRef = ref(db, "liveData");

    const unsubscribe = onValue(
      sensorRef,
      (snapshot) => {

        const firebaseData = snapshot.val();

        if (!firebaseData) return;

       const formattedData = {
  voltage: Number(firebaseData.voltage ?? 0),
  current: Number(firebaseData.current ?? 0),
  power: Number(firebaseData.power ?? 0),
  energy: Number(firebaseData.energy ?? 0),
  waterFlow: Number(firebaseData.waterFlow ?? 0),
  waterLevel: Number(firebaseData.waterLevel ?? 0),

  // relay not present in current Firebase structure
  relay: false,
};

        // LIVE UPDATE
        setData(formattedData);

        // TIME
        const now = new Date();

        setLastUpdated(
          now.toLocaleTimeString()
        );

        // ================= ALERT CHECK =================

        const newAlerts =
          checkAlerts(formattedData);

        setAlerts(newAlerts);

        const previousAlerts =
          lastAlertsRef.current;

        const hasNewAlerts =
          JSON.stringify(previousAlerts) !==
          JSON.stringify(newAlerts);

        if (
          newAlerts.length > 0 &&
          hasNewAlerts
        ) {

          playSound();

          newAlerts.forEach((msg) => {

            showPopup(msg);

          });
        }

        lastAlertsRef.current =
          newAlerts;
      }
    );

    return () => unsubscribe();

  }, []);

  return (

    <div style={styles.container}>

      {/* ================= HEADER ================= */}

      <div style={styles.header}>

        <div>

          <h1 style={styles.title}>
            ⚡ NEX VOLT DASHBOARD
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
              Updated:
              {" "}
              {lastUpdated}
            </span>

          </div>

        </div>

      </div>

      {/* ================= ALERTS ================= */}

      {alerts.length > 0 && (

        <div style={styles.alertBox}>

          <div style={styles.alertTitle}>

            <FaExclamationTriangle />

            <span>
              Alerts Detected
            </span>

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

      {/* ================= CARDS ================= */}

      <div style={styles.grid}>

        <Card
          icon={<FaBolt />}
          title="Voltage"
          value={`${data.voltage.toFixed(1)} V`}
          glow="#00e5ff"
          danger={
            data.voltage > 250 ||
            data.voltage < 180
          }
        />

        <Card
          icon={<FaChargingStation />}
          title="Current"
          value={`${data.current.toFixed(2)} A`}
          glow="#22c55e"
          danger={data.current > 10}
        />

        <Card
          icon={<FaBolt />}
          title="Power"
          value={`${data.power.toFixed(1)} W`}
          glow="#f59e0b"
          danger={data.power > 3000}
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
          danger={data.waterFlow > 20}
        />
      </div>

    </div>
  );
}

/* ================= CARD ================= */

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
          : "1px solid rgba(255,255,255,0.08)",
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

      {danger && (
        <p style={styles.warning}>
          ⚠ Threshold Exceeded
        </p>
      )}

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

    background:
      "rgba(255,255,255,0.08)",

    padding: "14px 22px",

    borderRadius: "15px",

    boxShadow:
      "0 0 15px rgba(0,255,255,0.2)",
  },

  statusDot: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#22c55e",

    boxShadow:
      "0 0 15px #22c55e",
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

    boxShadow:
      "0 0 15px rgba(255,0,0,0.3)",
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
    background:
      "rgba(255,255,255,0.08)",

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