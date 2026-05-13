function History() {
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
        🕒 History Records
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 0 20px cyan",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Time</th>
            <th style={thStyle}>Voltage</th>
            <th style={thStyle}>Current</th>
            <th style={thStyle}>Power</th>
            <th style={thStyle}>Energy</th>
            <th style={thStyle}>Water Flow</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={tdStyle}>12/05/2026</td>
            <td style={tdStyle}>10:35 AM</td>
            <td style={tdStyle}>230 V</td>
            <td style={tdStyle}>1.2 A</td>
            <td style={tdStyle}>250 W</td>
            <td style={tdStyle}>5.5 kWh</td>
            <td style={tdStyle}>12 L/min</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "20px",
  background: "#06b6d4",
};

const tdStyle = {
  padding: "18px",
  textAlign: "center",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

export default History;