import { useState } from "react";

import {
  FaMoon,
  FaBell,
  FaVolumeUp,
  FaBolt,
  FaPlug,
  FaTrash,
  FaSave,
  FaWater,
  FaRulerVertical,
} from "react-icons/fa";

/* ================= DEFAULT SETTINGS ================= */

const defaultSettings = {

  darkMode: true,

  alertsEnabled: true,

  soundEnabled: true,

  notificationEnabled: true,

  autoRelayCutoff: true,

  voltage: {
    min: 180,
    max: 250,
  },

  current: {
    min: 0,
    max: 10,
  },

  power: {
    max: 3000,
  },

  energy: {
    max: 50,
  },

  waterFlow: {
    min: 1,
    max: 20,
  },

  waterLevel: {
    min: 2,
    max: 18,
  },
};

/* ================= SETTINGS COMPONENT ================= */

function Settings() {

  // ================= LOAD SETTINGS =================

  const [settings, setSettings] = useState(() => {

    try {

      const saved =
        JSON.parse(localStorage.getItem("settings"));

      return {

        ...defaultSettings,

        ...saved,

        voltage: {
          ...defaultSettings.voltage,
          ...(saved?.voltage || {}),
        },

        current: {
          ...defaultSettings.current,
          ...(saved?.current || {}),
        },

        power: {
          ...defaultSettings.power,
          ...(saved?.power || {}),
        },

        energy: {
          ...defaultSettings.energy,
          ...(saved?.energy || {}),
        },

        waterFlow: {
          ...defaultSettings.waterFlow,
          ...(saved?.waterFlow || {}),
        },

        waterLevel: {
          ...defaultSettings.waterLevel,
          ...(saved?.waterLevel || {}),
        },
      };

    } catch {

      return defaultSettings;
    }
  });

  // ================= TOGGLE =================

  const toggle = (key) => {

    setSettings((prev) => {

      const updated = {

        ...prev,

        [key]: !prev[key],
      };

      localStorage.setItem(
        "settings",
        JSON.stringify(updated)
      );

      // update app instantly
      window.dispatchEvent(
        new Event("settingsChanged")
      );

      return updated;
    });
  };

  // ================= THRESHOLD UPDATE =================

  const updateThreshold = (
    type,
    field,
    value
  ) => {

    setSettings((prev) => ({

      ...prev,

      [type]: {

        ...prev[type],

        [field]: Number(value),
      },
    }));
  };

  // ================= SAVE =================

  const saveSettings = () => {

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    window.dispatchEvent(
      new Event("settingsChanged")
    );

    alert("✅ Settings Saved Successfully");
  };

  // ================= RESET =================

  const resetSettings = () => {

    if (
      window.confirm(
        "Reset all settings?"
      )
    ) {

      localStorage.setItem(
        "settings",
        JSON.stringify(defaultSettings)
      );

      setSettings(defaultSettings);

      window.dispatchEvent(
        new Event("settingsChanged")
      );

      alert("🔄 Settings Reset");
    }
  };
const calibration = {
  voltage: { offset: 0, multiplier: 1 },
  current: { offset: 0, multiplier: 1 },
  waterFlow: { offset: 0, multiplier: 1 },
  waterLevel: { offset: 0, multiplier: 1 },
};
calibratedValue = rawValue * multiplier + offset;
  // ================= CLEAR HISTORY =================

  const clearHistory = () => {

    if (
      window.confirm(
        "Clear all history?"
      )
    ) {

      localStorage.removeItem("history");

      alert("🗑 History Cleared");
    }
  };

  // ================= THEME =================

  const darkMode = settings.darkMode;

  return (

    <div
      style={{
        ...styles.container,

        background: darkMode
          ? "linear-gradient(to right, #0f172a, #1e293b)"
          : "linear-gradient(to right, #e2e8f0, #f8fafc)",

        color: darkMode
          ? "white"
          : "#0f172a",
      }}
    >

      <h1 style={styles.title}>
        ⚙ Smart IoT Settings
      </h1>

      <div
        style={{
          ...styles.card,

          background: darkMode
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.7)",
        }}
      >

        {/* ================= TOGGLES ================= */}

        <SettingRow
          icon={<FaMoon />}
          title="Dark Mode"
          value={settings.darkMode}
          onChange={() =>
            toggle("darkMode")
          }
        />

        <SettingRow
          icon={<FaBell />}
          title="Enable Alerts"
          value={settings.alertsEnabled}
          onChange={() =>
            toggle("alertsEnabled")
          }
        />

        <SettingRow
          icon={<FaVolumeUp />}
          title="Sound Alarm"
          value={settings.soundEnabled}
          onChange={() =>
            toggle("soundEnabled")
          }
        />

        <SettingRow
          icon="📱"
          title="Notifications"
          value={settings.notificationEnabled}
          onChange={() =>
            toggle("notificationEnabled")
          }
        />

        <SettingRow
          icon="🔌"
          title="Auto Relay Cutoff"
          value={settings.autoRelayCutoff}
          onChange={() =>
            toggle("autoRelayCutoff")
          }
        />

        {/* ================= THRESHOLDS ================= */}

        <InputRow
          icon={<FaBolt />}
          title="Voltage Max"
          value={settings.voltage.max}
          unit="V"
          onChange={(e) =>
            updateThreshold(
              "voltage",
              "max",
              e.target.value
            )
          }
        />

        <InputRow
          icon={<FaPlug />}
          title="Current Max"
          value={settings.current.max}
          unit="A"
          onChange={(e) =>
            updateThreshold(
              "current",
              "max",
              e.target.value
            )
          }
        />

        <InputRow
          icon={<FaBolt />}
          title="Power Max"
          value={settings.power.max}
          unit="W"
          onChange={(e) =>
            updateThreshold(
              "power",
              "max",
              e.target.value
            )
          }
        />

        <InputRow
          icon={<FaWater />}
          title="Water Flow Max"
          value={settings.waterFlow.max}
          unit="L/min"
          onChange={(e) =>
            updateThreshold(
              "waterFlow",
              "max",
              e.target.value
            )
          }
        />

        <InputRow
          icon={<FaRulerVertical />}
          title="Water Level Max"
          value={settings.waterLevel.max}
          unit="cm"
          onChange={(e) =>
            updateThreshold(
              "waterLevel",
              "max",
              e.target.value
            )
          }
        />

        {/* ================= BUTTONS ================= */}

        <button
          onClick={saveSettings}
          style={styles.save}
        >
          <FaSave />
          Save Settings
        </button>

        <button
          onClick={resetSettings}
          style={styles.reset}
        >
          🔄 Reset Settings
        </button>

        <button
          onClick={clearHistory}
          style={styles.delete}
        >
          <FaTrash />
          Clear History
        </button>

      </div>

    </div>
  );
}

/* ================= TOGGLE ROW ================= */

function SettingRow({
  icon,
  title,
  value,
  onChange,
}) {

  return (

    <div style={styles.row}>

      <div style={styles.left}>

        <div style={styles.icon}>
          {icon}
        </div>

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

/* ================= INPUT ROW ================= */

function InputRow({
  icon,
  title,
  value,
  unit,
  onChange,
}) {

  return (

    <div style={styles.row}>

      <div style={styles.left}>

        <div style={styles.icon}>
          {icon}
        </div>

        <h3>{title}</h3>

      </div>

      <div style={styles.inputGroup}>

        <input
          type="number"
          value={value}
          onChange={onChange}
          style={styles.input}
        />

        <span>{unit}</span>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const styles = {

  container: {
    minHeight: "100vh",
    padding: "40px",
    marginLeft: "260px",
    transition: "0.3s",
  },

  title: {
    fontSize: "40px",
    marginBottom: "30px",
    fontWeight: "bold",
  },

  card: {
    maxWidth: "800px",
    padding: "30px",
    borderRadius: "25px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 0 25px rgba(0,255,255,0.25)",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom:
      "1px solid rgba(255,255,255,0.1)",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  icon: {
    fontSize: "22px",
  },

  toggle: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  inputGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  input: {
    width: "90px",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    textAlign: "center",
    fontSize: "16px",
  },

  save: {
    width: "100%",
    padding: "15px",
    marginTop: "25px",
    background: "#06b6d4",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  reset: {
    width: "100%",
    padding: "15px",
    marginTop: "10px",
    background: "#f59e0b",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  delete: {
    width: "100%",
    padding: "15px",
    marginTop: "10px",
    background: "#ef4444",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Settings;