import { useEffect } from "react";

import { useHomeStore } from "stores";
import { Header, ListItem } from "components";

export const Home = () => {
  const { fetchCoins, query, setQuery, coins } = useHomeStore();

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  return (
    <div>
      <Header />
      <header className="home-search">
        <div className="width">
          <h2>Search a coin</h2>
          <input type="text" value={query} onChange={setQuery} />
        </div>
      </header>
      <div className="home-crypto">
        <div className="width">
          <h2>Trending coins</h2>
          <div className="home-cryptos-list">
            {coins.map((coin) => {
              return <ListItem key={coin.id} coin={coin} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
