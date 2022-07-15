import React, { useState } from "react";
import PAGE_HEADER from "../../images/PageHeader.png";
import AUTH_ICON from "../../images/auth_icon.svg";
import { Input, Form, Button, Radio } from "antd";
import { Link } from "react-router-dom";
import { SignUpAPI, VerifyEmailAPI } from "../../services/authServices";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import "./SignUp.scss";
import { useHistory } from "react-router-dom";
import { openNotification } from "../../components/Smart/Notification";
import Spin from "../../components/presentational/Spin";
import useWindowSize from "../../helpers/hooks";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [newsTeller, setNewsTeller] = useState(false);

  const history = useHistory();
  const onFinish = async (values) => {
    if (isAgree) {
      setLoading(true);
      try {
        const data = {
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          password: values.password,
          confirm_password: values.confirmPassword,
          wallet_id:
            values.wallet_id || "0xE7b3D35c1939592332735E6300b4DC00d3A3E5B0",
          // newsTeller:values.newsTeller
        };
        const res = await SignUpAPI(data);
        setLoading(false);
        openNotification("SignUp Successfully", "You can login now");
        history.push("/auth/login");
      } catch (error) {
        setLoading(false);
        openNotification("Oops", error?.response?.data?.message);
      }
    } else {
      openNotification("Error", "Please agree to the terms & conditions.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [browserWidth] = useWindowSize();

  const checkEmail = async (_, email) => {
    const res = await VerifyEmailAPI(email);
    if (res?.data?.body?.exists) {
      return Promise.reject("rejected");
    } else {
      return Promise.resolve(true);
    }
  };

  return (
    <>
      <div className="signUpWrapper">
        <div className="SignUpPageHeader">
          <img
            src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER}
            alt={"PAGE_HEADER"}
          />
        </div>
        <div className="registerFormWrapper main_page_width">
          <div className="registerForm">
            <div className="form">
              <span className="formHeadingWrapper">
                <span className="registerAcc">Register a new account</span>
                <span className="registerIcon">
                  <img src={AUTH_ICON} alt={"AUTH_ICON"} />
                </span>
              </span>
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="firstName"
                  label="First Name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your firstName!",
                    },
                  ]}
                >
                  <Input placeholder="FirstName" />
                </Form.Item>

                <Form.Item
                  name="lastName"
                  label="Last Name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    {
                      required: true,
                      message: "Please input your lastName!",
                    },
                  ]}
                >
                  <Input placeholder="LastName" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  validateFirst={true}
                  validateTrigger="onChange"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                    {
                      validator: checkEmail,
                      message: `This email is already associated to an account`,
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
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
                  label="Confirm Password"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
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
                <Form.Item name="termsAndCondition">
                  <Radio
                    checked={isAgree}
                    onClick={() => setIsAgree((prev) => !prev)}
                  >
                    I agreee to the{" "}
                    <Link
                      to="/TermsAndCondition"
                      target="_blank"
                      style={{ color: "#F37342" }}
                    >
                      Terms & Conditions
                    </Link>
                  </Radio>
                </Form.Item>

                <Form.Item name="newsTeller">
                  <Radio
                    checked={newsTeller}
                    onClick={() => setNewsTeller((prev) => !prev)}
                  >
                    I want to subscribe to the newsletter and other updates
                  </Radio>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    {loading ? <Spin /> : "Sign Up"}
                  </Button>
                </Form.Item>
                <div className="alreadyAcc">
                  <Form.Item>
                    <Link to={"/auth/login"}>
                      <span className="toLoginText">
                        I already have an account
                      </span>
                    </Link>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
