const express = require("express");
const { fetchRecentMetrics } = require("../services/metricsService");

const router = express.Router();

router.get("/recent", async (req, res) => {
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

module.exports = router;