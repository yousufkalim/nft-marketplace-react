import React from "react";
import PAGE_HEADER from "../../images/Page_Header.svg";
import { Input, Form, Button, Col, Row } from "antd";
import Spin from "../../components/presentational/Spin";
import { Link } from "react-router-dom";

import "./CreateNft.scss";

const CreateNft = () => {
  const onFinish = async (values) => {
    try {
    } catch (error) {
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="CreateNftWrapper">
        <div className="CreateNftHeader">
          <img src={PAGE_HEADER} alt={"PAGE_HEADER"} />
          <div className="CreateNftHeadingSection">
            <span className="CreateNftText">
              Become an NFT artist with NFTdepot
            </span>
            <span className="CreateNftHeading">Create your NFT</span>
          </div>
        </div>

        <div className="nftDetailForm">
          <Form
            name="basic"
            initialValues={{
              remember: true,
              layout:"inline"
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
              <div className="nftFormItemWrapper" >
            <Form.Item
              name="firstName"
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
              rules={[
                {
                  required: true,
                  message: "Please input your lastName!",
                },
              ]}
            >
              <Input placeholder="LirstName" />
            </Form.Item>
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

            {/* <Form.Item
                  name="number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={prefixSelector}
                    className="unsetLeftBorder"
                  />
                </Form.Item> */}

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
                {/* {loading ? <Spin /> : "Sign Up"} */}
                Create
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to={"/auth/login"}>
                <span className="toLoginText">I already have an account</span>
              </Link>
            </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateNft;
