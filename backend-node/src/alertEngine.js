const {
  findActiveAlert,
  createAlert,
  resolveAlert,
} = require("./alertsRepository");

const ALERT_RULES = [
  {
    alertType: "HIGH_TEMPERATURE",
    severity: "WARNING",
    isTriggered: (metric) => metric.temperature > 90,
    isResolved: (metric) => metric.temperature <= 85,
    message: (metric) =>
      `${metric.machineId} temperature is high: ${metric.temperature}°C`,
  },
  {
    alertType: "HIGH_VIBRATION",
    severity: "CRITICAL",
    isTriggered: (metric) => metric.vibration > 0.8,
    isResolved: (metric) => metric.vibration <= 0.6,
    message: (metric) =>
      `${metric.machineId} vibration is high: ${metric.vibration}`,
  },
  {
    alertType: "HIGH_RPM",
    severity: "WARNING",
    isTriggered: (metric) => metric.rpm > 4500,
    isResolved: (metric) => metric.rpm <= 4300,
    message: (metric) =>
      `${metric.machineId} RPM is high: ${metric.rpm}`,
  },
];

async function evaluateAlerts(metric) {
  for (const rule of ALERT_RULES) {
    const activeAlert = await findActiveAlert(metric.machineId, rule.alertType);

    if (rule.isTriggered(metric) && !activeAlert) {
      await createAlert({
        machineId: metric.machineId,
        alertType: rule.alertType,
        severity: rule.severity,
        message: rule.message(metric),
        triggeredAt: metric.timestamp,
      });

      console.log(`ALERT CREATED: ${rule.alertType} for ${metric.machineId}`);
    }

    if (rule.isResolved(metric) && activeAlert) {
      await resolveAlert(metric.machineId, rule.alertType, metric.timestamp);

      console.log(`ALERT RESOLVED: ${rule.alertType} for ${metric.machineId}`);
    }
  }
}

module.exports = {
  evaluateAlerts,
};