import React, { useState } from "react";
import PAGE_HEADER from "../../images/Page_Header.svg";
import AUTH_ICON from "../../images/auth_icon.svg";
import { Input, Form, Button } from "antd";
import { ForgotPasswordAPI } from "../../services/authServices";
import Spin from "../../components/presentational/Spin";
import { openNotification } from "../../components/Smart/Notification";
import "./ForgotPassword.scss";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email,setEmail]=useState('');
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = {
        email: values.email,
      };
      const { data } = await ForgotPasswordAPI(userData);
      setLoading(false);
      setIsEmailSent(true);
      setEmail(values.email);
      console.log("data", data);
    } catch (error) {
      setLoading(false);
      openNotification("Oops", "An error occured");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="ForgotPasswordWrapper">
        <div className="ForgotPasswordPageHeader">
          <img src={PAGE_HEADER} alt={"PAGE_HEADER"} />
        </div>
        <div className="ForgotPasswordForm">
          <div className="form">
            <span className="formHeadingWrapper">
              <span className="ForgotPasswordAcc">Reset password</span>
              <span className="ForgotPasswordIcon">
                <img src={AUTH_ICON} alt={"AUTH_ICON"} />
              </span>
            </span>
            {isEmailSent ? (
              <>
                <span className="emailSentMessage">
                  Please check your email at <span className="emailSent" >{email}</span> and click the
                  confirmation link. Thanks.
                </span>
              </>
            ) : (
              <>
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
                    name="email"
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
                    <Input placeholder="Enter email" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      {loading ? <Spin /> : "Submit"}
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default ForgotPassword;
