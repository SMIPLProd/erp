const express = require("express");
const app = express();

app.use(express.json());

let data = [];

// ✅ Homepage route (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("ERP Backend is Running ✅");
});

// API routes
app.get("/api/data", (req, res) => {
  res.json(data);
});

app.post("/api/data", (req, res) => {
  data.push(req.body);
  res.json({ message: "Saved" });
});

// ✅ Correct port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port " + PORT));