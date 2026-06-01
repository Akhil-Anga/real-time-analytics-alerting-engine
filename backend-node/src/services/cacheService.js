const { redisClient } = require("../config/redisClient");

async function cacheLatestMetric(metric) {
  const key = `machine:${metric.machineId}:latest`;

  await redisClient.set(key, JSON.stringify(metric));
}

module.exports = {
  cacheLatestMetric,
};