const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 1338;

// Allow Home Assistant iframe
app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  next();
});

// Local UI folder
const WEB_ROOT = path.join(__dirname, "3d-ha-optimized");

app.use(express.static(WEB_ROOT));

app.get("/api/status", (req, res) => {
  res.json({
    name: "FloorSync 3D",
    status: "running",
    time: new Date().toISOString()
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(WEB_ROOT, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("FloorSync 3D running on port", PORT);
  console.log("Serving UI from:", WEB_ROOT);
});