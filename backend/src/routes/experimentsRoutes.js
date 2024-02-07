const express = require("express");
const experimentsController = require("../controllers/experimentsController");

const router = express.Router();

router.get("/:subject", experimentsController.getExperiments);
router.get("/:subject/:experiment", experimentsController.getExperiment);
router.get("/:subject/:experiment/:file", experimentsController.getExperimentFile);

module.exports = router;
