import React from "react";
import { Input, Form, Button, Select, Switch, Upload } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import PAGE_HEADER from "../../images/Page_Header.svg";

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
    console.log('Upload event:', e);
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
        <Form.Item label="Dragger">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCollectionUploadImage;
