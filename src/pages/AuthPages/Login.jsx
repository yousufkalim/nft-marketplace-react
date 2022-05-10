import React, { useState } from "react";
import PAGE_HEADER from "../../images/PageHeader.png";
import AUTH_ICON from "../../images/auth_icon.svg";
import { Input, Form, Button } from "antd";
import { Link } from "react-router-dom";
import { LoginAPI, SignUpAPI } from "../../services/authServices";
import { useHistory } from "react-router-dom";
import { openNotification } from "../../components/Smart/Notification";
import Spin from "../../components/presentational/Spin";
import Footer from "../../components/Layout/Footer/Footer";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { LoginSuccess, setProfile } from "../../store/auth/authActions";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch=useDispatch();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = {
        email: values.email,
        password: values.password,
      };
      const {data} = await LoginAPI(userData);
      setLoading(false);
      localStorage.setItem('token',data?.body?.token);
      dispatch(LoginSuccess());
      dispatch(setProfile(data?.user));
      openNotification("Login Successfully", "Welcome to the app");
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
      <div className="LoginWrapper">
        <div className="LoginPageHeader">
          <img src={PAGE_HEADER} alt={"PAGE_HEADER"} />
        </div>
        <div className="loginFormWrapper">
        <div className="loginForm">
          <div className="form">
            <span className="formHeadingWrapper">
              <span className="loginAcc">Login with your account</span>
              <span className="loginIcon">
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
                <Input placeholder="Email" />
              </Form.Item>

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

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {loading ? <Spin /> : "Login"}
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to={"/auth/forgotPassword"}>
                  <span className="toLoginText">Forgot password?</span>
                </Link>
              </Form.Item>
            </Form>
          </div>
          <div className="orText">
            <span>OR</span>
          </div>
          <div>
            <Link to={'/auth/signup'} >
            <div className="createAcc">
              <span className="createAccText">Create an account</span>
            </div>
            </Link>
          </div>
        </div>
        </div>
      </div>
      {/* <Footer/> */}
    </>
  );
};

export default Login;
