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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const parseDateTime = (dateValue, timeValue) => {
    if (!dateValue || !timeValue) return null;

    const dateText = String(dateValue).trim();
    const timeText = String(timeValue).trim();

    if (
      dateText.includes("--") ||
      timeText.includes("--")
    ) {
      return null;
    }

    let year;
    let month;
    let day;

    if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateText)) {
      [year, month, day] = dateText.split("-").map(Number);
    } else if (/^\d{1,2}[-/]\d{1,2}[-/]\d{4}$/.test(dateText)) {
      [day, month, year] = dateText.split(/[-/]/).map(Number);
    } else {
      return null;
    }

    const timeMatch = timeText.match(
      /^(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?\s*(am|pm)?$/i
    );

    if (!timeMatch) return null;

    let hour = Number(timeMatch[1]);
    const minute = Number(timeMatch[2] || 0);
    const second = Number(timeMatch[3] || 0);
    const meridiem = timeMatch[4]?.toLowerCase();

    if (meridiem === "pm" && hour < 12) {
      hour += 12;
    }

    if (meridiem === "am" && hour === 12) {
      hour = 0;
    }

    const parsed = new Date(
      year,
      month - 1,
      day,
      hour,
      minute,
      second
    );

    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const validateDateRange = () => {
    if (!fromDate || !toDate || !fromTime || !toTime) {
      alert("Please select all fields");
      return null;
    }

    const fromDateTime = parseDateTime(fromDate, fromTime);
    const toDateTime = parseDateTime(toDate, toTime);

    if (!fromDateTime || !toDateTime) {
      alert("Please select a valid date and time range");
      return null;
    }

    if (fromDateTime > toDateTime) {
      alert("From date/time must be before To date/time");
      return null;
    }

    return {
      fromDateTime,
      toDateTime,
    };
  };

  /* ================= GENERATE REPORT ================= */

  const generateReport = async (fromDateTime, toDateTime) => {
    const historyRef = ref(db, "history");
    const snapshot = await get(historyRef);
    const data = snapshot.val();
    console.log("Firebase data:", data);
console.log("From:", fromDateTime);
console.log("To:", toDateTime);
    const reportData = data ? Object.values(data) : [];

    /* ================= FILTER ================= */

    const filtered = reportData.filter((item) => {
      const itemDateTime = parseDateTime(item.date, item.time);
console.log("All Data:", reportData);
console.log("Filtered Data:", filtered);
      return (
        itemDateTime &&
        itemDateTime >= fromDateTime &&
        itemDateTime <= toDateTime
      );
    });

    /* ================= CALCULATIONS ================= */

    const totalVoltage = filtered.reduce(
      (sum, item) => sum + Number(item.voltage || 0),
      0
    );

    const totalCurrent = filtered.reduce(
      (sum, item) => sum + Number(item.current || 0),
      0
    );

    const totalPower = filtered.reduce(
      (sum, item) => sum + Number(item.power || 0),
      0
    );

    const totalEnergy = filtered.reduce(
      (sum, item) => sum + Number(item.energy || 0),
      0
    );

    const avgVoltage =
      filtered.length > 0 ? (totalVoltage / filtered.length).toFixed(2) : "0";

    const avgCurrent =
      filtered.length > 0 ? (totalCurrent / filtered.length).toFixed(2) : "0";

    const avgPower =
      filtered.length > 0 ? (totalPower / filtered.length).toFixed(2) : "0";

    return {
      filtered,
      avgVoltage,
      avgCurrent,
      avgPower,
      totalEnergy,
    };
  };

  const getReport = async () => {
    const dateRange = validateDateRange();
    if (!dateRange) return null;

    const report = await generateReport(
      dateRange.fromDateTime,
      dateRange.toDateTime
    );

    if (report.filtered.length === 0) {
      alert("No history records found for this date/time range");
      return null;
    }

    return report;
  };

  /* ================= TXT DOWNLOAD ================= */

  const handleDownloadTXT = async () => {
    setLoading(true);

    try {
      const report = await getReport();
      if (!report) return;

      const { filtered, avgVoltage, avgCurrent, avgPower, totalEnergy } =
        report;

      const reportContent = `

==========================================
        NEX VOLT SMART REPORT
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

      setPreview(reportContent);

      const blob = new Blob([reportContent], {
        type: "text/plain",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "NexVolt_Report.txt";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.log(error);
      alert("Error generating TXT report");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PDF DOWNLOAD ================= */

  const handleDownloadPDF = async () => {
    setLoading(true);

    try {
      const report = await getReport();
      if (!report) return;

      const { filtered, avgVoltage, avgCurrent, avgPower, totalEnergy } =
        report;

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
        head: [
          [
            "Date",
            "Time",
            "Voltage",
            "Current",
            "Power",
            "Energy",
            "Water Flow",
            "Water Level",
          ],
        ],
        body: filtered.map((item) => [
          item.date || "",
          item.time || "",
          `${item.voltage || 0} V`,
          `${item.current || 0} A`,
          `${item.power || 0} W`,
          `${item.energy || 0} kWh`,
          `${item.waterFlow || 0} L/min`,
          `${item.waterLevel || 0} cm`,
        ]),
      });

      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      doc.save(`NexVolt_Report_${timestamp}.pdf`);
    } catch (error) {
      console.log(error);
      alert("Error generating PDF report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* ================= HEADER ================= */}

      <div style={styles.header}>
        <FaChartBar size={35} color="cyan" />

        <h1 style={styles.title}>Reports Center</h1>
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
            onChange={(e) => setFromDate(e.target.value)}
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
            onChange={(e) => setToDate(e.target.value)}
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
            onChange={(e) => setFromTime(e.target.value)}
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
            onChange={(e) => setToTime(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* TXT BUTTON */}

        <button
          onClick={handleDownloadTXT}
          style={styles.button}
          disabled={loading}
        >
          <FaFileDownload />

          {loading ? "Generating..." : "Download TXT Report"}
        </button>

        {/* PDF BUTTON */}

        <button
          onClick={handleDownloadPDF}
          style={{
            ...styles.button,
            marginTop: "15px",
            background: "#ef4444",
          }}
          disabled={loading}
        >
          <FaFilePdf />

          {loading ? "Generating..." : "Download PDF Report"}
        </button>
      </div>

      {/* ================= PREVIEW ================= */}

      {preview && (
        <div style={styles.previewCard}>
          <h2 style={styles.previewTitle}>Report Preview</h2>

          <pre style={styles.preview}>{preview}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(to right, #0f172a, #1e293b)",
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
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 20px rgba(0,255,255,0.25)",
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
    background: "rgba(255,255,255,0.08)",
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
