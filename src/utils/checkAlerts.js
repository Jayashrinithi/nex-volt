import { THRESHOLDS } from "../config/thresholds";

export function checkAlerts(data = {}, settings = {}) {
  const thresholds = {
    ...THRESHOLDS,

    voltage: {
      ...THRESHOLDS.voltage,
      ...(settings.voltage || {}),
    },

    current: {
      ...THRESHOLDS.current,
      ...(settings.current || {}),
    },

    power: {
      ...THRESHOLDS.power,
      ...(settings.power || {}),
    },

    energy: {
      ...THRESHOLDS.energy,
      ...(settings.energy || {}),
    },

    waterFlow: {
      ...THRESHOLDS.waterFlow,
      ...(settings.waterFlow || {}),
    },

    waterLevel: {
      ...THRESHOLDS.waterLevel,
      ...(settings.waterLevel || {}),
    },
  };

  const alerts = [];

  const status = {
    voltage: "normal",
    current: "normal",
    power: "normal",
    energy: "normal",
    waterLevel: "normal",
    waterFlow: "normal",
  };

  if (!thresholds) {
    return { alerts, status };
  }

  // ================= VOLTAGE =================

  if (data.voltage != null && thresholds.voltage) {
    if (
      thresholds.voltage.max != null &&
      data.voltage > thresholds.voltage.max
    ) {
      status.voltage = "danger";
      alerts.push(`High Voltage: ${data.voltage} V`);
    } else if (
      thresholds.voltage.min != null &&
      data.voltage < thresholds.voltage.min
    ) {
      status.voltage = "warning";
      alerts.push(`Low Voltage: ${data.voltage} V`);
    }
  }

  // ================= CURRENT =================

  if (data.current != null && thresholds.current) {
    if (
      thresholds.current.max != null &&
      data.current > thresholds.current.max
    ) {
      status.current = "danger";
      alerts.push(`High Current: ${data.current} A`);
    } else if (
      thresholds.current.min != null &&
      data.current < thresholds.current.min
    ) {
      status.current = "warning";
      alerts.push(`Low Current: ${data.current} A`);
    }
  }

  // ================= POWER =================

  if (data.power != null && thresholds.power) {
    if (
      thresholds.power.max != null &&
      data.power > thresholds.power.max
    ) {
      status.power = "danger";
      alerts.push(`High Power: ${data.power} W`);
    }
  }

  // ================= ENERGY =================

  if (data.energy != null && thresholds.energy) {
    if (
      thresholds.energy.max != null &&
      data.energy > thresholds.energy.max
    ) {
      status.energy = "danger";
      alerts.push(`High Energy Usage: ${data.energy} kWh`);
    }
  }

  // ================= WATER LEVEL =================

  if (data.waterLevel != null && thresholds.waterLevel) {
    if (
      thresholds.waterLevel.max != null &&
      data.waterLevel > thresholds.waterLevel.max
    ) {
      status.waterLevel = "danger";
      alerts.push(`High Water Level: ${data.waterLevel} cm`);
    } else if (
      thresholds.waterLevel.min != null &&
      data.waterLevel < thresholds.waterLevel.min
    ) {
      status.waterLevel = "warning";
      alerts.push(`Low Water Level: ${data.waterLevel} cm`);
    }
  }

  // ================= WATER FLOW =================

  if (data.waterFlow != null && thresholds.waterFlow) {
    if (
      thresholds.waterFlow.max != null &&
      data.waterFlow > thresholds.waterFlow.max
    ) {
      status.waterFlow = "danger";
      alerts.push(`High Water Flow: ${data.waterFlow} L/min`);
    } else if (
      thresholds.waterFlow.min != null &&
      data.waterFlow < thresholds.waterFlow.min
    ) {
      status.waterFlow = "warning";
      alerts.push(`Low Water Flow: ${data.waterFlow} L/min`);
    }
  }

  return {
    alerts,
    status,
  };
}