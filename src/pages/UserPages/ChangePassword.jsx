import React, { useState } from "react";
import PAGE_HEADER from "../../images/PageHeader.png";
import AUTH_ICON from "../../images/auth_icon.svg";
import { Input, Form, Button } from "antd";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import Spin from "../../components/presentational/Spin";
import { openNotification } from "../../components/Smart/Notification";
import { useSelector } from "react-redux";
import { ChangePasswordAPI } from "../../services/userServices";
import "./ChangePassword.scss";
import useWindowSize from "../../helpers/hooks";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = {
        new_password: values.password,
        confirm_password: values.confirmPassword,
        email: user.email,
        token: localStorage.getItem("token"),
      };
      const { data } = await ChangePasswordAPI(userData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      openNotification("Oops", error?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [browserWidth]=useWindowSize();

  return (
    <>
      <div className="ChangePasswordWrapper">
        <div className="ChangePasswordPageHeader">
          <img src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={"PAGE_HEADER"} />
        </div>
        <div className="ChangePasswordFormWrapper">
          <div className="ChangePasswordForm">
            <div className="form">
              <span className="formHeadingWrapper">
                <span className="ChangePasswordAcc">Reset password</span>
                <span className="ChangePasswordIcon">
                  <img src={AUTH_ICON} alt={"AUTH_ICON"} />
                </span>
              </span>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
              >
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input your confirmPassword!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {loading ? <Spin /> : "Reset Password"}
                  </Button>
                </Form.Item>
                <Form.Item>
                  <span className="passInfo">
                    Password must be 8 characters long. Should have at least 1
                    uppercase letter.
                  </span>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
