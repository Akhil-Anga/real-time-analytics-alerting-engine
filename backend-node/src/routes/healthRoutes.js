const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "real-time-alerting-backend",
  });
});

module.exports = router;