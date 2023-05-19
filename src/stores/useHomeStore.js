import { create } from "zustand";
import axios from "axios";
import { debounce } from "../helpers";

export const useHomeStore = create((set) => ({
  coins: [],
  trending: [],
  query: "",

  setQuery: (e) => {
    set({ query: e.target.value });
    useHomeStore.getState().searchCoins();
  },

  searchCoins: debounce(async () => {
    const { query, trending } = useHomeStore.getState();

    if (query.length > 2) {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`
      );

      const coins = res.data.coins.map((coin) => {
        const { name, large, id } = coin;
        return {
          name,
          image: large,
          id,
        };
      });
      set({ coins });
    } else {
      set({ coins: trending });
    }
  }, 500),

  fetchCoins: async () => {
    const [res, btcRes] = await Promise.all([
      axios.get("https://api.coingecko.com/api/v3/search/trending"),
      axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      ),
    ]);

    const btcPrice = btcRes.data.bitcoin.usd;

    const coins = res.data.coins.map((coin) => {
      const { name, large, id, price_btc } = coin.item;

      const priceUsd = (price_btc * btcPrice).toFixed(6);
      const priceBtc = price_btc.toFixed(6);

      return {
        id,
        name,
        priceBtc,
        priceUsd,
        image: large,
      };
    });

    set({ coins, trending: coins });
  },
}));
