const { getActiveAlerts } = require("./alertsRepository");

async function fetchActiveAlerts() {
  return await getActiveAlerts();
}

module.exports = {
  fetchActiveAlerts,
};