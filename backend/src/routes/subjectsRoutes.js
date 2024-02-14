const express = require("express");
const subjectsController = require("../controllers/subjectsController");

const router = express.Router();

router.get("/", subjectsController.getSubjects);
router.get("/:subject", subjectsController.getSubject);
router.get("/:subject/files", subjectsController.getSubjectFiles);
router.get("/:subject/:file", subjectsController.getSubjectFile);

module.exports = router;
