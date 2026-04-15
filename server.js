const express = require("express");
const app = express();

app.use(express.json());

let data = [];

app.get("/api/data", (req, res) => {
  res.json(data);
});

app.post("/api/data", (req, res) => {
  data.push(req.body);
  res.json({ message: "Saved" });
});

// 👉 ADD THIS ROUTE (already good)
app.get("/", (req, res) => {
  res.send("ERP Backend is Running ✅");
});

// 👉 IMPORTANT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port " + PORT));