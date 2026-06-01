const { getRecentMetrics } = require("../repositories/metricsRepository");

async function fetchRecentMetrics() {
  return await getRecentMetrics(50);
}

module.exports = {
  fetchRecentMetrics,
};