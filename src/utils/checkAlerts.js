import { THRESHOLDS } from "../config/thresholds";

export function checkAlerts(data) {
  const alerts = [];

  Object.keys(THRESHOLDS).forEach((key) => {
    const value = data[key];
    const rule = THRESHOLDS[key];

    if (value === undefined || value === null) return;

    if (rule.min !== undefined && value < rule.min) {
      alerts.push(`${key.toUpperCase()} too LOW: ${value}`);
    }import { THRESHOLDS } from "../config/thresholds";

export function checkAlerts(data) {
  const alerts = [];

  // CHECK VOLTAGE
  if (
    data.voltage !== undefined &&
    data.voltage !== null
  ) {
    if (
      THRESHOLDS.voltage?.min !==
        undefined &&
      data.voltage <
        THRESHOLDS.voltage.min
    ) {
      alerts.push(
        `⚠ Low Voltage Detected : ${data.voltage} V`
      );
    }

    if (
      THRESHOLDS.voltage?.max !==
        undefined &&
      data.voltage >
        THRESHOLDS.voltage.max
    ) {
      alerts.push(
        `🚨 High Voltage Detected : ${data.voltage} V`
      );
    }
  }

  // CHECK CURRENT
  if (
    data.current !== undefined &&
    data.current !== null
  ) {
    if (
      THRESHOLDS.current?.min !==
        undefined &&
      data.current <
        THRESHOLDS.current.min
    ) {
      alerts.push(
        `⚠ Low Current Detected : ${data.current} A`
      );
    }

    if (
      THRESHOLDS.current?.max !==
        undefined &&
      data.current >
        THRESHOLDS.current.max
    ) {
      alerts.push(
        `🚨 High Current Detected : ${data.current} A`
      );
    }
  }

  // CHECK POWER
  if (
    data.power !== undefined &&
    data.power !== null
  ) {
    if (
      THRESHOLDS.power?.min !==
        undefined &&
      data.power <
        THRESHOLDS.power.min
    ) {
      alerts.push(
        `⚠ Low Power Detected : ${data.power} W`
      );
    }

    if (
      THRESHOLDS.power?.max !==
        undefined &&
      data.power >
        THRESHOLDS.power.max
    ) {
      alerts.push(
        `🚨 High Power Consumption : ${data.power} W`
      );
    }
  }

  // CHECK ENERGY
  if (
    data.energy !== undefined &&
    data.energy !== null
  ) {
    if (
      THRESHOLDS.energy?.max !==
        undefined &&
      data.energy >
        THRESHOLDS.energy.max
    ) {
      alerts.push(
        `📈 Energy Usage High : ${data.energy} kWh`
      );
    }
  }

  // CHECK WATER FLOW
  if (
    data.waterFlow !== undefined &&
    data.waterFlow !== null
  ) {
    if (
      THRESHOLDS.waterFlow?.min !==
        undefined &&
      data.waterFlow <
        THRESHOLDS.waterFlow.min
    ) {
      alerts.push(
        `💧 Low Water Flow : ${data.waterFlow} L/min`
      );
    }

    if (
      THRESHOLDS.waterFlow?.max !==
        undefined &&
      data.waterFlow >
        THRESHOLDS.waterFlow.max
    ) {
      alerts.push(
        `🚨 High Water Flow : ${data.waterFlow} L/min`
      );
    }
  }

  // SYSTEM NORMAL
  if (alerts.length === 0) {
    alerts.push(
      "✅ System Running Normally"
    );
  }

  return alerts;
}

    if (rule.max !== undefined && value > rule.max) {
      alerts.push(`${key.toUpperCase()} too HIGH: ${value}`);
    }
  });

  return alerts;
}