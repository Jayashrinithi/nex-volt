import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";

import {
  FaHistory,
  FaBolt,
  FaChargingStation,
  FaBatteryHalf,
  FaWater,
} from "react-icons/fa";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const historyRef = ref(db, "history");

    const unsubscribe = onValue(
      historyRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const formattedData =
            Object.keys(data).map((key) => ({
              id: key,
              voltage: data[key].voltage || 0,
              current: data[key].current || 0,
              power: data[key].power || 0,
              energy: data[key].energy || 0,
              waterFlow:
                data[key].waterFlow || 0,
              time:
                data[key].time || "--:--",
              date:
                data[key].date || "--/--/----",
            }));

          // NEWEST FIRST
          setHistory(
            formattedData.reverse()
          );
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>

      {/* TITLE */}
      <div style={styles.header}>
        <FaHistory
          size={35}
          color="cyan"
        />

        <h1 style={styles.title}>
          History Records
        </h1>
      </div>

      {/* TABLE */}
      <div style={styles.tableContainer}>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={thStyle}>
                Date
              </th>

              <th style={thStyle}>
                Time
              </th>

              <th style={thStyle}>
                <div style={styles.headIcon}>
                  <FaBolt />
                  Voltage
                </div>
              </th>

              <th style={thStyle}>
                <div style={styles.headIcon}>
                  <FaChargingStation />
                  Current
                </div>
              </th>

              <th style={thStyle}>
                <div style={styles.headIcon}>
                  <FaBolt />
                  Power
                </div>
              </th>

              <th style={thStyle}>
                <div style={styles.headIcon}>
                  <FaBatteryHalf />
                  Energy
                </div>
              </th>

              <th style={thStyle}>
                <div style={styles.headIcon}>
                  <FaWater />
                  Water Flow
                </div>
              </th>
            </tr>
          </thead>

          <tbody>

            {history.length > 0 ? (
              history.map((item) => (
                <tr
                  key={item.id}
                  style={styles.row}
                >
                  <td style={tdStyle}>
                    {item.date}
                  </td>

                  <td style={tdStyle}>
                    {item.time}
                  </td>

                  <td style={tdStyle}>
                    {item.voltage} V
                  </td>

                  <td style={tdStyle}>
                    {item.current} A
                  </td>

                  <td style={tdStyle}>
                    {item.power} W
                  </td>

                  <td style={tdStyle}>
                    {item.energy} kWh
                  </td>

                  <td style={tdStyle}>
                    {item.waterFlow} L/min
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={styles.noData}
                >
                  No History Data Found
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    paddingLeft: "90px",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    color: "white",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    fontSize: "36px",
  },

  tableContainer: {
    overflowX: "auto",
    borderRadius: "20px",
    background:
      "rgba(255,255,255,0.08)",

    boxShadow:
      "0 0 20px rgba(0,255,255,0.2)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  headIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  row: {
    transition: "0.3s",
  },

  noData: {
    padding: "30px",
    textAlign: "center",
    fontSize: "18px",
    color: "#cbd5e1",
  },
};

const thStyle = {
  padding: "20px",
  background: "#06b6d4",
  color: "#0f172a",
  fontSize: "16px",
};

const tdStyle = {
  padding: "18px",
  textAlign: "center",
  borderBottom:
    "1px solid rgba(255,255,255,0.1)",
};

export default History;