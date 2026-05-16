import { useEffect, useState } from "react";

import {
  ref,
  onValue,
} from "firebase/database";

import { db } from "../services/firebase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

import {
  FaBolt,
  FaPlug,
  FaChartLine,
  FaTint,
  FaBatteryHalf,
} from "react-icons/fa";

function Analytics() {
  const [history, setHistory] =
    useState([]);

  const [avgVoltage, setAvgVoltage] =
    useState(0);

  const [avgCurrent, setAvgCurrent] =
    useState(0);

  const [totalEnergy, setTotalEnergy] =
    useState(0);

  useEffect(() => {
    const historyRef = ref(
      db,
      "history"
    );

    const unsubscribe = onValue(
      historyRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const formattedData =
            Object.keys(data).map(
              (key) => ({
                id: key,
                ...data[key],
              })
            );

          setHistory(formattedData);

          // CALCULATIONS
          const voltageAvg =
            formattedData.reduce(
              (acc, item) =>
                acc +
                Number(
                  item.voltage || 0
                ),
              0
            ) /
            formattedData.length;

          const currentAvg =
            formattedData.reduce(
              (acc, item) =>
                acc +
                Number(
                  item.current || 0
                ),
              0
            ) /
            formattedData.length;

          const energySum =
            formattedData.reduce(
              (acc, item) =>
                acc +
                Number(
                  item.energy || 0
                ),
              0
            );

          setAvgVoltage(
            voltageAvg.toFixed(2)
          );

          setAvgCurrent(
            currentAvg.toFixed(2)
          );

          setTotalEnergy(
            energySum.toFixed(2)
          );
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
            📊 Smart Analytics
          </h1>

          <p style={styles.subtitle}>
            Real-Time IoT Data
            Visualization
          </p>
        </div>

        <div style={styles.liveBadge}>
          🟢 LIVE ANALYTICS
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div style={styles.summaryGrid}>
        <SummaryCard
          title="Avg Voltage"
          value={avgVoltage}
          unit="V"
          icon={<FaBolt />}
          color="#3b82f6"
        />

        <SummaryCard
          title="Avg Current"
          value={avgCurrent}
          unit="A"
          icon={<FaPlug />}
          color="#22c55e"
        />

        <SummaryCard
          title="Total Energy"
          value={totalEnergy}
          unit="kWh"
          icon={<FaBatteryHalf />}
          color="#a855f7"
        />

        <SummaryCard
          title="Records"
          value={history.length}
          unit=""
          icon={<FaChartLine />}
          color="#f59e0b"
        />
      </div>

      {/* VOLTAGE CHART */}
      <ChartBox
        title="⚡ Voltage Trend (V)"
      >
        <LineChart data={history}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="voltage"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ChartBox>

      {/* CURRENT CHART */}
      <ChartBox
        title="🔌 Current Trend (A)"
      >
        <LineChart data={history}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="current"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ChartBox>

      {/* POWER CHART */}
      <ChartBox
        title="💡 Power Trend (W)"
      >
        <AreaChart data={history}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="power"
            stroke="#f59e0b"
            fill="#f59e0b"
          />
        </AreaChart>
      </ChartBox>

      {/* ENERGY CHART */}
      <ChartBox
        title="📈 Energy Trend (kWh)"
      >
        <LineChart data={history}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="energy"
            stroke="#a855f7"
            strokeWidth={3}
          />
        </LineChart>
      </ChartBox>

      {/* WATER FLOW CHART */}
      <ChartBox
        title="💧 Water Flow Trend (L/min)"
      >
        <AreaChart data={history}>
          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="waterFlow"
            stroke="#06b6d4"
            fill="#06b6d4"
          />
        </AreaChart>
      </ChartBox>
    </div>
  );
}

// CHART BOX
function ChartBox({
  title,
  children,
}) {
  return (
    <div style={styles.card}>
      <h2 style={styles.chartTitle}>
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        {children}
      </ResponsiveContainer>
    </div>
  );
}

// SUMMARY CARD
function SummaryCard({
  title,
  value,
  unit,
  icon,
  color,
}) {
  return (
    <div
      style={{
        ...styles.summaryCard,

        border: `1px solid ${color}`,

        boxShadow: `0 0 15px ${color}`,
      }}
    >
      <div
        style={{
          fontSize: "35px",

          color,

          marginBottom: "15px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          color: "#cbd5e1",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          color,

          fontSize: "32px",
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

    padding: "35px",

    marginLeft: "80px",

    background:
      "linear-gradient(to right, #0f172a, #1e293b)",

    color: "white",
  },

  header: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "35px",
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

    padding: "12px 20px",

    borderRadius: "30px",

    fontWeight: "bold",

    boxShadow:
      "0 0 15px #16a34a",
  },

  summaryGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",

    gap: "25px",

    marginBottom: "35px",
  },

  summaryCard: {
    background:
      "rgba(255,255,255,0.08)",

    padding: "30px",

    borderRadius: "20px",

    backdropFilter: "blur(10px)",

    transition: "0.3s",
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",

    padding: "35px",

    borderRadius: "20px",

    marginBottom: "35px",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 0 15px rgba(0,255,255,0.2)",
  },

  chartTitle: {
    marginBottom: "20px",

    fontSize: "24px",
  },
};

export default Analytics;