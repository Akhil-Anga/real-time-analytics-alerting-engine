const pool = require("./db");

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS machine_metrics (
      id SERIAL PRIMARY KEY,
      machine_id VARCHAR(50) NOT NULL,
      rpm INTEGER NOT NULL,
      vibration NUMERIC(5, 2) NOT NULL,
      temperature NUMERIC(5, 2) NOT NULL,
      pressure NUMERIC(5, 2) NOT NULL,
      power_consumption NUMERIC(6, 2) NOT NULL,
      event_timestamp TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS machine_alerts (
      id SERIAL PRIMARY KEY,
      machine_id VARCHAR(50) NOT NULL,
      alert_type VARCHAR(100) NOT NULL,
      severity VARCHAR(20) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
      triggered_at TIMESTAMPTZ NOT NULL,
      resolved_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  console.log("PostgreSQL tables checked/created");
}

module.exports = initDb;