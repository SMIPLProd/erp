let counter = 1;

function generateWONumber() {
  const year = new Date().getFullYear();
  const nextYear = year + 1;

  const fy = String(year).slice(2) + "-" + String(nextYear).slice(2);
  const number = String(counter).padStart(3, "0");

  counter++;

  return `WO-${number}/${fy}`;
}

app.post("/api/data", (req, res) => {
  const woNumber = generateWONumber();

  const today = new Date();
  const date = today.toLocaleDateString("en-GB");

  const newOrder = {
    woNumber,
    date,
    ...req.body
  };

  data.push(newOrder);

  res.json({ message: "Saved", newOrder });
});