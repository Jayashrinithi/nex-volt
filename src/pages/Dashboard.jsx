import { useEffect, useState } from "react";

import {
  ref,
  onValue,
  push,
  set,
} from "firebase/database";

import { db } from "../services/firebase";

import { checkAlerts } from "../utils/checkAlerts";

function Dashboard() {
  const [data, setData] = useState({
    voltage: 0,
    current: 0,
    power: 0,
    energy: 0,
    waterFlow: 0,
    waterLevel: 0,
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const liveDataRef = ref(db, "liveData");

    const historyRef = ref(db, "history");

    const unsubscribe = onValue(
      liveDataRef,
      (snapshot) => {
        const firebaseData = snapshot.val();

        if (firebaseData) {
          const safeData = {
            voltage:
              firebaseData.voltage ?? 0,

            current:
              firebaseData.current ?? 0,

            power:
              firebaseData.power ?? 0,

            energy:
              firebaseData.energy ?? 0,

            waterFlow:
              firebaseData.waterFlow ?? 0,

            waterLevel:
              firebaseData.waterLevel ?? 0,
          };

          setData(safeData);

          // ✅ SAVE SENSOR HISTORY
          const newHistoryRef =
            push(historyRef);

          set(newHistoryRef, {
            date: new Date().toLocaleDateString(),

            time: new Date().toLocaleTimeString(),

            ...safeData,
          });

          // ✅ CHECK ALERTS
          const detectedAlerts =
            checkAlerts(safeData);

          setAlerts(detectedAlerts);

          // ✅ SAVE ALERT HISTORY
          if (detectedAlerts.length > 0) {
            detectedAlerts.forEach((msg) => {
              const alertRef = ref(
                db,
                "alertHistory"
              );

              const newAlertRef =
                push(alertRef);

              set(newAlertRef, {
                message: msg,

                date:
                  new Date().toLocaleDateString(),

                time:
                  new Date().toLocaleTimeString(),

                timestamp: Date.now(),
              });
            });
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            NEX VOLT MONITOR
          </h1>

          <p style={styles.subtitle}>
            Smart IoT Monitoring System
          </p>
        </div>

        <div style={styles.liveBadge}>
          🟢 LIVE
        </div>
      </div>

      {/* ALERTS */}
      {alerts.length > 0 && (
        <div style={styles.alertBox}>
          <h2>⚠ Active Alerts</h2>

          {alerts.map((alert, index) => (
            <p key={index}>{alert}</p>
          ))}
        </div>
      )}

      {/* SENSOR CARDS */}
      <div style={styles.grid}>
        <Card
          title="Voltage"
          value={data.voltage}
          unit="V"
          icon="⚡"
          color="#3b82f6"
        />

        <Card
          title="Current"
          value={data.current}
          unit="A"
          icon="🔌"
          color="#22c55e"
        />

        <Card
          title="Power"
          value={data.power}
          unit="W"
          icon="💡"
          color="#f59e0b"
        />

        <Card
          title="Energy"
          value={data.energy}
          unit="kWh"
          icon="📊"
          color="#a855f7"
        />

        <Card
          title="Water Flow"
          value={data.waterFlow}
          unit="L/min"
          icon="💧"
          color="#06b6d4"
        />

        <Card
          title="Water Level"
          value={data.waterLevel}
          unit="%"
          icon="🟦"
          color="#0ea5e9"
        />
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  unit,
  icon,
  color,
}) {
  return (
    <div
      style={{
        background:
          "rgba(255,255,255,0.08)",

        padding: "30px",

        borderRadius: "20px",

        backdropFilter: "blur(10px)",

        boxShadow: `0 0 15px ${color}`,

        border: `1px solid ${color}`,

        transition: "0.3s",
      }}
    >
      <div
        style={{
          fontSize: "40px",

          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#cbd5e1",

          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          fontSize: "38px",

          color,
        }}
      >
        {value} {unit}
      </h1>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",

    padding: "40px",

    background:
      "linear-gradient(to right, #0f172a, #1e293b)",

    color: "white",
  },

  header: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "40px",
  },

  title: {
    fontSize: "40px",

    marginBottom: "10px",
  },

  subtitle: {
    color: "#cbd5e1",

    fontSize: "18px",
  },

  liveBadge: {
    background: "#16a34a",

    padding: "10px 20px",

    borderRadius: "30px",

    fontWeight: "bold",

    boxShadow: "0 0 15px #16a34a",
  },

  alertBox: {
    background:
      "rgba(255,0,0,0.15)",

    border: "1px solid red",

    padding: "20px",

    borderRadius: "15px",

    marginBottom: "30px",

    boxShadow: "0 0 15px red",
  },

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",

    gap: "25px",
  },
};

export default Dashboard;