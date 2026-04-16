const express = require("express");
const cors = require("cors");   // ✅ ADD THIS

const app = express();

app.use(cors());                // ✅ ADD THIS
app.use(express.json());
const express = require("express");
const app = express();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let data = [];

// Homepage
app.get("/", (req, res) => {
  res.send("ERP Backend is Running ✅");
});

// Get data
app.get("/api/data", (req, res) => {
  res.json(data);
});

// Save data
app.post("/api/data", (req, res) => {
  data.push(req.body);
  res.json({ message: "Saved" });
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));