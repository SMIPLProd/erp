const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= DB CONNECTION ================= */

// 🔴 REPLACE ONLY YOUR PASSWORD BELOW
mongoose.connect("mongodb+srv://productionsmipl:YOUR_PASSWORD@cluster0.g0eggwj.mongodb.net/erp")
.then(() => console.log("DB Connected ✅"))
.catch(err => console.log("DB Error:", err));

/* ================= SCHEMA ================= */

const WorkOrder = mongoose.model("WorkOrder", {
  woNumber: String,
  date: String,
  customer: String,
  product: String,
  qty: Number,
  status: String,
  machine: String,
  operator: String,
  producedQty: Number
});

/* ================= LOGIN ================= */

const USER = {
  username: "admin",
  password: "1234"
};

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === USER.username && password === USER.password) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

/* ================= WO NUMBER ================= */

function generateWONumber(count) {
  const year = new Date().getFullYear();
  const nextYear = year + 1;
  const fy = String(year).slice(2) + "-" + String(nextYear).slice(2);
  const number = String(count + 1).padStart(3, "0");
  return `WO-${number}/${fy}`;
}

/* ================= APIs ================= */

// GET ALL
app.get("/api/data", async (req, res) => {
  const data = await WorkOrder.find();
  res.json(data);
});

// CREATE
app.post("/api/data", async (req, res) => {
  const count = await WorkOrder.countDocuments();

  const newOrder = new WorkOrder({
    woNumber: generateWONumber(count),
    date: new Date().toLocaleDateString("en-GB"),
    status: "Pending",
    machine: "",
    operator: "",
    producedQty: 0,
    ...req.body
  });

  await newOrder.save();
  res.json(newOrder);
});

// UPDATE
app.put("/api/data/:id", async (req, res) => {
  const updated = await WorkOrder.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // AUTO COMPLETE
  if (updated.producedQty >= updated.qty) {
    updated.status = "Completed";
    await updated.save();
  }

  res.json(updated);
});

// DELETE
app.delete("/api/data/:id", async (req, res) => {
  await WorkOrder.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));

/* ================= WO NUMBER ================= */

function generateWONumber(count) {
  const year = new Date().getFullYear();
  const nextYear = year + 1;
  const fy = String(year).slice(2) + "-" + String(nextYear).slice(2);
  const number = String(count + 1).padStart(3, "0");
  return `WO-${number}/${fy}`;
}

/* ================= APIs ================= */

// GET ALL
app.get("/api/data", async (req, res) => {
  const data = await WorkOrder.find();
  res.json(data);
});

// CREATE
app.post("/api/data", async (req, res) => {
  const count = await WorkOrder.countDocuments();

  const newOrder = new WorkOrder({
    woNumber: generateWONumber(count),
    date: new Date().toLocaleDateString("en-GB"),
    status: "Pending",
    machine: "",
    operator: "",
    producedQty: 0,
    ...req.body
  });

  await newOrder.save();
  res.json(newOrder);
});

// UPDATE
app.put("/api/data/:id", async (req, res) => {
  const updated = await WorkOrder.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // AUTO COMPLETE
  if (updated.producedQty >= updated.qty) {
    updated.status = "Completed";
    await updated.save();
  }

  res.json(updated);
});

// DELETE
app.delete("/api/data/:id", async (req, res) => {
  await WorkOrder.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));