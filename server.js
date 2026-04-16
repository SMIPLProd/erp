const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let data = [];

app.get("/", (req, res) => {
  res.send("ERP Backend is Running ✅");
});

app.get("/api/data", (req, res) => {
  res.json(data);
});

app.post("/api/data", (req, res) => {
  data.push(req.body);
  res.json({ message: "Saved" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));