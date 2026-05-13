function SensorCard({ title, value, unit, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        borderLeft: `6px solid ${color}`,
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
        }}
      >
        {value} {unit}
      </h1>
    </div>
  );
}

export default SensorCard;