const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 1338;

const OPTIONS_PATH = path.join(__dirname, "data", "options.json");

function getAddonOptions() {
  try {
    if (fs.existsSync(OPTIONS_PATH)) {
      const raw = fs.readFileSync(OPTIONS_PATH, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Unable to read addon options:", err);
  }
  return {};
}

// Allow Home Assistant iframe
app.use((req, res, next) => {
  res.removeHeader("X-Frame-Options");
  next();
});

// Local UI folder
const WEB_ROOT = path.join(__dirname, "3D");

app.use(express.static(WEB_ROOT));

app.get("/api/status", (req, res) => {
  res.json({
    name: "Domotics 3D",
    status: "running",
    time: new Date().toISOString()
  });
});

app.get("/ha-options.js", (req, res) => {
  const options = getAddonOptions();
  res.type("application/javascript");
  res.send(`window.ADDON_OPTIONS = ${JSON.stringify(options || {})};`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(WEB_ROOT, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Domotics 3D running on port", PORT);
  console.log("Serving UI from:", WEB_ROOT);
});