import * as React from "react";
import {Modal} from "antd";

export interface NotTransactionTimeAlertProps {
    visible: boolean
}

export interface NotTransactionTimeAlertState {
    visible: boolean
}

export default class NotTransactionTimeAlert extends React.Component<NotTransactionTimeAlertProps, NotTransactionTimeAlertState> {
    constructor(props: NotTransactionTimeAlertProps) {
        super(props)

        this.state = {
            visible: props.visible
        }
    }

    render() {
        return (
            <Modal
                title="Not Transaction Time Alert!"
                visible={this.state.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
            >
                <h1>
                    交易时间
                </h1>
                <p>早上 9：30 - 11：30</p>
                <p>下午 13：00 - 15：00</p>

                <p>Note: The data will not be updated until transaction start! </p>
            </Modal>
        )
    }

    private handleOk() {
        this.setState({visible: false})
    }

    private handleCancel() {
        this.setState({visible: false})
    }
}