import * as React from "react";
import { Skeleton } from "antd";

export interface HomeProps {}

export interface HomeState {}

export default class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <div className="article">
        <Skeleton loading={false}>
          <div>
            <h4>i: My homepage always online!</h4>
            <p>
              Submit your homepage source code by Pull Request, and your site
              will be always online!
            </p>
          </div>
        </Skeleton>
      </div>
    );
  }

  async componentWillUnmount() {}
}
