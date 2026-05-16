import { THRESHOLDS } from "../config/thresholds";

export function checkAlerts(data = {}) {
  const alerts = [];

  if (!THRESHOLDS) return alerts;

  // Helper function (clean + reusable)
  const addAlert = (condition, message) => {
    if (condition) alerts.push(message);
  };

  // ================= VOLTAGE =================
  if (data.voltage != null && THRESHOLDS.voltage) {
    addAlert(
      THRESHOLDS.voltage.min != null &&
        data.voltage < THRESHOLDS.voltage.min,
      `⚠ Low Voltage: ${data.voltage} V`
    );

    addAlert(
      THRESHOLDS.voltage.max != null &&
        data.voltage > THRESHOLDS.voltage.max,
      `🚨 High Voltage: ${data.voltage} V`
    );
  }

  // ================= CURRENT =================
  if (data.current != null && THRESHOLDS.current) {
    addAlert(
      THRESHOLDS.current.min != null &&
        data.current < THRESHOLDS.current.min,
      `⚠ Low Current: ${data.current} A`
    );

    addAlert(
      THRESHOLDS.current.max != null &&
        data.current > THRESHOLDS.current.max,
      `🚨 High Current: ${data.current} A`
    );
  }

  // ================= POWER =================
  if (data.power != null && THRESHOLDS.power) {
    addAlert(
      THRESHOLDS.power.max != null &&
        data.power > THRESHOLDS.power.max,
      `🚨 High Power: ${data.power} W`
    );
  }

  // ================= ENERGY =================
  if (data.energy != null && THRESHOLDS.energy) {
    addAlert(
      THRESHOLDS.energy.max != null &&
        data.energy > THRESHOLDS.energy.max,
      `📈 High Energy Usage: ${data.energy} kWh`
    );
  }

  // ================= WATER FLOW =================
  if (data.waterFlow != null && THRESHOLDS.waterFlow) {
    addAlert(
      THRESHOLDS.waterFlow.min != null &&
        data.waterFlow < THRESHOLDS.waterFlow.min,
      `💧 Low Water Flow: ${data.waterFlow} L/min`
    );

    addAlert(
      THRESHOLDS.waterFlow.max != null &&
        data.waterFlow > THRESHOLDS.waterFlow.max,
      `🚨 High Water Flow: ${data.waterFlow} L/min`
    );
  }

  return alerts;
}