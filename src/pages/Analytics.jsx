import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const historyRef = ref(db, "history");

    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setHistory(formattedData);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Analytics Dashboard</h1>

      {/* Voltage Chart */}
      <ChartBox title="Voltage Trend (V)">
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="voltage" stroke="#3b82f6" />
        </LineChart>
      </ChartBox>

      {/* Current Chart */}
      <ChartBox title="Current Trend (A)">
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="current" stroke="#22c55e" />
        </LineChart>
      </ChartBox>

      {/* Power Chart */}
      <ChartBox title="Power Trend (W)">
        <LineChart data={history}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="power" stroke="#f59e0b" />
        </LineChart>
      </ChartBox>
      <ChartBox title="Energy Trend (kWh)">
  <LineChart data={history}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="energy" stroke="#a855f7" />
  </LineChart>
</ChartBox>
<ChartBox title="Water Flow Trend (L/min)">
  <LineChart data={history}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="waterFlow" stroke="#06b6d4" />
  </LineChart>
</ChartBox>
      <ChartBox title="Water Level Trend (%)">
  <LineChart data={history}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="waterLevel" stroke="#0ea5e9" />
  </LineChart>
</ChartBox>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div style={styles.card}>
      <h2 style={{ marginBottom: "15px" }}>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    color: "white",
  },
  title: {
    fontSize: "32px",
    marginBottom: "30px",
  },
  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "40px",
    borderRadius: "15px",
    marginBottom: "30px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 15px rgba(0,255,255,0.2)",
  },
};

export default Analytics;