const { redisClient } = require("./redisClient");

async function getLatestMachines() {
  const keys = await redisClient.keys("machine:*:latest");

  const machines = [];

  for (const key of keys) {
    const value = await redisClient.get(key);

    if (value) {
      machines.push(JSON.parse(value));
    }
  }

  return machines;
}

module.exports = {
  getLatestMachines,
};