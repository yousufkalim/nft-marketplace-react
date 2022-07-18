import { Form, Switch, Button } from "antd";
import React from "react";

const Notification = () => {
  return (
    <div>
      <Form name="basic" layout="horizontal">
        <div className="deactivate_acc_last">
          <div className="switch_antd _space_inner_de">
            <div className="switch_antd_subscription">
              <p>Your subscriptions</p>
            </div>
          </div>
          <hr />
          <div className="switch_antd _space_inner_de">
            <div className="outer_layer_select">
              <Form.Item
                label="Newsletter"
                labelAlign="right"
                className="firstSwitch"
              >
                <Switch size="small" />
              </Form.Item>
              <p className="get_promo_subs">
                Get latest news and learn new opportunities
              </p>
            </div>
            <span className="nextButton">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {"Save changes"}
                </Button>
              </Form.Item>
            </span>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Notification;
