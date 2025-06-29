import { useEffect, useState } from 'react';
import axios from 'axios';

// 商品の型定義
type Item = {
  id: string;
  name: string;
  quantity: number;
};

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);

  // 商品一覧を取得
  const fetchItems = async () => {
    try {
      const res = await axios.get<Item[]>('http://localhost:3000/items');
      setItems(res.data);
    } catch (error) {
      console.error('一覧取得に失敗しました', error);
    }
  };

  // 商品を追加
  const addItem = async () => {
    if (!name || quantity <= 0) return;

    try {
      await axios.post('http://localhost:3000/items', { name, quantity });
      setName('');
      setQuantity(0);
      fetchItems();
    } catch (error) {
      console.error('追加に失敗しました', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🍎 商品一覧</h1>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>（{item.quantity}個）
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '2rem' }}>商品を追加</h2>
      <input
        placeholder="商品名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <input
        type="number"
        placeholder="数量"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        style={{ width: '80px', marginRight: '1rem' }}
      />
      <button onClick={addItem}>追加する</button>
    </div>
  );
}

export default App;
