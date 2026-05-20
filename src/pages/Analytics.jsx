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
  ReferenceLine,
} from "recharts";

import {
  FaChartLine,
  FaBolt,
  FaWater,
  FaBatteryHalf,
  FaPlug,
  FaRulerVertical,
} from "react-icons/fa";

/* ================= ANALYTICS ================= */

function Analytics() {

  const [history, setHistory] = useState([]);

  const [chartKey, setChartKey] = useState(0);

  const [settings, setSettings] = useState({
    voltage: { min: 180, max: 250 },
    current: { min: 1, max: 10 },
    power: { max: 3000 },
    energy: { max: 50 },
    waterFlow: { min: 1, max: 20 },
    waterLevel: { min: 2, max: 18 },
  });

  // ================= LOAD SETTINGS =================

  useEffect(() => {

    const saved =
      JSON.parse(localStorage.getItem("settings"));

    if (saved) {

      setSettings(saved);
    }

  }, []);

  // ================= FIREBASE =================

  useEffect(() => {

    const historyRef = ref(db, "history");

    const unsubscribe = onValue(
      historyRef,
      (snapshot) => {

        const data = snapshot.val();

        if (!data) return;

        const formattedData =
          Object.keys(data).map((key) => ({

            id: key,

            voltage:
              Number(data[key].voltage || 0),

            current:
              Number(data[key].current || 0),

            power:
              Number(data[key].power || 0),

            energy:
              Number(data[key].energy || 0),

            waterFlow:
              Number(data[key].waterFlow || 0),

            waterLevel:
              Number(data[key].waterLevel || 0),

            time:
              data[key].time || "--:--",

            date:
              data[key].date || "",
          }));

        // latest first
        const sorted =
          formattedData.reverse();

        // only last 20 records
        const latest =
          sorted.slice(0, 20);

        setHistory(latest);

        // force animation
        setChartKey((prev) => prev + 1);
      }
    );

    return () => unsubscribe();

  }, []);

  // ================= SUMMARY =================

  const latest =
    history.length > 0
      ? history[0]
      : {};

  return (

    <div style={styles.container}>

      {/* ================= HEADER ================= */}

      <div style={styles.header}>

        <FaChartLine
          size={35}
          color="cyan"
        />

        <h1 style={styles.title}>
          Analytics Dashboard
        </h1>

      </div>

      {/* ================= SUMMARY CARDS ================= */}

      <div style={styles.summaryGrid}>

        <SummaryCard
          title="Voltage"
          value={`${latest.voltage || 0} V`}
          icon={<FaBolt />}
          glow="#00ffff"
        />

        <SummaryCard
          title="Current"
          value={`${latest.current || 0} A`}
          icon={<FaPlug />}
          glow="#22c55e"
        />

        <SummaryCard
          title="Power"
          value={`${latest.power || 0} W`}
          icon={<FaBatteryHalf />}
          glow="#f59e0b"
        />

        <SummaryCard
          title="Water Flow"
          value={`${latest.waterFlow || 0} L/min`}
          icon={<FaWater />}
          glow="#06b6d4"
        />

        <SummaryCard
          title="Water Level"
          value={`${latest.waterLevel || 0} cm`}
          icon={<FaRulerVertical />}
          glow="#14b8a6"
        />

      </div>

      {/* ================= VOLTAGE ================= */}

      <ChartCard
        title="Voltage Trend (V)"
        icon={<FaBolt />}
      >

        <LineChart
          key={chartKey}
          data={history}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            stroke="white"
          />

          <YAxis stroke="white" />

          <Tooltip />

          <Legend />

          <ReferenceLine
            y={settings.voltage.max}
            label="Max"
            stroke="red"
            strokeDasharray="3 3"
          />

          <ReferenceLine
            y={settings.voltage.min}
            label="Min"
            stroke="orange"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="voltage"
            stroke="#00ffff"
            strokeWidth={3}
            dot={false}
            animationDuration={800}
          />

        </LineChart>

      </ChartCard>

      {/* ================= CURRENT ================= */}

      <ChartCard
        title="Current Trend (A)"
        icon={<FaPlug />}
      >

        <LineChart
          key={chartKey + 1}
          data={history}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            stroke="white"
          />

          <YAxis stroke="white" />

          <Tooltip />

          <Legend />

          <ReferenceLine
            y={settings.current.max}
            label="Max"
            stroke="red"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="current"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
            animationDuration={800}
          />

        </LineChart>

      </ChartCard>

      {/* ================= POWER ================= */}

      <ChartCard
        title="Power Trend (W)"
        icon={<FaBatteryHalf />}
      >

        <LineChart
          key={chartKey + 2}
          data={history}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            stroke="white"
          />

          <YAxis stroke="white" />

          <Tooltip />

          <Legend />

          <ReferenceLine
            y={settings.power.max}
            label="Max"
            stroke="red"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="power"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            animationDuration={800}
          />

        </LineChart>

      </ChartCard>

      {/* ================= ENERGY ================= */}

      <ChartCard
        title="Energy Trend (kWh)"
        icon={<FaBatteryHalf />}
      >

        <LineChart
          key={chartKey + 3}
          data={history}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            stroke="white"
          />

          <YAxis stroke="white" />

          <Tooltip />

          <Legend />

          <ReferenceLine
            y={settings.energy.max}
            label="Max"
            stroke="red"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="energy"
            stroke="#a855f7"
            strokeWidth={3}
            dot={false}
            animationDuration={800}
          />

        </LineChart>

      </ChartCard>

      {/* ================= WATER FLOW ================= */}

      <ChartCard
        title="Water Flow Trend (L/min)"
        icon={<FaWater />}
      >

        <LineChart
          key={chartKey + 4}
          data={history}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            stroke="white"
          />

          <YAxis stroke="white" />

          <Tooltip />

          <Legend />

          <ReferenceLine
            y={settings.waterFlow.max}
            label="Max"
            stroke="red"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="waterFlow"
            stroke="#06b6d4"
            strokeWidth={3}
            dot={false}
            animationDuration={800}
          />

        </LineChart>

      </ChartCard>

      {/* ================= WATER LEVEL ================= */}

      <ChartCard
        title="Water Level Trend (cm)"
        icon={<FaRulerVertical />}
      >

        <LineChart
          key={chartKey + 5}
          data={history}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            stroke="white"
          />

          <YAxis stroke="white" />

          <Tooltip />

          <Legend />

          <ReferenceLine
            y={settings.waterLevel.max}
            label="Max"
            stroke="red"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="waterLevel"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={false}
            animationDuration={800}
          />

        </LineChart>

      </ChartCard>

    </div>
  );
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({
  title,
  value,
  icon,
  glow,
}) {

  return (

    <div
      style={{
        ...styles.summaryCard,
        boxShadow: `0 0 20px ${glow}`,
      }}
    >

      <div
        style={{
          ...styles.summaryIcon,
          background: glow,
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h2>{value}</h2>

    </div>
  );
}

/* ================= CHART CARD ================= */

function ChartCard({
  title,
  icon,
  children,
}) {

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
    alignItems: "center",
    gap: "15px",
    marginBottom: "35px",
  },

  title: {
    fontSize: "38px",
    margin: 0,
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  },

  summaryCard: {
    background: "rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "20px",
    textAlign: "center",
  },

  summaryIcon: {
    width: "55px",
    height: "55px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px auto",
    color: "#0f172a",
    fontSize: "22px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
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