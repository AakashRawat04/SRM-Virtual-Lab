const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../../data/courses");

const getExperiments = (req, res) => {
  const { subject } = req.params;

  fs.readdir(path.join(dataDir, subject, "experiments"), (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(files.map((file) => file.replace(".md", "")));
  });
};

const getExperiment = (req, res) => {
  const { subject, experiment } = req.params;

  fs.readdir(
    path.join(dataDir, subject, "experiments", experiment),
    (err, files) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ error: "Experiment not found" });
      }
      res.json(files.map((file) => file.replace(".md", "")));
    }
  );
};

const getExperimentFile = (req, res) => {
  const { experiment, file, subject } = req.params;
  const experimentDir = path.join(dataDir, subject, "experiments", experiment);

  fs.readdir(experimentDir, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!files.includes(`${file}.md`) && !files.includes(`${file}.json`)) {
      return res.status(404).json({ error: "Experiment file not found" });
    }

    const fileExtension = files.includes(`${file}.md`) ? "md" : "json";
    const filePath = path.join(experimentDir, `${file}.${fileExtension}`);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      const contentType =
        fileExtension === "md" ? "text/markdown" : "application/json";
      res.set("Content-Type", contentType);
      res.send(data);
    });
  });
};

module.exports = { getExperimentFile, getExperiments, getExperiment };
