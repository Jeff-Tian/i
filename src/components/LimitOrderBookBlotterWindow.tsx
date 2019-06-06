import * as React from "react";
import { Table } from "antd";
import StockMarket from "../common/StockMarket";

const columns = [
  {
    title: "Bid",
    dataIndex: "bid",
    key: "bid"
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price"
  },
  { title: "Ask", dataIndex: "ask", key: "ask" }
];

export interface LimitOrderBookBlotterProps {
  blotter: any;
  loading: boolean;
}

export const LimitOrderBookBlotterWindow = (
  props: LimitOrderBookBlotterProps
) => {
  const { blotter, loading } = props;

  const data = [
    {
      key: -5,
      bid: "",
      price: StockMarket.showPrice(blotter, blotter.a5_p),
      ask: blotter.a5_v
    },
    {
      key: -4,
      bid: "",
      price: StockMarket.showPrice(blotter, blotter.a4_p),
      ask: blotter.a4_v
    },
    {
      key: -3,
      bid: "",
      price: StockMarket.showPrice(blotter, blotter.a3_p),
      ask: blotter.a3_v
    },
    {
      key: -2,
      bid: "",
      price: StockMarket.showPrice(blotter, blotter.a2_p),
      ask: blotter.a2_v
    },
    {
      key: -1,
      bid: "",
      price: StockMarket.showPrice(blotter, blotter.a1_p),
      ask: blotter.a1_v
    },
    {
      key: 0,
      bid: "",
      price: StockMarket.showPrice(blotter, blotter.price),
      ask: ""
    },
    {
      key: 1,
      bid: blotter.b1_v,
      price: StockMarket.showPrice(blotter, blotter.b1_p),
      ask: ""
    },
    {
      key: 2,
      bid: blotter.b2_v,
      price: StockMarket.showPrice(blotter, blotter.b2_p),
      ask: ""
    },
    {
      key: 3,
      bid: blotter.b3_v,
      price: StockMarket.showPrice(blotter, blotter.b3_p),
      ask: ""
    },
    {
      key: 4,
      bid: blotter.b4_v,
      price: StockMarket.showPrice(blotter, blotter.b4_p),
      ask: ""
    },
    {
      key: 5,
      bid: blotter.b5_v,
      price: StockMarket.showPrice(blotter, blotter.b5_p),
      ask: ""
    }
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
};
