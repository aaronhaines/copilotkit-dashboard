const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());

app.get("/api/market-movers", (req, res) => {
  res.json([
    { symbol: "AAPL", change: "+2.4%" },
    { symbol: "TSLA", change: "-1.2%" },
    { symbol: "MSFT", change: "+1.1%" },
  ]);
});

app.get("/api/stock-history", (req, res) => {
  const { ticker } = req.query;
  const data = Array.from({ length: 7 }, (_, i) => ({
    date: `2024-05-${i + 1}`,
    price: 100 + Math.random() * 20,
  }));
  res.json({ ticker, data });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});
