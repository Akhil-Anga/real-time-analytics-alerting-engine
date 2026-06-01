const express = require("express");
const { fetchActiveAlerts } = require("../services/alertService");

const router = express.Router();

router.get("/active", async (req, res) => {
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

module.exports = router;