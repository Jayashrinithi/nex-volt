import { useEffect, useState } from "react";

import {
  FaMoon,
  FaBell,
  FaVolumeUp,
  FaBolt,
  FaPlug,
  FaTrash,
  FaSave,
} from "react-icons/fa";

function Settings() {
  const [darkMode, setDarkMode] =
    useState(true);

  const [alertsEnabled, setAlertsEnabled] =
    useState(true);

  const [soundEnabled, setSoundEnabled] =
    useState(false);

  const [voltageMax, setVoltageMax] =
    useState(250);

  const [currentMax, setCurrentMax] =
    useState(10);

  const [autoRelayCutoff, setAutoRelayCutoff] =
    useState(true);

  const [notificationEnabled, setNotificationEnabled] =
    useState(false);

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

    const savedRelay =
      localStorage.getItem("autoRelayCutoff");

    const savedNotification =
      localStorage.getItem(
        "notificationEnabled"
      );

    if (savedDarkMode !== null) {
      setDarkMode(
        JSON.parse(savedDarkMode)
      );
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

    if (savedRelay !== null) {
      setAutoRelayCutoff(
        JSON.parse(savedRelay)
      );
    }

    if (savedNotification !== null) {
      setNotificationEnabled(
        JSON.parse(savedNotification)
      );
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
      "autoRelayCutoff",
      JSON.stringify(autoRelayCutoff)
    );

    localStorage.setItem(
      "notificationEnabled",
      JSON.stringify(notificationEnabled)
    );

    alert("✅ Settings Saved");
  };

  // CLEAR HISTORY
  const clearHistory = () => {
    const confirmDelete = window.confirm(
      "Clear all saved history?"
    );

    if (confirmDelete) {
      localStorage.clear();

      alert("🗑 History Cleared");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",

        padding: "40px",

        marginLeft: "80px",

        background: darkMode
          ? "linear-gradient(to right, #0f172a, #1e293b)"
          : "#f1f5f9",

        color: darkMode
          ? "white"
          : "black",

        transition: "0.3s",
      }}
    >
      <h1 style={styles.title}>
        ⚙ Smart IoT Settings
      </h1>

      {/* SETTINGS CARD */}
      <div style={styles.card}>
        
        {/* DARK MODE */}
        <SettingRow
          icon={<FaMoon />}
          title="Dark Mode"
          value={darkMode}
          onChange={() =>
            setDarkMode(!darkMode)
          }
        />

        {/* ALERTS */}
        <SettingRow
          icon={<FaBell />}
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
          icon={<FaVolumeUp />}
          title="Sound Alarm"
          value={soundEnabled}
          onChange={() =>
            setSoundEnabled(
              !soundEnabled
            )
          }
        />

        {/* RELAY */}
        <SettingRow
          icon={"🔌"}
          title="Auto Relay Cutoff"
          value={autoRelayCutoff}
          onChange={() =>
            setAutoRelayCutoff(
              !autoRelayCutoff
            )
          }
        />

        {/* NOTIFICATIONS */}
        <SettingRow
          icon={"📱"}
          title="Push Notifications"
          value={notificationEnabled}
          onChange={() =>
            setNotificationEnabled(
              !notificationEnabled
            )
          }
        />

        {/* VOLTAGE */}
        <InputRow
          icon={<FaBolt />}
          title="Voltage Limit"
          value={voltageMax}
          unit="V"
          onChange={(e) =>
            setVoltageMax(
              e.target.value
            )
          }
        />

        {/* CURRENT */}
        <InputRow
          icon={<FaPlug />}
          title="Current Limit"
          value={currentMax}
          unit="A"
          onChange={(e) =>
            setCurrentMax(
              e.target.value
            )
          }
        />

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          style={styles.saveButton}
        >
          <FaSave
            style={{
              marginRight: "10px",
            }}
          />
          Save Settings
        </button>

        {/* CLEAR HISTORY */}
        <button
          onClick={clearHistory}
          style={styles.deleteButton}
        >
          <FaTrash
            style={{
              marginRight: "10px",
            }}
          />
          Clear History
        </button>
      </div>
    </div>
  );
}

// TOGGLE ROW
function SettingRow({
  icon,
  title,
  value,
  onChange,
}) {
  return (
    <div style={styles.row}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "20px" }}>
          {icon}
        </span>

        <h3>{title}</h3>
      </div>

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
  icon,
  title,
  value,
  onChange,
  unit,
}) {
  return (
    <div style={styles.row}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "20px" }}>
          {icon}
        </span>

        <h3>{title}</h3>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          value={value}
          onChange={onChange}
          style={styles.input}
        />

        <span>{unit}</span>
      </div>
    </div>
  );
}

const styles = {
  title: {
    fontSize: "42px",

    marginBottom: "30px",

    fontWeight: "bold",
  },

  card: {
    background:
      "rgba(255,255,255,0.08)",

    padding: "35px",

    borderRadius: "20px",

    maxWidth: "700px",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 0 25px rgba(0,255,255,0.2)",
  },

  row: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "28px",

    borderBottom:
      "1px solid rgba(255,255,255,0.08)",

    paddingBottom: "15px",
  },

  toggle: {
    border: "none",

    padding: "10px 24px",

    borderRadius: "10px",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",

    minWidth: "80px",
  },

  input: {
    padding: "10px",

    borderRadius: "10px",

    border: "none",

    width: "120px",

    textAlign: "center",

    fontSize: "16px",
  },

  saveButton: {
    width: "100%",

    padding: "16px",

    background: "#06b6d4",

    border: "none",

    borderRadius: "12px",

    color: "white",

    fontSize: "18px",

    fontWeight: "bold",

    cursor: "pointer",

    marginBottom: "15px",

    boxShadow:
      "0 0 15px rgba(6,182,212,0.5)",
  },

  deleteButton: {
    width: "100%",

    padding: "16px",

    background: "#ef4444",

    border: "none",

    borderRadius: "12px",

    color: "white",

    fontSize: "18px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 0 15px rgba(239,68,68,0.5)",
  },
};

export default Settings;