require("dotenv").config();

const express = require("express");
const initDb = require("./initDb");
const { connectRedis } = require("./config/redisClient");
const { startConsumer } = require("./consumers/consumer");
const machineRoutes = require("./routes/machineRoutes");
const alertRoutes = require("./routes/alertRoutes");
const metricRoutes = require("./routes/metricRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/machines", machineRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/metrics", metricRoutes);
app.use("/health", healthRoutes);

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

startServer();