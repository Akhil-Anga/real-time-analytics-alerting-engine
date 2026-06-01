const pool = require("./db");

async function findActiveAlert(machineId, alertType) {
  const result = await pool.query(
    `
    SELECT *
    FROM machine_alerts
    WHERE machine_id = $1
      AND alert_type = $2
      AND status = 'ACTIVE'
    LIMIT 1
    `,
    [machineId, alertType]
  );

  return result.rows[0];
}

async function createAlert({ machineId, alertType, severity, message, triggeredAt }) {
  await pool.query(
    `
    INSERT INTO machine_alerts (
      machine_id,
      alert_type,
      severity,
      message,
      triggered_at
    )
    VALUES ($1, $2, $3, $4, $5)
    `,
    [machineId, alertType, severity, message, triggeredAt]
  );
}

async function resolveAlert(machineId, alertType, resolvedAt) {
  await pool.query(
    `
    UPDATE machine_alerts
    SET status = 'RESOLVED',
        resolved_at = $3
    WHERE machine_id = $1
      AND alert_type = $2
      AND status = 'ACTIVE'
    `,
    [machineId, alertType, resolvedAt]
  );
}

async function getActiveAlerts() {
  const result = await pool.query(`
    SELECT *
    FROM machine_alerts
    WHERE status = 'ACTIVE'
    ORDER BY created_at DESC
  `);

  return result.rows;
}

module.exports = {
  findActiveAlert,
  createAlert,
  resolveAlert,
  getActiveAlerts,
};