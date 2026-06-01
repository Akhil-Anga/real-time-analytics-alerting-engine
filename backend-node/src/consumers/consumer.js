require("dotenv").config();

const { Kafka } = require("kafkajs");
const { saveMetric } = require("../repositories/metricsRepository");
const { evaluateAlerts } = require("../services/alertEngine");
const { cacheLatestMetric } = require("../services/cacheService");

const kafka = new Kafka({
  clientId: "real-time-alerting-backend",
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({
  groupId: process.env.KAFKA_GROUP_ID,
});

async function startConsumer() {
  try {
    await consumer.connect();
    console.log("Node.js Kafka consumer connected");

    await consumer.subscribe({
      topic: process.env.KAFKA_TOPIC,
      fromBeginning: false,
    });

    console.log(`Listening to Kafka topic: ${process.env.KAFKA_TOPIC}`);

    await consumer.run({
      eachMessage: async ({ message }) => {
        const rawMessage = message.value.toString();
        const metric = JSON.parse(rawMessage);

        await saveMetric(metric);
        await cacheLatestMetric(metric);
        await evaluateAlerts(metric);

        console.log(`Processed metric for ${metric.machineId}`);
        
      },
    });
  } catch (error) {
    console.error("Error in Kafka consumer:", error);
  }
}

module.exports = {
  startConsumer,
};