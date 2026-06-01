const { getRecentMetrics } = require("./metricsRepository");

async function fetchRecentMetrics() {
  return await getRecentMetrics(50);
}

module.exports = {
  fetchRecentMetrics,
};