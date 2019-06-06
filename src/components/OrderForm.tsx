import { Form, Input } from "antd";
import * as React from "react";
import { FormComponentProps } from "antd/lib/form";

interface OrderFormProps extends FormComponentProps {
  symbol: string;
  side: string;
  price: number;
  qty: number;
  client: string;
  destination: string;
  onChange: (changedFields: any) => void;
}

class OrderForm extends React.Component<OrderFormProps, any> {
  componentWillUnmount(): void {
    console.log("form reseting...");
    const { resetFields } = this.props.form;
    resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { symbol, side, price, qty, client, destination } = this.props;

    return (
      <Form
        labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
        wrapperCol={{
          xs: { span: 24 },
          sm: { span: 16 }
        }}
        onSubmit={() => {}}
      >
        <Form.Item label={"Symbol"}>
          {getFieldDecorator("symbol", {
            initialValue: symbol,
            rules: [
              { type: "string", message: "for example, 600848" },
              { required: true, message: "Please input symbol!" }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Side"}>
          {getFieldDecorator("side", {
            initialValue: side,
            rules: [
              { type: "string", message: "" },
              { required: true, message: "" }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Price"}>
          {getFieldDecorator("price", {
            initialValue: price,
            rules: [{ required: true, message: "" }]
          })(<Input type={"number"} />)}
        </Form.Item>
        <Form.Item label={"Qty"}>
          {getFieldDecorator("qty", {
            initialValue: qty,
            rules: [{ required: true, message: "" }]
          })(<Input type={"number"} />)}
        </Form.Item>
        <Form.Item label={"Client"}>
          {getFieldDecorator("client", {
            initialValue: client,
            rules: [
              {
                type: "string",
                message: ""
              },
              {
                required: true,
                message: ""
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label={"Destination"}>
          {getFieldDecorator("destination", {
            initialValue: destination,
            rules: [
              { type: "string", message: "" },
              { required: true, message: "" }
            ]
          })(<Input />)}
        </Form.Item>
      </Form>
    );
  }
}

export const EnhancedOrderForm = Form.create<OrderFormProps>({
  name: "orderForm",
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  }
})(OrderForm);
