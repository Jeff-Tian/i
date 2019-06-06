import * as React from "react";

import { AgGridReact } from "ag-grid-react";
import { Amendment } from "./Amendment";
import { CellClickedEvent } from "ag-grid-community/src/ts/events";
import * as SockJs from "sockjs-client";
import { Button, Progress } from "antd";
import Merge from "../common/Merge";

const Stomp = require("stompjs/lib/stomp.js").Stomp;

export interface OrderBlotterWindowProps {
  history: any;
}

export interface OrderBlotterWindowState {
  connected: boolean;
  connecting: boolean;
  showAmendmentWindow: boolean;
  orders: any[];
  selectedOrder?: any;
}

const data = {
  columnDefs: [
    {
      headerName: "Symbol",
      field: "symbol",
      resizeable: true
    },
    {
      headerName: "Side",
      field: "operation"
    },
    {
      headerName: "Price",
      field: "price"
    },
    { headerName: "Qty", field: "lots" },
    { headerName: "Client", field: "client" },
    { headerName: "% Fill", field: "fillPercentage" },
    { headerName: "Destination", field: "market", resizeable: true },
    { headerName: "Status", field: "status", resizeable: true }
  ],
  rowData: require("../cache/orders.json")
};

export class OrderBlotterWindow extends React.Component<
  OrderBlotterWindowProps,
  OrderBlotterWindowState
> {
  state = {
    showAmendmentWindow: false,
    connected: false,
    connecting: true,
    orders: data.rowData,
    selectedOrder: {}
  };

  onGridReady = (params: { api: any }) => {
    params.api.sizeColumnsToFit();
  };

  amend = (order?: any) => {
    this.setState({
      showAmendmentWindow: true,
      selectedOrder: order
    });
  };
  gotoLimitBlotter = (event: CellClickedEvent) => {
    if (event.column.getColId() === "symbol") {
      this.props.history.push("/en/blotter/" + event.data.symbol);
      return false;
    }

    this.amend(event.data);
  };
  private socket: any;
  private stompClient: any;

  componentDidMount() {
    console.log("new socket ing...");
    this.socket = new SockJs("https://qbit.jiwai.win/gs-guide-websocket");
    this.stompClient = Stomp.over(this.socket);
    console.log("stompClient = ", this.stompClient);

    this.stompClient.connect(
      {},
      (frame: any) => {
        console.log("Connected: " + frame);
        this.setState({ connected: true, connecting: false, orders: [] });

        this.stompClient.subscribe("/topic/order/live", (res: any) => {
          this.setState({
            orders: Merge.byKey(this.state.orders, JSON.parse(res.body), "id")
          });
        });
      }
    );
  }

  componentWillUnmount(): void {
    if (!!this.stompClient) {
      this.stompClient.disconnect();
    }

    this.stompClient = null;
  }

  render() {
    return (
      <div>
        <Button
          type="primary"
          loading={this.state.connecting}
          onClick={() => this.amend({})}
        >
          Place Order
        </Button>
        <div>
          {!this.state.connected &&
            !this.state.connecting && (
              <Progress percent={0} status="exception" showInfo={false} />
            )}
          {this.state.connected && (
            <Progress percent={100} status="active" showInfo={false} />
          )}
        </div>
        <div
          className="ag-theme-balham"
          style={{ height: "400px", width: "100%" }}
        >
          <AgGridReact
            columnDefs={data.columnDefs}
            rowData={this.state.orders}
            defaultColDef={{ resizable: true }}
            onGridReady={this.onGridReady}
            onCellClicked={this.gotoLimitBlotter.bind(this)}
          />
          <Amendment
            visible={this.state.showAmendmentWindow}
            onOK={() => this.setState({ showAmendmentWindow: false })}
            onCancel={() => this.setState({ showAmendmentWindow: false })}
            order={this.state.selectedOrder}
          />
        </div>
      </div>
    );
  }
}
