import { useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../services/firebase";

function Reports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!fromDate || !toDate || !fromTime || !toTime) {
      alert("Please select all fields");
      return;
    }

    setLoading(true);

    try {
      const historyRef = ref(db, "history");
      const snapshot = await get(historyRef);
      const data = snapshot.val();

      let reportData = [];

      if (data) {
        reportData = Object.values(data);
      }

      const reportContent = `
NEX VOLT REPORT

FROM: ${fromDate} ${fromTime}
TO: ${toDate} ${toTime}

----------------------------
TOTAL RECORDS: ${reportData.length}

SAMPLE DATA:
${reportData.slice(0, 5).map(item => `
Voltage: ${item.voltage}
Current: ${item.current}
Power: ${item.power}
Energy: ${item.energy}
Water Flow: ${item.waterFlow}
----------------------------
`).join("\n")}
`;

      const blob = new Blob([reportContent], {
        type: "text/plain",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "NexVolt_Report.txt";
      link.click();

    } catch (error) {
      alert("Error generating report");
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📄 Reports Center</h1>

      <div style={styles.card}>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={styles.input} />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={styles.input} />
        <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} style={styles.input} />
        <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} style={styles.input} />

        <button onClick={handleDownload} style={styles.button}>
          {loading ? "Generating..." : "Download Report"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    color: "white",
    marginLeft: "80px",
  },

  title: {
    fontSize: "40px",
    marginBottom: "30px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 20px cyan",
    maxWidth: "500px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
  },

  button: {
    width: "100%",
    padding: "15px",
    background: "cyan",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Reports;