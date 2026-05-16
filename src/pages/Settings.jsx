import { useState } from "react";
import {
  FaMoon,
  FaBell,
  FaVolumeUp,
  FaBolt,
  FaPlug,
  FaTrash,
  FaSave,
} from "react-icons/fa";

/* DEFAULT SETTINGS (IMPORTANT: ALWAYS FULL STRUCTURE) */
const defaultSettings = {
  darkMode: true,
  alertsEnabled: true,
  soundEnabled: false,
  notificationEnabled: false,
  autoRelayCutoff: true,

  voltage: { min: 180, max: 250 },
  current: { min: 0, max: 10 },
  power: { max: 3000 },
  energy: { max: 50 },
  waterFlow: { min: 1, max: 20 },
};

function Settings() {
  /* SAFE LOAD FROM LOCALSTORAGE */
  const [settings, setSettings] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("settings"));

      // merge default + saved (VERY IMPORTANT FIX)
      return {
        ...defaultSettings,
        ...saved,
        voltage: { ...defaultSettings.voltage, ...(saved?.voltage || {}) },
        current: { ...defaultSettings.current, ...(saved?.current || {}) },
        power: { ...defaultSettings.power, ...(saved?.power || {}) },
        energy: { ...defaultSettings.energy, ...(saved?.energy || {}) },
        waterFlow: { ...defaultSettings.waterFlow, ...(saved?.waterFlow || {}) },
      };
    } catch {
      return defaultSettings;
    }
  });

  /* SAVE */
  const saveSettings = () => {
    localStorage.setItem("settings", JSON.stringify(settings));
    window.dispatchEvent(new Event("storage"));
    alert("✅ Settings Saved");
  };

  /* TOGGLE */
  const toggle = (key) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem("settings", JSON.stringify(updated));
      return updated;
    });
  };

  /* SAFE THRESHOLD UPDATE */
  const updateThreshold = (type, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: Number(value),
      },
    }));
  };

  /* CLEAR HISTORY */
  const clearHistory = () => {
    if (window.confirm("Clear all history?")) {
      localStorage.removeItem("history");
      alert("🗑 History Cleared");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>⚙ Smart IoT Settings</h1>

      <div style={styles.card}>
        {/* TOGGLES */}
        <SettingRow icon={<FaMoon />} title="Dark Mode"
          value={settings.darkMode}
          onChange={() => toggle("darkMode")}
        />

        <SettingRow icon={<FaBell />} title="Enable Alerts"
          value={settings.alertsEnabled}
          onChange={() => toggle("alertsEnabled")}
        />

        <SettingRow icon={<FaVolumeUp />} title="Sound Alarm"
          value={settings.soundEnabled}
          onChange={() => toggle("soundEnabled")}
        />

        <SettingRow icon="📱" title="Notifications"
          value={settings.notificationEnabled}
          onChange={() => toggle("notificationEnabled")}
        />

        <SettingRow icon="🔌" title="Auto Relay Cutoff"
          value={settings.autoRelayCutoff}
          onChange={() => toggle("autoRelayCutoff")}
        />

        {/* INPUTS (NOW SAFE) */}
        <InputRow
          icon={<FaBolt />}
          title="Voltage Limit"
          value={settings.voltage?.max}
          unit="V"
          onChange={(e) =>
            updateThreshold("voltage", "max", e.target.value)
          }
        />

        <InputRow
          icon={<FaPlug />}
          title="Current Limit"
          value={settings.current?.max}
          unit="A"
          onChange={(e) =>
            updateThreshold("current", "max", e.target.value)
          }
        />

        {/* BUTTONS */}
        <button onClick={saveSettings} style={styles.save}>
          <FaSave /> Save Settings
        </button>

        <button onClick={clearHistory} style={styles.delete}>
          <FaTrash /> Clear History
        </button>
      </div>
    </div>
  );
}

/* COMPONENTS */
function SettingRow({ icon, title, value, onChange }) {
  return (
    <div style={styles.row}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {icon}
        <h3>{title}</h3>
      </div>

      <button
        onClick={onChange}
        style={{
          ...styles.toggle,
          background: value ? "#22c55e" : "#ef4444",
        }}
      >
        {value ? "ON" : "OFF"}
      </button>
    </div>
  );
}

function InputRow({ icon, title, value, onChange, unit }) {
  return (
    <div style={styles.row}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {icon}
        <h3>{title}</h3>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input value={value} onChange={onChange} style={styles.input} />
        <span>{unit}</span>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px",
    marginLeft: "80px",
    background: "linear-gradient(to right, #0f172a, #1e293b)",
    color: "white",
  },

  title: {
    fontSize: "40px",
    marginBottom: "30px",
  },

  card: {
    maxWidth: "700px",
    background: "rgba(255,255,255,0.08)",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 20px cyan",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    paddingBottom: "10px",
  },

  toggle: {
    padding: "8px 20px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    cursor: "pointer",
  },

  input: {
    width: "80px",
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    textAlign: "center",
  },

  save: {
    width: "100%",
    padding: "15px",
    marginTop: "20px",
    background: "#06b6d4",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  delete: {
    width: "100%",
    padding: "15px",
    marginTop: "10px",
    background: "#ef4444",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Settings;