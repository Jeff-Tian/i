import { BlotterDetail } from "../components/BlotterDetail";

require("../common/service-worker");
import * as React from "react";
import * as ReactDOM from "react-dom";

import { Layout } from "antd";
const { Header, Content } = Layout;
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "../less/layout.less";
import { Nav } from "../components/Nav";
import SiteFooter from "../components/SiteFooter";
import Home from "../components/Home";
import Orders from "../components/Orders";

export interface IndexProps {
  history: any;
}

class Index extends React.Component<IndexProps> {
  componentDidMount(): void {
    this.props.history.push("/en/");
  }

  render() {
    return <div>Index Again</div>;
  }
}

ReactDOM.render(
  <div>
    <BrowserRouter basename={process.env.ASSET_PATH}>
      <Layout>
        <Header>
          <div className="logo">
            <img src={require("../static/images/logo.jpg")} />
          </div>
          <Nav />
        </Header>
        <Content style={{ padding: "24px 50px" }}>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/en/" component={Home} />
            <Route exact path="/en/orders" component={Orders} />
            <Route exact path="/en/blotter/:symbol" component={BlotterDetail} />
            <Route path="*" component={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </Content>
        <SiteFooter />
      </Layout>
    </BrowserRouter>
  </div>,
  document.getElementById("main")
);
