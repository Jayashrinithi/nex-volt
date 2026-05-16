import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  FaChartLine,
  FaBolt,
  FaWater,
  FaBatteryHalf,
} from "react-icons/fa";

function Analytics() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const historyRef = ref(db, "history");

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          voltage: Number(data[key].voltage || 0),
          current: Number(data[key].current || 0),
          power: Number(data[key].power || 0),
          energy: Number(data[key].energy || 0),
          waterFlow: Number(data[key].waterFlow || 0),
          time: data[key].time || "--:--",
          date: data[key].date || "",
        }));

        setHistory(formattedData.reverse());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>

      {/* TITLE */}
      <div style={styles.header}>
        <FaChartLine size={35} color="cyan" />

        <h1 style={styles.title}>
          Analytics Dashboard
        </h1>
      </div>

      {/* VOLTAGE */}
      <ChartCard
        title="Voltage Trend (V)"
        icon={<FaBolt />}
      >
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="voltage"
            stroke="#00ffff"
            strokeWidth={3}
          />
        </LineChart>
      </ChartCard>

      {/* CURRENT */}
      <ChartCard
        title="Current Trend (A)"
        icon={<FaBolt />}
      >
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="current"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ChartCard>

      {/* POWER */}
      <ChartCard
        title="Power Trend (W)"
        icon={<FaBatteryHalf />}
      >
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="power"
            stroke="#f59e0b"
            strokeWidth={3}
          />
        </LineChart>
      </ChartCard>

      {/* ENERGY */}
      <ChartCard
        title="Energy Trend (kWh)"
        icon={<FaBatteryHalf />}
      >
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="energy"
            stroke="#a855f7"
            strokeWidth={3}
          />
        </LineChart>
      </ChartCard>

      {/* WATER FLOW */}
      <ChartCard
        title="Water Flow Trend (L/min)"
        icon={<FaWater />}
      >
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="waterFlow"
            stroke="#06b6d4"
            strokeWidth={3}
          />
        </LineChart>
      </ChartCard>
    </div>
  );
}

/* CHART CARD */
function ChartCard({ title, icon, children }) {
  return (
    <div style={styles.card}>

      <div style={styles.cardHeader}>
        <div style={styles.iconBox}>
          {icon}
        </div>

        <h2 style={styles.cardTitle}>
          {title}
        </h2>
      </div>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        {children}
      </ResponsiveContainer>
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

  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "35px",
  },

  title: {
    fontSize: "36px",
    margin: 0,
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",

    padding: "30px",

    borderRadius: "20px",

    marginBottom: "35px",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 0 20px rgba(0,255,255,0.2)",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },

  iconBox: {
    width: "45px",
    height: "45px",
    borderRadius: "12px",
    background: "cyan",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    boxShadow: "0 0 15px cyan",
  },

  cardTitle: {
    margin: 0,
    fontSize: "24px",
  },
};

export default Analytics;