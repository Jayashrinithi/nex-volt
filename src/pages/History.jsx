import { useEffect, useState } from "react";

import {
  ref,
  onValue,
} from "firebase/database";

import { db } from "../services/firebase";

import {
  FaHistory,
  FaBolt,
  FaPlug,
  FaChartLine,
  FaTint,
  FaSearch,
} from "react-icons/fa";

function History() {
  const [history, setHistory] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const historyRef = ref(
      db,
      "history"
    );

    const unsubscribe = onValue(
      historyRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const formattedData =
            Object.keys(data)
              .map((key) => ({
                id: key,
                ...data[key],
              }))
              .reverse();

          setHistory(formattedData);
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // FILTER SEARCH
  const filteredHistory =
    history.filter((item) =>
      item.date
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            <FaHistory
              style={{
                marginRight: "12px",
              }}
            />
            History Records
          </h1>

          <p style={styles.subtitle}>
            Real-Time IoT Monitoring
            Logs
          </p>
        </div>

        <div style={styles.liveBadge}>
          📊 LIVE HISTORY
        </div>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBox}>
        <FaSearch
          style={{
            marginRight: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Search by date..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={styles.searchInput}
        />
      </div>

      {/* TOTAL RECORDS */}
      <div style={styles.recordBox}>
        Total Records:
        {filteredHistory.length}
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
                <FaBolt /> Voltage
              </th>

              <th style={thStyle}>
                <FaPlug /> Current
              </th>

              <th style={thStyle}>
                ⚡ Power
              </th>

              <th style={thStyle}>
                <FaChartLine />
                Energy
              </th>

              <th style={thStyle}>
                <FaTint />
                Water Flow
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  style={tdStyle}
                >
                  Loading History...
                </td>
              </tr>
            ) : filteredHistory.length >
              0 ? (
              filteredHistory.map(
                (item, index) => (
                  <tr
                    key={index}
                    style={{
                      transition:
                        "0.3s",
                    }}
                  >
                    <td style={tdStyle}>
                      {item.date}
                    </td>

                    <td style={tdStyle}>
                      {item.time}
                    </td>

                    <td style={tdStyle}>
                      {
                        item.voltage
                      }{" "}
                      V
                    </td>

                    <td style={tdStyle}>
                      {
                        item.current
                      }{" "}
                      A
                    </td>

                    <td style={tdStyle}>
                      {item.power} W
                    </td>

                    <td style={tdStyle}>
                      {
                        item.energy
                      }{" "}
                      kWh
                    </td>

                    <td style={tdStyle}>
                      {
                        item.waterFlow
                      }{" "}
                      L/min
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="7"
                  style={tdStyle}
                >
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = {
  padding: "18px",

  background: "#06b6d4",

  color: "white",

  fontSize: "16px",

  textAlign: "center",
};

const tdStyle = {
  padding: "16px",

  textAlign: "center",

  borderBottom:
    "1px solid rgba(255,255,255,0.1)",

  color: "#e2e8f0",
};

const styles = {
  container: {
    minHeight: "100vh",

    padding: "35px",

    marginLeft: "80px",

    background:
      "linear-gradient(to right, #0f172a, #1e293b)",

    color: "white",
  },

  header: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "30px",
  },

  title: {
    fontSize: "40px",

    marginBottom: "10px",

    display: "flex",

    alignItems: "center",
  },

  subtitle: {
    color: "#cbd5e1",

    fontSize: "18px",
  },

  liveBadge: {
    background: "#06b6d4",

    padding: "12px 20px",

    borderRadius: "30px",

    fontWeight: "bold",

    boxShadow:
      "0 0 15px cyan",
  },

  searchBox: {
    display: "flex",

    alignItems: "center",

    background:
      "rgba(255,255,255,0.08)",

    padding: "15px 20px",

    borderRadius: "15px",

    marginBottom: "20px",

    maxWidth: "400px",

    boxShadow:
      "0 0 10px rgba(0,255,255,0.2)",
  },

  searchInput: {
    flex: 1,

    background: "transparent",

    border: "none",

    outline: "none",

    color: "white",

    fontSize: "16px",
  },

  recordBox: {
    marginBottom: "20px",

    fontSize: "18px",

    color: "#cbd5e1",
  },

  tableContainer: {
    overflowX: "auto",

    borderRadius: "20px",

    boxShadow:
      "0 0 20px rgba(0,255,255,0.2)",
  },

  table: {
    width: "100%",

    borderCollapse: "collapse",

    background:
      "rgba(255,255,255,0.08)",

    overflow: "hidden",
  },
};

export default History;