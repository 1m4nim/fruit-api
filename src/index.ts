import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 3000;

app.use(express.json());

type Item = {
  id: string;
  name: string;
  quantity: number;
};

let items: Item[] = [];

// 商品一覧取得
app.get("/", (req: Request, res: Response) => {
res.send("Fruit APIへようこそ！")
});

// 新規商品追加
app.post("/items", (req: Request, res: Response) => {
  const { name, quantity } = req.body;

  if (!name || typeof quantity !== "number") {
    return res.status(400).json({ message: "Invalid request body" });
  }

  const newItem: Item = {
    id: uuidv4(),
    name,
    quantity,
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// 商品詳細取得
app.get("/items/:id", (req: Request, res: Response) => {
  const item = items.find((i) => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }
  res.json(item);
});

// 商品情報更新
app.put("/items/:id", (req: Request, res: Response) => {
  const index = items.findIndex((i) => i.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }

  const { name, quantity } = req.body;

  // 部分的な更新も許可
  if (name !== undefined) items[index].name = name;
  if (quantity !== undefined) items[index].quantity = quantity;

  res.json(items[index]);
});

// 商品削除
app.delete("/items/:id", (req: Request, res: Response) => {
  const item = items.find((i) => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  items = items.filter((i) => i.id !== req.params.id);
  res.status(204).send(); // No Content
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`🍎 APIサーバー起動中: http://localhost:${PORT}`);
});
