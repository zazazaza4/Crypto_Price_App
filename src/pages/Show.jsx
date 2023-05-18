import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useShowStore } from "stores";
import { Header } from "components";

export const Show = () => {
  const { fetchData, data, graphData } = useShowStore();
  const params = useParams();

  useEffect(() => {
    fetchData(params.id);
  }, [fetchData, params.id]);

  if (!data) return <></>;

  return (
    <div>
      <Header back />
      <header>
        <img src={data.image.large} alt={data.name} />
        <h2>
          {data.name} ({data.symbol})
        </h2>
      </header>
      <AreaChart
        width={600}
        height={400}
        data={graphData}
        margin={{ top: 10, right: 30, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
      <div>
        <h4>24 high</h4>
        <span>${data.market_data.high_24h.usd}</span>
      </div>
      <div>
        <h4>24 low</h4>
        <span>${data.market_data.low_24h.usd}</span>
      </div>
      <div>
        <h4>Circulating supply</h4>
        <span>${data.market_data.circulating_supply.toFixed(2)}</span>
      </div>
      <div>
        <h4>1y change</h4>
        <span>{data.market_data.price_change_percentage_1y.toFixed(2)}%</span>
      </div>
    </div>
  );
};
