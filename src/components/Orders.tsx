import * as React from "react";
import { OrderBlotterWindow } from "./OrderBlotterWindow";

export interface OrdersProps {
  history: any;
}

export default class Orders extends React.Component<OrdersProps> {
  render() {
    return (
      <div>
        <h1>Order Blotter:</h1>
        <OrderBlotterWindow history={this.props.history} />
      </div>
    );
  }
}
