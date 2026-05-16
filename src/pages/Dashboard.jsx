import { useEffect, useState } from "react";

import {
  ref,
  onValue,
  push,
  set,
} from "firebase/database";

import {
  FaBolt,
  FaPlug,
  FaTint,
  FaChartLine,
  FaPowerOff,
} from "react-icons/fa";

import { db } from "../services/firebase";
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

  const [time, setTime] = useState(
    new Date()
  );

  const [relay, setRelayState] =
    useState("OFF");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          };

          setData(safeData);

          setLoading(false);

          const newHistoryRef =
            push(historyRef);

          set(newHistoryRef, {
            date:
              new Date().toLocaleDateString(),

            time:
              new Date().toLocaleTimeString(),

            ...safeData,
          });

          const detectedAlerts =
            checkAlerts(safeData);

          setAlerts(detectedAlerts);

          if (safeData.voltage > 250) {
            relayControl("OFF");
          }
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const relayControl = (state) => {
    setRelayState(state);

    set(ref(db, "relay"), {
      status: state,
    });
  };

  const getVoltageStatus = () => {
    if (data.voltage > 250)
      return "🔴 HIGH";

    if (data.voltage < 180)
      return "🟡 LOW";

    return "🟢 NORMAL";
  };

  const energyCost = (
    data.energy * 8
  ).toFixed(2);

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading Data...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            SMART IOT MULTIMETER
          </h1>

          <p style={styles.subtitle}>
            Industrial Energy Monitoring
            System
          </p>
        </div>

        <div>
          <div style={styles.liveBadge}>
            🟢 LIVE
          </div>

          <p style={styles.clock}>
            {time.toLocaleString()}
          </p>
        </div>
      </div>

      <div style={styles.statusBox}>
        Voltage Status:
        {getVoltageStatus()}
      </div>

      {alerts.length > 0 && (
        <div style={styles.alertBox}>
          <h2>⚠ Active Alerts</h2>

          {alerts.map((alert, index) => (
            <p key={index}>{alert}</p>
          ))}
        </div>
      )}

      <div style={styles.grid}>
        <Card
          title="Voltage"
          value={data.voltage}
          unit="V"
          icon={<FaBolt />}
          color="#3b82f6"
        />

        <Card
          title="Current"
          value={data.current}
          unit="A"
          icon={<FaPlug />}
          color="#22c55e"
        />

        <Card
          title="Power"
          value={data.power}
          unit="W"
          icon={<FaPowerOff />}
          color="#f59e0b"
        />

        <Card
          title="Energy"
          value={data.energy}
          unit="kWh"
          icon={<FaChartLine />}
          color="#a855f7"
        />

        <Card
          title="Water Flow"
          value={data.waterFlow}
          unit="L/min"
          icon={<FaTint />}
          color="#06b6d4"
        />

        <Card
          title="Energy Cost"
          value={energyCost}
          unit="₹"
          icon="💰"
          color="#14b8a6"
        />
      </div>

      <div style={styles.relayBox}>
        <h2>Relay Control</h2>

        <p>
          Current State:
          {relay}
        </p>

        <button
          style={styles.onButton}
          onClick={() => relayControl("ON")}
        >
          TURN ON
        </button>

        <button
          style={styles.offButton}
          onClick={() => relayControl("OFF")}
        >
          TURN OFF
        </button>
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

          color,
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

    marginLeft: "80px",

    background:
      "linear-gradient(to right, #0f172a, #1e293b)",

    color: "white",
  },

  loading: {
    height: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "30px",

    background: "#020617",

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

  clock: {
    marginTop: "10px",

    fontSize: "16px",
  },

  statusBox: {
    background: "#111827",

    padding: "15px",

    borderRadius: "15px",

    marginBottom: "20px",

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

  relayBox: {
    marginTop: "40px",

    background:
      "rgba(255,255,255,0.08)",

    padding: "30px",

    borderRadius: "20px",
  },

  onButton: {
    padding: "15px 25px",

    marginRight: "20px",

    background: "#22c55e",

    border: "none",

    borderRadius: "10px",

    color: "white",

    cursor: "pointer",
  },

  offButton: {
    padding: "15px 25px",

    background: "#ef4444",

    border: "none",

    borderRadius: "10px",

    color: "white",

    cursor: "pointer",
  },
};

export default Dashboard;