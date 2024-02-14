const express = require("express");
const subjectsRoutes = require("./routes/subjectsRoutes");
const experimentsRoutes = require("./routes/experimentsRoutes");

const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, "../data")));

app.use("/api/subjects", subjectsRoutes);
app.use("/api/experiments", experimentsRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.get("/api/ping", (req, res) => {
  res.json({ message: "Hello from the server!", date: new Date() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
