function GraphCard({ title, value, unit, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        borderTop: `5px solid ${color}`,
      }}
    >
      <h3>{title}</h3>

      <h1>
        {value} {unit}
      </h1>
    </div>
  );
}

export default GraphCard;