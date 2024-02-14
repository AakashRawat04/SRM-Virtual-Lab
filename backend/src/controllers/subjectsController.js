const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../../data/courses");

const getSubjects = (req, res) => {
  fs.readdir(dataDir, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    const subjectPromises = files.map((file) => {
      const subjectPath = path.join(dataDir, file);
      return new Promise((resolve, reject) => {
        fs.readFile(
          path.join(subjectPath, "info.json"),
          "utf8",
          (err, data) => {
            if (err) {
              return reject(err);
            }
            resolve({ name: file.replace(".md", ""), info: JSON.parse(data) });
          }
        );
      });
    });

    Promise.all(subjectPromises)
      .then((subjects) => {
        res.json(subjects);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  });
};

const getSubject = (req, res) => {
  const { subject } = req.params;

  fs.readdir(path.join(dataDir, subject), (err, files) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ error: "Subject not found" });
    }

    const filteredFiles = files.filter((file) => file !== "info.json");

    res.json(filteredFiles.map((file) => file.replace(".md", "")));
  });
};

const getSubjectFile = (req, res) => {
  const { subject, file } = req.params;
  const subjectDir = path.join(dataDir, subject);

  fs.readdir(subjectDir, (err, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (file === "experiments") {
      return res.status(404).json({ error: `use /api/experiments/${subject}` });
    }

    if (!files.includes(`${file}.md`) && !files.includes(`${file}.json`)) {
      return res.status(404).json({ error: "Subject file not found" });
    }

    const fileExtension = files.includes(`${file}.md`) ? "md" : "json";
    const filePath = path.join(subjectDir, `${file}.${fileExtension}`);

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

module.exports = { getSubject, getSubjects, getSubjectFile };
