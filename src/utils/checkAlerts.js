import { THRESHOLDS } from "../config/thresholds";

export function checkAlerts(data) {
  const alerts = [];

  // VOLTAGE CHECK
  if (
    data.voltage !== undefined &&
    data.voltage !== null
  ) {
    if (
      THRESHOLDS.voltage?.min !== undefined &&
      data.voltage < THRESHOLDS.voltage.min
    ) {
      alerts.push(
        `⚠ Low Voltage : ${data.voltage} V`
      );
    }

    if (
      THRESHOLDS.voltage?.max !== undefined &&
      data.voltage > THRESHOLDS.voltage.max
    ) {
      alerts.push(
        `🚨 High Voltage : ${data.voltage} V`
      );
    }
  }

  // CURRENT CHECK
  if (
    data.current !== undefined &&
    data.current !== null
  ) {
    if (
      THRESHOLDS.current?.min !== undefined &&
      data.current < THRESHOLDS.current.min
    ) {
      alerts.push(
        `⚠ Low Current : ${data.current} A`
      );
    }

    if (
      THRESHOLDS.current?.max !== undefined &&
      data.current > THRESHOLDS.current.max
    ) {
      alerts.push(
        `🚨 High Current : ${data.current} A`
      );
    }
  }

  // POWER CHECK
  if (
    data.power !== undefined &&
    data.power !== null
  ) {
    if (
      THRESHOLDS.power?.max !== undefined &&
      data.power > THRESHOLDS.power.max
    ) {
      alerts.push(
        `🚨 High Power : ${data.power} W`
      );
    }
  }

  // ENERGY CHECK
  if (
    data.energy !== undefined &&
    data.energy !== null
  ) {
    if (
      THRESHOLDS.energy?.max !== undefined &&
      data.energy > THRESHOLDS.energy.max
    ) {
      alerts.push(
        `📈 High Energy Usage : ${data.energy} kWh`
      );
    }
  }

  // WATER FLOW CHECK
  if (
    data.waterFlow !== undefined &&
    data.waterFlow !== null
  ) {
    if (
      THRESHOLDS.waterFlow?.min !== undefined &&
      data.waterFlow < THRESHOLDS.waterFlow.min
    ) {
      alerts.push(
        `💧 Low Water Flow : ${data.waterFlow} L/min`
      );
    }

    if (
      THRESHOLDS.waterFlow?.max !== undefined &&
      data.waterFlow > THRESHOLDS.waterFlow.max
    ) {
      alerts.push(
        `🚨 High Water Flow : ${data.waterFlow} L/min`
      );
    }
  }

  return alerts;
}