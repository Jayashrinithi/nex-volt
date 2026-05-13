import { useEffect, useState } from "react";

function Settings() {
  const [darkMode, setDarkMode] = useState(true);

  const [alertsEnabled, setAlertsEnabled] =
    useState(true);

  const [soundEnabled, setSoundEnabled] =
    useState(false);

  const [voltageMax, setVoltageMax] =
    useState(250);

  const [currentMax, setCurrentMax] =
    useState(10);

  const [waterLevelMin, setWaterLevelMin] =
    useState(20);

  // LOAD SAVED SETTINGS
  useEffect(() => {
    const savedDarkMode =
      localStorage.getItem("darkMode");

    const savedAlerts =
      localStorage.getItem("alertsEnabled");

    const savedSound =
      localStorage.getItem("soundEnabled");

    const savedVoltage =
      localStorage.getItem("voltageMax");

    const savedCurrent =
      localStorage.getItem("currentMax");

    const savedWaterLevel =
      localStorage.getItem("waterLevelMin");

    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }

    if (savedAlerts !== null) {
      setAlertsEnabled(
        JSON.parse(savedAlerts)
      );
    }

    if (savedSound !== null) {
      setSoundEnabled(
        JSON.parse(savedSound)
      );
    }

    if (savedVoltage !== null) {
      setVoltageMax(savedVoltage);
    }

    if (savedCurrent !== null) {
      setCurrentMax(savedCurrent);
    }

    if (savedWaterLevel !== null) {
      setWaterLevelMin(savedWaterLevel);
    }
  }, []);

  // SAVE SETTINGS
  const saveSettings = () => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );

    localStorage.setItem(
      "alertsEnabled",
      JSON.stringify(alertsEnabled)
    );

    localStorage.setItem(
      "soundEnabled",
      JSON.stringify(soundEnabled)
    );

    localStorage.setItem(
      "voltageMax",
      voltageMax
    );

    localStorage.setItem(
      "currentMax",
      currentMax
    );

    localStorage.setItem(
      "waterLevelMin",
      waterLevelMin
    );

    alert("Settings Saved ✅");
  };

  // CLEAR HISTORY
  const clearHistory = () => {
    const confirmDelete = window.confirm(
      "Clear all saved history?"
    );

    if (confirmDelete) {
      localStorage.clear();

      alert("History Cleared");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        padding: "40px",

        background: darkMode
          ? "linear-gradient(to right, #0f172a, #1e293b)"
          : "#f1f5f9",

        color: darkMode ? "white" : "black",

        transition: "0.3s",
      }}
    >
      <h1
        style={{
          fontSize: "40px",

          marginBottom: "30px",
        }}
      >
        ⚙ Settings
      </h1>

      {/* SETTINGS CARD */}
      <div style={styles.card}>
        
        {/* DARK MODE */}
        <SettingRow
          title="Dark Mode"
          value={darkMode}
          onChange={() =>
            setDarkMode(!darkMode)
          }
        />

        {/* ALERTS */}
        <SettingRow
          title="Enable Alerts"
          value={alertsEnabled}
          onChange={() =>
            setAlertsEnabled(
              !alertsEnabled
            )
          }
        />

        {/* SOUND */}
        <SettingRow
          title="Sound Alarm"
          value={soundEnabled}
          onChange={() =>
            setSoundEnabled(
              !soundEnabled
            )
          }
        />

        {/* VOLTAGE */}
        <InputRow
          title="Voltage Max"
          value={voltageMax}
          onChange={(e) =>
            setVoltageMax(e.target.value)
          }
        />

        {/* CURRENT */}
        <InputRow
          title="Current Max"
          value={currentMax}
          onChange={(e) =>
            setCurrentMax(e.target.value)
          }
        />

        {/* WATER LEVEL */}
        <InputRow
          title="Water Level Min"
          value={waterLevelMin}
          onChange={(e) =>
            setWaterLevelMin(
              e.target.value
            )
          }
        />

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          style={styles.saveButton}
        >
          💾 Save Settings
        </button>

        {/* CLEAR HISTORY */}
        <button
          onClick={clearHistory}
          style={styles.deleteButton}
        >
          🗑 Clear History
        </button>
      </div>
    </div>
  );
}

// TOGGLE ROW
function SettingRow({
  title,
  value,
  onChange,
}) {
  return (
    <div style={styles.row}>
      <h3>{title}</h3>

      <button
        onClick={onChange}
        style={{
          ...styles.toggle,

          background: value
            ? "#22c55e"
            : "#ef4444",
        }}
      >
        {value ? "ON" : "OFF"}
      </button>
    </div>
  );
}

// INPUT ROW
function InputRow({
  title,
  value,
  onChange,
}) {
  return (
    <div style={styles.row}>
      <h3>{title}</h3>

      <input
        value={value}
        onChange={onChange}
        style={styles.input}
      />
    </div>
  );
}

const styles = {
  card: {
    background:
      "rgba(255,255,255,0.08)",

    padding: "30px",

    borderRadius: "20px",

    maxWidth: "600px",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 0 20px rgba(0,255,255,0.2)",
  },

  row: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "25px",
  },

  toggle: {
    border: "none",

    padding: "10px 20px",

    borderRadius: "10px",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",
  },

  input: {
    padding: "10px",

    borderRadius: "10px",

    border: "none",

    width: "120px",

    textAlign: "center",
  },

  saveButton: {
    width: "100%",

    padding: "15px",

    background: "#06b6d4",

    border: "none",

    borderRadius: "12px",

    color: "white",

    fontSize: "18px",

    fontWeight: "bold",

    cursor: "pointer",

    marginBottom: "15px",
  },

  deleteButton: {
    width: "100%",

    padding: "15px",

    background: "#ef4444",

    border: "none",

    borderRadius: "12px",

    color: "white",

    fontSize: "18px",

    fontWeight: "bold",

    cursor: "pointer",
  },
};

export default Settings;