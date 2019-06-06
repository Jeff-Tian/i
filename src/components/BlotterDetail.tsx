import * as React from "react";
import { LimitOrderBookBlotterWindow } from "./LimitOrderBookBlotterWindow";
import StockMarket from "../common/StockMarket";
import { Icon } from "antd";

export interface BlotterDetailProps {
  match: {
    params: any;
  };
}

export interface BlotterDetailState {
  blotterDetail: any;
  loading: boolean;
}

export class BlotterDetail extends React.Component<
  BlotterDetailProps,
  BlotterDetailState
> {
  private refreshBlotter = true;

  constructor(props: BlotterDetailProps) {
    super(props);

    this.state = {
      blotterDetail: require("../cache/blotter-detail.json"),
      loading: true
    };

    this.refreshBlotter = true;
  }

  async componentDidMount(): Promise<void> {
    const {
      match: {
        params: { symbol }
      }
    } = this.props;

    await this.updateBlotter(symbol);
  }

  async componentWillUnmount() {
    console.log("unmounting...");
    this.refreshBlotter = false;
  }

  private async updateBlotter(symbol: string) {
    try {
      this.setState({ loading: true });

      const blotter = await (await fetch(
        "https://bitqbit.herokuapp.com/blotter/" + symbol
      )).json();
      console.log("blotter = ", blotter);

      this.setState({ blotterDetail: blotter });

      if (StockMarket.isTransactionTime() && this.refreshBlotter) {
        await this.updateBlotter(symbol);
      }
    } catch (ex) {
      console.error(ex);

      if (this.refreshBlotter) {
        await this.updateBlotter(symbol);
      }
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      match: {
        params: { symbol }
      }
    } = this.props;

    const { blotterDetail, loading } = this.state;

    return (
      <div>
        <h2>
          Blotter Detail of <strong>{symbol}</strong>{" "}
          <strong>{blotterDetail.name}</strong>{" "}
          {this.state.loading && <Icon type="loading" />}
        </h2>
        <p>
          Last updated at:{" "}
          <strong>
            {blotterDetail.date} {blotterDetail.time}
          </strong>
        </p>
        <p>
          pre close: <strong>{blotterDetail.pre_close}</strong> open:{" "}
          <strong>{blotterDetail.open}</strong>
        </p>
        <p>
          high: <strong>{blotterDetail.high}</strong> low:{" "}
          <strong>{blotterDetail.low}</strong>
        </p>
        <LimitOrderBookBlotterWindow
          blotter={blotterDetail}
          loading={loading}
        />
      </div>
    );
  }
}
