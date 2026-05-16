function SensorCard({
  title = "Sensor",
  value = 0,
  unit = "",
  color = "#06b6d4",
}) {
  // SAFE VALUE HANDLING
  const displayValue =
    value !== undefined && value !== null
      ? Number(value).toFixed(2)
      : "0.00";

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        borderLeft: `6px solid ${color}`,
        transition: "0.3s",
        minWidth: "150px",
      }}
    >
      <h3
        style={{
          marginBottom: "10px",
          color: "#555",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          fontSize: "32px",
          color: color,
          margin: 0,
        }}
      >
        {displayValue}{" "}
        <span style={{ fontSize: "16px", color: "#666" }}>
          {unit}
        </span>
      </h1>
    </div>
  );
}

export default SensorCard;