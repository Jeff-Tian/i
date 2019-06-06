import * as React from "react";
import { Col, Layout, Row } from "antd";
const { Footer } = Layout;

export default class SiteFooter extends React.Component {
  render() {
    return (
      <Footer>
        <Row gutter={16}>
          <Col span={6}>
            <h3>Related Resources</h3>
            <p>
              <a
                href="http://tushare.org/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Tushare.org
              </a>
            </p>
            <p>
              <a
                href="https://www.useit.com.cn/thread-10573-1-1.html"
                target="_blank"
                rel="noreferrer noopener"
              >
                证券交易系统架构设计
              </a>
            </p>
            <p>
              <a
                href="https://github.com/vnatesh/VWAP-Prediction"
                target="_blank"
                rel="noreferrer noopener"
              >
                VWAP
              </a>
            </p>
          </Col>
          <Col span={6}>
            <h3>Features</h3>
            <p>
              <a
                href="https://www.evernote.com/l/AGo96kMBMD5CoZhX86s7zMtBFVPxDfWHoaM"
                target="_blank"
                rel="noreferrer noopener"
              >
                金融信息系统
              </a>
            </p>
          </Col>
          <Col span={6}>
            <h3>Help</h3>
            <p>TODO</p>
          </Col>
          <Col span={6}>
            <h3>More</h3>
            <p>TODO</p>
          </Col>
        </Row>
      </Footer>
    );
  }
}
