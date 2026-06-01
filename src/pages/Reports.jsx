import { useState } from "react";

import { ref, get } from "firebase/database";

import { db } from "../services/firebase";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  FaFileDownload,
  FaCalendarAlt,
  FaClock,
  FaChartBar,
  FaFilePdf,
} from "react-icons/fa";

/* ================= REPORTS ================= */

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

  const [preview, setPreview] =
    useState("");

  /* ================= GENERATE REPORT ================= */

  const generateReport = async () => {

    const historyRef =
      ref(db, "history");

    const snapshot =
      await get(historyRef);

    const data =
      snapshot.val();

    let reportData = [];

    if (data) {

      reportData =
        Object.values(data);
    }

    /* ================= FILTER ================= */

    const fromDateTime =
      new Date(
        `${fromDate}T${fromTime}`
      );

    const toDateTime =
      new Date(
        `${toDate}T${toTime}`
      );

    const filtered =
      reportData.filter((item) => {

        if (!item.date || !item.time)
          return false;

        const itemDateTime =
          new Date(
            `${item.date}T${item.time}`
          );

        return (
          itemDateTime >= fromDateTime &&
          itemDateTime <= toDateTime
        );
      });

    /* ================= CALCULATIONS ================= */

    const totalVoltage =
      filtered.reduce(
        (sum, item) =>
          sum + Number(item.voltage || 0),
        0
      );

    const totalCurrent =
      filtered.reduce(
        (sum, item) =>
          sum + Number(item.current || 0),
        0
      );

    const totalPower =
      filtered.reduce(
        (sum, item) =>
          sum + Number(item.power || 0),
        0
      );

    const totalEnergy =
      filtered.reduce(
        (sum, item) =>
          sum + Number(item.energy || 0),
        0
      );

    const avgVoltage =
      filtered.length > 0
        ? (
            totalVoltage /
            filtered.length
          ).toFixed(2)
        : 0;

    const avgCurrent =
      filtered.length > 0
        ? (
            totalCurrent /
            filtered.length
          ).toFixed(2)
        : 0;

    const avgPower =
      filtered.length > 0
        ? (
            totalPower /
            filtered.length
          ).toFixed(2)
        : 0;

    return {
      filtered,
      avgVoltage,
      avgCurrent,
      avgPower,
      totalEnergy,
    };
  };

  /* ================= TXT DOWNLOAD ================= */

  const handleDownloadTXT = async () => {

    if (
      !fromDate ||
      !toDate ||
      !fromTime ||
      !toTime
    ) {

      alert("⚠ Please select all fields");

      return;
    }

    setLoading(true);

    try {

      const {
        filtered,
        avgVoltage,
        avgCurrent,
        avgPower,
        totalEnergy,
      } = await generateReport();

      const reportContent = `

==========================================
        ⚡ NEX VOLT SMART REPORT
==========================================

FROM:
${fromDate} ${fromTime}

TO:
${toDate} ${toTime}

==========================================

TOTAL RECORDS:
${filtered.length}

AVERAGE VOLTAGE:
${avgVoltage} V

AVERAGE CURRENT:
${avgCurrent} A

AVERAGE POWER:
${avgPower} W

TOTAL ENERGY:
${totalEnergy.toFixed(3)} kWh

==========================================
`;

      setPreview(
        reportContent
      );

      const blob = new Blob(
        [reportContent],
        {
          type: "text/plain",
        }
      );

      const link =
        document.createElement("a");

      link.href =
        URL.createObjectURL(blob);

      link.download =
        "NexVolt_Report.txt";

      link.click();

    } catch (error) {

      console.log(error);

      alert(
        "❌ Error generating TXT report"
      );
    }

    setLoading(false);
  };

  /* ================= PDF DOWNLOAD ================= */

  const handleDownloadPDF = async () => {

    if (
      !fromDate ||
      !toDate ||
      !fromTime ||
      !toTime
    ) {

      alert("⚠ Please select all fields");

      return;
    }

    setLoading(true);

    try {

      const {
        filtered,
        avgVoltage,
        avgCurrent,
        avgPower,
        totalEnergy,
      } = await generateReport();

      /* ================= PDF ================= */
      const doc = new jsPDF();

doc.setFontSize(20);
doc.text("NEX VOLT SMART REPORT", 14, 20);

doc.setFontSize(12);
doc.text(`FROM: ${fromDate} ${fromTime}`, 14, 35);
doc.text(`TO: ${toDate} ${toTime}`, 14, 45);
doc.text(`TOTAL RECORDS: ${filtered.length}`, 14, 60);
doc.text(`AVG VOLTAGE: ${avgVoltage} V`, 14, 70);
doc.text(`AVG CURRENT: ${avgCurrent} A`, 14, 80);
doc.text(`AVG POWER: ${avgPower} W`, 14, 90);
doc.text(`TOTAL ENERGY: ${totalEnergy.toFixed(3)} kWh`, 14, 100);

autoTable(doc, {
  startY: 115,
  head: [[
    "Date",
    "Time",
    "Voltage",
    "Current",
    "Power",
    "Energy",
    "Water Flow",
    "Water Level",
  ]],
  body: filtered.map((item) => [
    item.date,
    item.time,
    `${item.voltage} V`,
    `${item.current} A`,
    `${item.power} W`,
    `${item.energy} kWh`,
    `${item.waterFlow || 0} L/min`,
    `${item.waterLevel || 0} cm`,
  ]),
});

doc.save(`NexVolt_Report_${timestamp}.pdf`);
      

      doc.setFontSize(20);

      doc.text(
        "NEX VOLT SMART REPORT",
        14,
        20
      );

      doc.setFontSize(12);

      doc.text(
        `FROM: ${fromDate} ${fromTime}`,
        14,
        35
      );

      doc.text(
        `TO: ${toDate} ${toTime}`,
        14,
        45
      );

      doc.text(
        `TOTAL RECORDS: ${filtered.length}`,
        14,
        60
      );

      doc.text(
        `AVG VOLTAGE: ${avgVoltage} V`,
        14,
        70
      );

      doc.text(
        `AVG CURRENT: ${avgCurrent} A`,
        14,
        80
      );

      doc.text(
        `AVG POWER: ${avgPower} W`,
        14,
        90
      );

      doc.text(
        `TOTAL ENERGY: ${totalEnergy.toFixed(
          3
        )} kWh`,
        14,
        100
      );

      /* ================= TABLE ================= */

      autoTable(doc, {
        startY: 115,

        head: [[
          "Date",
          "Time",
          "Voltage",
          "Current",
          "Power",
          "Energy",
          "Water Flow",
          "Water Level",
        ]],

        body: filtered.map(
          (item) => [
            item.date,
            item.time,
            `${item.voltage} V`,
            `${item.current} A`,
            `${item.power} W`,
            `${item.energy} kWh`,
            `${item.waterFlow || 0} L/min`,
            `${item.waterLevel || 0} cm`,
          ]
        ),
      });
const getStats = (items, key) => {
  const values = items
    .map((item) => Number(item[key] || 0))
    .filter((value) => !Number.isNaN(value));

  if (values.length === 0) {
    return {
      min: 0,
      max: 0,
      avg: 0,
    };
  }

  return {
    min: Math.min(...values),
    max: Math.max(...values),
    avg:
      values.reduce((sum, value) => sum + value, 0) /
      values.length,
  };
};
      const timestamp =
        new Date()
          .toISOString()
          .replace(/[:.]/g, "-");

      doc.save(
        `NexVolt_Report_${timestamp}.pdf`
      );

    } catch (error) {

      console.log(error);

      alert(
        "❌ Error generating PDF report"
      );
    }

    setLoading(false);
  };

  return (

    <div style={styles.container}>

      {/* ================= HEADER ================= */}

      <div style={styles.header}>

        <FaChartBar
          size={35}
          color="cyan"
        />

        <h1 style={styles.title}>
          Reports Center
        </h1>

      </div>

      {/* ================= CARD ================= */}

      <div style={styles.card}>

        {/* FROM DATE */}

        <div style={styles.inputGroup}>

          <label style={styles.label}>
            <FaCalendarAlt />
            From Date
          </label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(
                e.target.value
              )
            }
            style={styles.input}
          />

        </div>

        {/* TO DATE */}

        <div style={styles.inputGroup}>

          <label style={styles.label}>
            <FaCalendarAlt />
            To Date
          </label>

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(
                e.target.value
              )
            }
            style={styles.input}
          />

        </div>

        {/* FROM TIME */}

        <div style={styles.inputGroup}>

          <label style={styles.label}>
            <FaClock />
            From Time
          </label>

          <input
            type="time"
            value={fromTime}
            onChange={(e) =>
              setFromTime(
                e.target.value
              )
            }
            style={styles.input}
          />

        </div>

        {/* TO TIME */}

        <div style={styles.inputGroup}>

          <label style={styles.label}>
            <FaClock />
            To Time
          </label>

          <input
            type="time"
            value={toTime}
            onChange={(e) =>
              setToTime(
                e.target.value
              )
            }
            style={styles.input}
          />

        </div>

        {/* TXT BUTTON */}

        <button
          onClick={handleDownloadTXT}
          style={styles.button}
        >

          <FaFileDownload />

          {loading
            ? "Generating..."
            : "Download TXT Report"}

        </button>

        {/* PDF BUTTON */}

        <button
          onClick={handleDownloadPDF}
          style={{
            ...styles.button,
            marginTop: "15px",
            background: "#ef4444",
          }}
        >

          <FaFilePdf />

          Download PDF Report

        </button>

      </div>

      {/* ================= PREVIEW ================= */}

      {preview && (

        <div style={styles.previewCard}>

          <h2 style={styles.previewTitle}>
            📄 Report Preview
          </h2>

          <pre style={styles.preview}>
            {preview}
          </pre>

        </div>

      )}

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
    alignItems: "center",
    gap: "15px",
    marginBottom: "35px",
  },

  title: {
    fontSize: "40px",
    margin: 0,
  },

  card: {
    maxWidth: "650px",
    background:
      "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    boxShadow:
      "0 0 20px rgba(0,255,255,0.25)",
    marginBottom: "30px",
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    fontSize: "16px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "12px",
    background: "#06b6d4",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  previewCard: {
    background:
      "rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
  },

  previewTitle: {
    marginBottom: "20px",
  },

  preview: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.7",
    fontSize: "14px",
    overflowX: "auto",
  },
};

export default Reports;