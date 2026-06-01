import { THRESHOLDS } from "../config/thresholds";

export function checkAlerts(data = {}) {
  const alerts = [];

  const status = {
    voltage: "normal",
    current: "normal",
    power: "normal",
    energy: "normal",
    waterLevel: "normal",
    waterFlow: "normal",
  };

  if (!THRESHOLDS) {
    return { alerts, status };
  }

  const addAlert = (condition, message) => {
    if (condition) alerts.push(message);
  };

  // ================= VOLTAGE =================
  if (data.voltage != null && THRESHOLDS.voltage) {
    if (
      THRESHOLDS.voltage.max != null &&
      data.voltage > THRESHOLDS.voltage.max
    ) {
      status.voltage = "danger";
      alerts.push(`🚨 High Voltage: ${data.voltage} V`);
    } else if (
      THRESHOLDS.voltage.min != null &&
      data.voltage < THRESHOLDS.voltage.min
    ) {
      status.voltage = "warning";
      alerts.push(`⚠ Low Voltage: ${data.voltage} V`);
    }
  }

  // ================= CURRENT =================
  if (data.current != null && THRESHOLDS.current) {
    if (
      THRESHOLDS.current.max != null &&
      data.current > THRESHOLDS.current.max
    ) {
      status.current = "danger";
      alerts.push(`🚨 High Current: ${data.current} A`);
    } else if (
      THRESHOLDS.current.min != null &&
      data.current < THRESHOLDS.current.min
    ) {
      status.current = "warning";
      alerts.push(`⚠ Low Current: ${data.current} A`);
    }
  }

  // ================= POWER =================
  if (data.power != null && THRESHOLDS.power) {
    if (
      THRESHOLDS.power.max != null &&
      data.power > THRESHOLDS.power.max
    ) {
      status.power = "danger";
      alerts.push(`🚨 High Power: ${data.power} W`);
    }
  }

  // ================= ENERGY =================
  if (data.energy != null && THRESHOLDS.energy) {
    if (
      THRESHOLDS.energy.max != null &&
      data.energy > THRESHOLDS.energy.max
    ) {
      status.energy = "danger";
      alerts.push(`📈 High Energy Usage: ${data.energy} kWh`);
    }
  }

  // ================= WATER LEVEL =================
  if (data.waterLevel != null && THRESHOLDS.waterLevel) {
    if (
      THRESHOLDS.waterLevel.max != null &&
      data.waterLevel > THRESHOLDS.waterLevel.max
    ) {
      status.waterLevel = "danger";
      alerts.push(`🚨 High Water Level: ${data.waterLevel} cm`);
    } else if (
      THRESHOLDS.waterLevel.min != null &&
      data.waterLevel < THRESHOLDS.waterLevel.min
    ) {
      status.waterLevel = "warning";
      alerts.push(`⚠ Low Water Level: ${data.waterLevel} cm`);
    }
  }

  // ================= WATER FLOW =================
  if (data.waterFlow != null && THRESHOLDS.waterFlow) {
    if (
      THRESHOLDS.waterFlow.max != null &&
      data.waterFlow > THRESHOLDS.waterFlow.max
    ) {
      status.waterFlow = "danger";
      alerts.push(`🚨 High Water Flow: ${data.waterFlow} L/min`);
    } else if (
      THRESHOLDS.waterFlow.min != null &&
      data.waterFlow < THRESHOLDS.waterFlow.min
    ) {
      status.waterFlow = "warning";
      alerts.push(`💧 Low Water Flow: ${data.waterFlow} L/min`);
    }
  }

  return {
    alerts,
    status,
  };
}