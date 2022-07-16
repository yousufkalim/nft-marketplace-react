import React from "react";
import { Button, Form, Input, Switch } from "antd";

const Security = () => {
  return (
    <div>
      <Form name="basic" layout="horizontal">
        <div className="tabform_part_1">
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item
                name="curr_passowrd"
                label="Current Password"
                // labelCol={{span:24}}
                // wrapperCol={{span:24}}
                rules={[
                  {
                    required: true,
                    message: "Please input current password!",
                  },
                ]}
              >
                <Input.Password placeholder="" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item
                name="new_passowrd"
                label="New Password"
                // labelCol={{span:24}}
                // wrapperCol={{span:24}}
                rules={[
                  {
                    required: true,
                    message: "Please input New password!",
                  },
                ]}
              >
                <Input.Password placeholder="" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item
                name="confirm_passowrd"
                label="Confirm Password"
                // labelCol={{span:24}}
                // wrapperCol={{span:24}}
                rules={[
                  {
                    required: true,
                    message: "Please confirm new password!",
                  },
                ]}
              >
                <Input.Password placeholder="" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item
                name="phone_number"
                label="Phone number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <span className="nextButton">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {"Save changes"}
              </Button>
            </Form.Item>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default Security;
