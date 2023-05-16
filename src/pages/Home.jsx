import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHomeStore } from "../stores";

export const Home = () => {
  const store = useHomeStore();

  useEffect(() => {
    store.fetchCoins();
  }, []);

  return (
    <div>
      <input type="text" value={store.query} onChange={store.setQuery} />
      {store.coins.map((coin) => {
        return (
          <div key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name}</Link>
          </div>
        );
      })}
    </div>
  );
};
