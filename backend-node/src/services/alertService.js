const { getActiveAlerts } = require("../repositories/alertsRepository");

async function fetchActiveAlerts() {
  return await getActiveAlerts();
}

module.exports = {
  fetchActiveAlerts,
};