import { Link } from "react-router-dom";

export const ListItem = ({ coin }) => {
  const { id, name, image, priceBtc, priceUsd } = coin;
  return (
    <div className="home-crypto" key={id}>
      <Link to={`/${id}`}>
        <div className="home-crypto-image">
          <img src={image} alt={name} />
        </div>
        <div className="home-crypto-name">{name}</div>
        {priceBtc && (
          <div className="home-crypto-prices">
            <span className="home-crypto-btc">
              <img src="/bitcoin.webp" alt={name} />
              {priceBtc} BTC
            </span>
            <span className="home-crypto-usd">{priceUsd} USD</span>
          </div>
        )}
      </Link>
    </div>
  );
};
