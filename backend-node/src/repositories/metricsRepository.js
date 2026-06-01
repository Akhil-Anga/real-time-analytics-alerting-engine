const pool = require("../config/db");

async function saveMetric(metric) {
  const query = `
    INSERT INTO machine_metrics (
      machine_id,
      rpm,
      vibration,
      temperature,
      pressure,
      power_consumption,
      event_timestamp
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;

  const values = [
    metric.machineId,
    metric.rpm,
    metric.vibration,
    metric.temperature,
    metric.pressure,
    metric.powerConsumption,
    metric.timestamp,
  ];

  await pool.query(query, values);
}

async function getRecentMetrics(limit = 50) {
  const result = await pool.query(
    `
    SELECT *
    FROM machine_metrics
    ORDER BY event_timestamp DESC
    LIMIT $1
    `,
    [limit]
  );

  return result.rows;
}

module.exports = {
  saveMetric,
  getRecentMetrics,
};