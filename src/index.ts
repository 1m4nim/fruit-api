import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

type Item = {
  id: string;
  name: string;
  quantity: number;
};

let items: Item[] = [];

// 一覧取得
app.get("/items", (req, res) => {
  res.json(items);
});

// 追加
app.post("/items", (req, res) => {
  const { name, quantity } = req.body;
  if (!name || typeof quantity !== "number") {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newItem: Item = {
    id: uuidv4(),
    name,
    quantity,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// 起動
app.listen(PORT, () => {
  console.log(`🍎 API running on http://localhost:${PORT}/items`);
});
