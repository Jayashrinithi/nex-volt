import { useEffect, useState } from "react";

import { ref, onValue } from "firebase/database";

import { db } from "../services/firebase";

import {
  FaHistory,
  FaBolt,
  FaChargingStation,
  FaBatteryHalf,
  FaWater,
  FaSearch,
  FaDownload,
  FaTrash,
  FaRulerVertical,
} from "react-icons/fa";

/* ================= HISTORY ================= */

function History() {

  const [history, setHistory] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filtered, setFiltered] =
    useState([]);

  // ================= FIREBASE =================

  useEffect(() => {

    const historyRef =
      ref(db, "history");

    const unsubscribe = onValue(
      historyRef,
      (snapshot) => {

        const data =
          snapshot.val();

        if (data) {

          const formattedData =
            Object.keys(data).map(
              (key) => ({

                id: key,

                voltage:
                  Number(
                    data[key].voltage || 0
                  ),

                current:
                  Number(
                    data[key].current || 0
                  ),

                power:
                  Number(
                    data[key].power || 0
                  ),

                energy:
                  Number(
                    data[key].energy || 0
                  ),

                waterFlow:
                  Number(
                    data[key]
                      .waterFlow || 0
                  ),

                waterLevel:
                  Number(
                    data[key]
                      .waterLevel || 0
                  ),

                time:
                  data[key].time ||
                  "--:--",

                date:
                  data[key].date ||
                  "--/--/----",
              })
            );

          const reversed =
            formattedData.reverse();

          setHistory(reversed);

          setFiltered(reversed);
        }
      }
    );

    return () => unsubscribe();

  }, []);

  // ================= SEARCH =================

  useEffect(() => {

    const result =
      history.filter((item) => {

        const text =
          `
          ${item.date}
          ${item.time}
          ${item.voltage}
          ${item.current}
          ${item.power}
          ${item.energy}
          ${item.waterFlow}
          ${item.waterLevel}
          `
            .toLowerCase();

        return text.includes(
          search.toLowerCase()
        );
      });

    setFiltered(result);

  }, [search, history]);

  // ================= EXPORT CSV =================

  const exportCSV = () => {

    if (filtered.length === 0) {

      alert("No data to export");

      return;
    }

    const headers =
      [
        "Date",
        "Time",
        "Voltage",
        "Current",
        "Power",
        "Energy",
        "WaterFlow",
        "WaterLevel",
      ].join(",");

    const rows =
      filtered.map((item) =>
        [
          item.date,
          item.time,
          item.voltage,
          item.current,
          item.power,
          item.energy,
          item.waterFlow,
          item.waterLevel,
        ].join(",")
      );

    const csv =
      [headers, ...rows].join("\n");

    const blob =
      new Blob([csv], {
        type: "text/csv",
      });

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      "NexVolt_History.csv";

    link.click();
  };

  // ================= CLEAR HISTORY =================

  const clearLocalHistory = () => {

    if (
      window.confirm(
        "Clear displayed history?"
      )
    ) {

      setFiltered([]);

      setHistory([]);
    }
  };

  return (

    <div style={styles.container}>

      {/* ================= HEADER ================= */}

      <div style={styles.header}>

        <div style={styles.titleBox}>

          <FaHistory
            size={35}
            color="cyan"
          />

          <h1 style={styles.title}>
            History Records
          </h1>

        </div>

        <div style={styles.totalBox}>

          Total Records:
          <span style={styles.total}>
            {filtered.length}
          </span>

        </div>

      </div>

      {/* ================= ACTION BAR ================= */}

      <div style={styles.actionBar}>

        {/* SEARCH */}

        <div style={styles.searchBox}>

          <FaSearch color="cyan" />

          <input
            type="text"
            placeholder="Search history..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={styles.searchInput}
          />

        </div>

        {/* BUTTONS */}

        <div style={styles.buttons}>

          <button
            onClick={exportCSV}
            style={styles.exportBtn}
          >

            <FaDownload />
            Export CSV

          </button>

          <button
            onClick={
              clearLocalHistory
            }
            style={styles.clearBtn}
          >

            <FaTrash />
            Clear

          </button>

        </div>

      </div>

      {/* ================= TABLE ================= */}

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
                <HeadIcon
                  icon={<FaBolt />}
                  text="Voltage"
                />
              </th>

              <th style={thStyle}>
                <HeadIcon
                  icon={
                    <FaChargingStation />
                  }
                  text="Current"
                />
              </th>

              <th style={thStyle}>
                <HeadIcon
                  icon={<FaBolt />}
                  text="Power"
                />
              </th>

              <th style={thStyle}>
                <HeadIcon
                  icon={
                    <FaBatteryHalf />
                  }
                  text="Energy"
                />
              </th>

              <th style={thStyle}>
                <HeadIcon
                  icon={<FaWater />}
                  text="Flow"
                />
              </th>

              <th style={thStyle}>
                <HeadIcon
                  icon={
                    <FaRulerVertical />
                  }
                  text="Level"
                />
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.length > 0 ? (

              filtered.map(
                (item, index) => (

                  <tr
                    key={item.id}
                    style={{
                      ...styles.row,

                      background:
                        index === 0
                          ? "rgba(0,255,255,0.08)"
                          : "transparent",
                    }}
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

                    <td style={tdStyle}>
                      {item.waterLevel} cm
                    </td>

                  </tr>
                )
              )

            ) : (

              <tr>

                <td
                  colSpan="8"
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

/* ================= HEAD ICON ================= */

function HeadIcon({
  icon,
  text,
}) {

  return (

    <div style={styles.headIcon}>

      {icon}

      {text}

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  container: {
    minHeight: "100vh",
    padding: "30px",
    background:
      "linear-gradient(to right, #0f172a, #1e293b)",
    color: "white",
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  },

  titleBox: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  title: {
    margin: 0,
    fontSize: "36px",
  },

  totalBox: {
    fontSize: "18px",
  },

  total: {
    color: "cyan",
    marginLeft: "10px",
    fontWeight: "bold",
  },

  actionBar: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "25px",
    gap: "20px",
    flexWrap: "wrap",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background:
      "rgba(255,255,255,0.08)",
    padding: "12px 16px",
    borderRadius: "12px",
    minWidth: "260px",
  },

  searchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    width: "100%",
  },

  buttons: {
    display: "flex",
    gap: "15px",
  },

  exportBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#06b6d4",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  clearBtn: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "12px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
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
    padding: "35px",
    textAlign: "center",
    color: "#cbd5e1",
    fontSize: "18px",
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