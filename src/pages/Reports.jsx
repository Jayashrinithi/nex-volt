import { useState } from "react";

function Reports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  const handleDownload = () => {
    if (
      !fromDate ||
      !toDate ||
      !fromTime ||
      !toTime
    ) {
      alert("Please select all fields");
      return;
    }

    alert(
      `Downloading Report

From Date: ${fromDate}
To Date: ${toDate}

From Time: ${fromTime}
To Time: ${toTime}`
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        marginLeft: "80px",
        background:
          "linear-gradient(to right, #0f172a, #1e293b)",
        color: "white",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "40px",
        }}
      >
        📄 Reports Center
      </h1>

      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 0 20px cyan",
          maxWidth: "500px",
        }}
      >
        {/* FROM DATE */}
        <div style={{ marginBottom: "20px" }}>
          <label>From Date</label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* TO DATE */}
        <div style={{ marginBottom: "20px" }}>
          <label>To Date</label>

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* FROM TIME */}
        <div style={{ marginBottom: "20px" }}>
          <label>From Time</label>

          <input
            type="time"
            value={fromTime}
            onChange={(e) =>
              setFromTime(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* TO TIME */}
        <div style={{ marginBottom: "20px" }}>
          <label>To Time</label>

          <input
            type="time"
            value={toTime}
            onChange={(e) =>
              setToTime(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={handleDownload}
          style={buttonStyle}
        >
          Download Report
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "none",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  background: "cyan",
  border: "none",
  borderRadius: "12px",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 0 15px cyan",
};

export default Reports;