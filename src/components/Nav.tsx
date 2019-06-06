import * as React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
export interface NavProps {}

export const Nav = (props: NavProps) => (
  <Menu
    mode="horizontal"
    theme="dark"
    style={{ lineHeight: "64px" }}
    defaultSelectedKeys={[
      location.pathname.replace(process.env.ASSET_PATH, "/")
    ]}
  >
    <Menu.Item key="/en">
      <Link to={"/en"}>Home</Link>
    </Menu.Item>
    <Menu.Item key="/en/why">
      <Link to={"/en/why"}>Why</Link>
    </Menu.Item>
    <Menu.Item key="/source">
      <a
        href="https://github.com/Jeff-Tian/i"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source
      </a>
    </Menu.Item>
  </Menu>
);
