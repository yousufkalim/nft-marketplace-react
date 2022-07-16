import { Button, Form, Input, Switch } from "antd";
import React from "react";

const Account = () => {
  return (
    <div>
      <Form name="basic" layout="horizontal">
        <div className="tabform_part_1 _space_inner_de">
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="fullname" label="Full name">
                <Input placeholder="Full Name" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="username" label="Username">
                <Input placeholder="Username" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="website" label="Website">
                <Input placeholder="example.com" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="Description" label="Description">
                <Input.TextArea
                  placeholder="Not more than 100 words"
                  style={{ height: 150 }}
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
        <div className="deactivate_acc_last">
          <hr />
          <div className="switch_antd _space_inner_de">
            <Form.Item
              label="Deactivate account"
              labelAlign="right"
              // valuePropName="checked"
              className="firstSwitch"
            >
              <Switch
                size="small"
                // checked='true'
                // onChange={() => setIsMintLocked(!isMintLocked)}
              />
            </Form.Item>
            <div className="_field_out">
              <div className="fields_input_data">
                <Form.Item
                  name="deactivate_reason"
                  label="Reason to deactivate"
                >
                  <Input.TextArea
                    placeholder="Why you are deactivating your account?"
                    style={{ height: 150 }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Account;
