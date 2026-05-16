import { useState } from "react";

import {
  FaDownload,
  FaFileAlt,
  FaCalendarAlt,
  FaClock,
  FaBolt,
  FaPlug,
  FaChartLine,
  FaTint,
} from "react-icons/fa";

function Reports() {
  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [fromTime, setFromTime] =
    useState("");

  const [toTime, setToTime] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleDownload = () => {
    if (
      !fromDate ||
      !toDate ||
      !fromTime ||
      !toTime
    ) {
      alert(
        "Please select all fields"
      );

      return;
    }

    setLoading(true);

    // SAMPLE VALUES
    const voltage = 230;

    const current = 1.2;

    const power = 250;

    const energy = 5.5;

    const waterFlow = 12;

    const energyCost = (
      energy * 8
    ).toFixed(2);

    // REPORT CONTENT
    const reportContent = `
========================================
 SMART IoT MULTIMETER REPORT
========================================

Generated On:
${new Date().toLocaleString()}

----------------------------------------
REPORT FILTER
----------------------------------------

From Date : ${fromDate}
To Date   : ${toDate}

From Time : ${fromTime}
To Time   : ${toTime}

========================================
 SENSOR DATA
========================================

⚡ Voltage      : ${voltage} V

🔌 Current      : ${current} A

💡 Power        : ${power} W

📈 Energy       : ${energy} kWh

💧 Water Flow   : ${waterFlow} L/min

💰 Energy Cost  : ₹${energyCost}

========================================
 SYSTEM STATUS
========================================

Status         : NORMAL
Relay Status   : ON
Alerts         : NONE

========================================
 NEX VOLT MONITOR
 SMART ENERGY MANAGEMENT SYSTEM
========================================
`;

    // CREATE FILE
    const blob = new Blob(
      [reportContent],
      {
        type: "text/plain",
      }
    );

    // CREATE LINK
    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download = `Smart_IOT_Report_${Date.now()}.txt`;

    // DOWNLOAD
    link.click();

    setLoading(false);

    alert(
      "✅ Report Downloaded Successfully"
    );
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            📄 Reports Center
          </h1>

          <p style={styles.subtitle}>
            Generate IoT Monitoring
            Reports
          </p>
        </div>

        <div style={styles.liveBadge}>
          📊 REPORT SYSTEM
        </div>
      </div>

      {/* REPORT CARD */}
      <div style={styles.card}>
        {/* FROM DATE */}
        <InputBox
          icon={<FaCalendarAlt />}
          title="From Date"
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(
              e.target.value
            )
          }
        />

        {/* TO DATE */}
        <InputBox
          icon={<FaCalendarAlt />}
          title="To Date"
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(
              e.target.value
            )
          }
        />

        {/* FROM TIME */}
        <InputBox
          icon={<FaClock />}
          title="From Time"
          type="time"
          value={fromTime}
          onChange={(e) =>
            setFromTime(
              e.target.value
            )
          }
        />

        {/* TO TIME */}
        <InputBox
          icon={<FaClock />}
          title="To Time"
          type="time"
          value={toTime}
          onChange={(e) =>
            setToTime(
              e.target.value
            )
          }
        />

        {/* SUMMARY */}
        <div style={styles.summaryBox}>
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            📈 Report Summary
          </h2>

          <SummaryRow
            icon={<FaBolt />}
            label="Voltage"
            value="230 V"
          />

          <SummaryRow
            icon={<FaPlug />}
            label="Current"
            value="1.2 A"
          />

          <SummaryRow
            icon={<FaChartLine />}
            label="Energy"
            value="5.5 kWh"
          />

          <SummaryRow
            icon={<FaTint />}
            label="Water Flow"
            value="12 L/min"
          />
        </div>

        {/* DOWNLOAD BUTTON */}
        <button
          onClick={handleDownload}
          style={styles.button}
        >
          <FaDownload
            style={{
              marginRight: "10px",
            }}
          />

          {loading
            ? "Generating..."
            : "Download Report"}
        </button>
      </div>
    </div>
  );
}

// INPUT BOX
function InputBox({
  icon,
  title,
  type,
  value,
  onChange,
}) {
  return (
    <div style={styles.inputGroup}>
      <label style={styles.label}>
        <span
          style={{
            marginRight: "10px",
          }}
        >
          {icon}
        </span>

        {title}
      </label>

      <input
        type={type}
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </div>
  );
}

// SUMMARY ROW
function SummaryRow({
  icon,
  label,
  value,
}) {
  return (
    <div style={styles.summaryRow}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {icon}

        <span>{label}</span>
      </div>

      <strong>{value}</strong>
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

  header: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "35px",
  },

  title: {
    fontSize: "42px",

    marginBottom: "10px",
  },

  subtitle: {
    color: "#cbd5e1",

    fontSize: "18px",
  },

  liveBadge: {
    background: "#06b6d4",

    padding: "12px 20px",

    borderRadius: "30px",

    fontWeight: "bold",

    boxShadow:
      "0 0 15px cyan",
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",

    padding: "35px",

    borderRadius: "20px",

    maxWidth: "650px",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 0 20px rgba(0,255,255,0.2)",
  },

  inputGroup: {
    marginBottom: "25px",
  },

  label: {
    display: "flex",

    alignItems: "center",

    marginBottom: "10px",

    fontSize: "17px",
  },

  input: {
    width: "100%",

    padding: "14px",

    borderRadius: "12px",

    border: "none",

    fontSize: "16px",

    background: "#e2e8f0",
  },

  summaryBox: {
    marginTop: "30px",

    marginBottom: "30px",

    background:
      "rgba(255,255,255,0.05)",

    padding: "25px",

    borderRadius: "15px",
  },

  summaryRow: {
    display: "flex",

    justifyContent:
      "space-between",

    marginBottom: "15px",

    borderBottom:
      "1px solid rgba(255,255,255,0.08)",

    paddingBottom: "10px",
  },

  button: {
    width: "100%",

    padding: "16px",

    background: "#06b6d4",

    border: "none",

    borderRadius: "12px",

    color: "white",

    fontSize: "18px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 15px cyan",
  },
};

export default Reports;