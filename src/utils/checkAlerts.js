import { THRESHOLDS } from "../config/thresholds";

export function checkAlerts(data) {
  const alerts = [];

  Object.keys(THRESHOLDS).forEach((key) => {
    const value = data[key];
    const rule = THRESHOLDS[key];

    if (value === undefined || value === null) return;

    if (rule.min !== undefined && value < rule.min) {
      alerts.push(`${key.toUpperCase()} too LOW: ${value}`);
    }

    if (rule.max !== undefined && value > rule.max) {
      alerts.push(`${key.toUpperCase()} too HIGH: ${value}`);
    }
  });

  return alerts;
}