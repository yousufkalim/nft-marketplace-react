import React from "react";
import { Input, Form, Button, Select, Switch, Upload,Radio } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import PAGE_HEADER from "../../images/PageHeader.png";

import "./CreateCollectionUploadImage.scss";

const CreateCollectionUploadImage = () => {
  const onFinish = async (values) => {
    console.log("value", values);
    try {
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div className="CreateCollectionUploadImage">
      <div className="CreateCollectionHeader">
        <img src={PAGE_HEADER} alt={"PAGE_HEADER"} />
        <div className="CreateCollectionHeadingSection">
          <span className="CreateCollectionText">
            Become an NFT artist with NFTdepot
          </span>
          <span className="CreateCollectionHeading">Create a Collection</span>
        </div>
      </div>
      <div className="CreateCollectionUploadImageWrapper">
        <div className="dropZoneHeader">
          <div className="step2Header">
            <span className="step2">Step 2</span>
            <span className="desc">Upload Media</span>
            <span className="desc2">Accepted file formats: JPG, PNG, SVG</span>
          </div>
          <div className="uploadForm">
            <Form
              name="basic"
              initialValues={{
                remember: true,
                layout: "inline",
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <div>
                <div className="uploadFormItemWrapper">
                  <Form.Item>
                    <Form.Item
                      name="smallImage"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                    >
                      <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-text">Small Image</p>
                        <p className="ant-upload-hint">
                          Drag n drop or choose file
                        </p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Form.Item>

                  <Form.Item>
                    <Form.Item
                      name="largeImage"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                    >
                      <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-text">Large Image</p>
                        <p className="ant-upload-hint">
                          Drag n drop or choose file
                        </p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Form.Item>
                </div>
                <div className="bannerImage">
                  <Form.Item>
                    <Form.Item
                      name="largeImage"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      noStyle
                    >
                      <Upload.Dragger name="files" action="/upload.do">
                        <p className="ant-upload-text">Upload banner image</p>
                        <p className="ant-upload-hint">
                          Drag n drop or choose file
                        </p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Form.Item>
                </div>
                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                >
                  <Radio>
                  <div className="agree">I agree to the <span className="termConditions">Terms and Conditions</span> and <span className="termConditions">Privacy Policy</span></div>
                  </Radio>
                </Form.Item>
                <span className="submitButton">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {/* {loading ? <Spin /> : "Sign Up"} */}
                  Submit
                </Button>
              </Form.Item>
            </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionUploadImage;
