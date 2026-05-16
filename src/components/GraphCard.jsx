function GraphCard({
  title = "No Title",
  value = 0,
  unit = "",
  color = "#06b6d4",
}) {
  // FORMAT VALUE SAFELY
  const displayValue =
    value !== undefined && value !== null
      ? Number(value).toFixed(2)
      : "0.00";

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        borderTop: `5px solid ${color}`,
        minWidth: "150px",
        transition: "0.3s",
      }}
    >
      <h3 style={{ marginBottom: "10px", color: "#333" }}>
        {title}
      </h3>

      <h1 style={{ color }}>
        {displayValue}{" "}
        <span style={{ fontSize: "18px", color: "#666" }}>
          {unit}
        </span>
      </h1>
    </div>
  );
}

export default GraphCard;