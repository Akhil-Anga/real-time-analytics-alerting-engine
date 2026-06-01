const express = require("express");
const { getLatestMachines } = require("../services/machineService");

const router = express.Router();

router.get("/latest", async (req, res) => {
  try {
    const machines = await getLatestMachines();
    res.json(machines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load machine data" });
  }
});

module.exports = router;