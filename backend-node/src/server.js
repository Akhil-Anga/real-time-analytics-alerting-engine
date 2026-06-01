require("dotenv").config();

const express = require("express");
const initDb = require("./initDb");
const { connectRedis } = require("./redisClient");
const { startConsumer } = require("./consumer");
const { getLatestMachines } = require("./machineService");
const { fetchActiveAlerts } = require("./alertService");
const { fetchRecentMetrics } = require("./metricsService");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "real-time-alerting-backend",
  });
});

async function startServer() {
  try {
    await initDb();
    await connectRedis();

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
    });

    await startConsumer();
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

app.get("/api/machines/latest", async (req, res) => {
  try {
    const machines = await getLatestMachines();

    res.json(machines);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load machine data",
    });
  }
});

app.get("/api/alerts/active", async (req, res) => {
  try {
    const alerts = await fetchActiveAlerts();

    res.json(alerts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load alerts",
    });
  }
});

app.get("/api/metrics/recent", async (req, res) => {
  try {
    const metrics = await fetchRecentMetrics();

    res.json(metrics);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load metrics",
    });
  }
});

startServer();