const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let data = [];
let counter = 1;

// Generate WO Number
function generateWONumber() {
  const year = new Date().getFullYear();
  const nextYear = year + 1;

  const fy = String(year).slice(2) + "-" + String(nextYear).slice(2);
  const number = String(counter).padStart(3, "0");

  counter++;

  return `WO-${number}/${fy}`;
}

// Home route
app.get("/", (req, res) => {
  res.send("ERP Backend is Running ✅");
});

// Get data
app.get("/api/data", (req, res) => {
  res.json(data);
});

// Create work order
app.post("/api/data", (req, res) => {
  const woNumber = generateWONumber();
  const date = new Date().toLocaleDateString("en-GB");

  const newOrder = {
    woNumber,
    date,
    ...req.body
  };

  data.push(newOrder);

  res.json({ message: "Saved", newOrder });
});

// Delete
app.delete("/api/data/:index", (req, res) => {
  data.splice(req.params.index, 1);
  res.json({ message: "Deleted" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});