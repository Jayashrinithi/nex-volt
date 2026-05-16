import { useEffect, useState } from "react";
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
    const sensorRef = ref(db, "sensorData");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const firebaseData = snapshot.val();

      if (firebaseData) {
        const formattedData = {
          voltage: Number(firebaseData.voltage || 0),
          current: Number(firebaseData.current || 0),
          power: Number(firebaseData.power || 0),
          energy: Number(firebaseData.energy || 0),
          waterFlow: Number(
            firebaseData.waterFlow || 0
          ),
        };

        setData(formattedData);

        // CHECK ALERTS
        const activeAlerts =
          checkAlerts(formattedData);

        setAlerts(activeAlerts);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>

      {/* TITLE */}
      <h1 style={styles.title}>
        ⚡ NEX VOLT DASHBOARD
      </h1>

      {/* ALERT SECTION */}
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

      {/* CARDS */}
      <div style={styles.grid}>

        {/* VOLTAGE */}
        <Card
          icon={<FaBolt />}
          title="Voltage"
          value={`${data.voltage} V`}
          glow="cyan"
        />

        {/* CURRENT */}
        <Card
          icon={<FaChargingStation />}
          title="Current"
          value={`${data.current} A`}
          glow="#22c55e"
        />

        {/* POWER */}
        <Card
          icon={<FaBolt />}
          title="Power"
          value={`${data.power} W`}
          glow="#f59e0b"
        />

        {/* ENERGY */}
        <Card
          icon={<FaBatteryHalf />}
          title="Energy"
          value={`${data.energy} kWh`}
          glow="#a855f7"
        />

        {/* WATER FLOW */}
        <Card
          icon={<FaWater />}
          title="Water Flow"
          value={`${data.waterFlow} L/min`}
          glow="#06b6d4"
        />
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function Card({
  icon,
  title,
  value,
  glow,
}) {
  return (
    <div
      style={{
        ...styles.card,
        boxShadow: `0 0 20px ${glow}`,
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

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    paddingLeft: "90px",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    color: "white",
  },

  title: {
    fontSize: "38px",
    marginBottom: "30px",
  },

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
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",

    padding: "30px",

    borderRadius: "20px",

    backdropFilter: "blur(10px)",

    transition: "0.3s",
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

  cardTitle: {
    margin: 0,
    marginBottom: "15px",
    fontSize: "22px",
    color: "#cbd5e1",
  },

  cardValue: {
    margin: 0,
    fontSize: "36px",
    fontWeight: "bold",
  },
};

export default Dashboard;