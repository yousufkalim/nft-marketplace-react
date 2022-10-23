import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { editNfAPI } from "../../../services/nftServices";
import Spin from "../../presentational/Spin";
import { openNotification } from "../Notification";
import "./EditNftModal.scss";

const EditNftModal = ({ visible, data, setVisible }) => {
  const formRef = useRef();
  const [form] = useForm();
  const [loading,setLoading]=useState(false)
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const onFinish = async (values) => {
    try{
      const nftData={
        description_short:values?.descriptionShort,
        description_long:values?.descriptionLong
      }
      const res=await editNfAPI(nftData,data?.guid);
      openNotification("Success","Nft Info Updated Successfully")
      setVisible(false)
    }
    catch(error){
      openNotification("Error",error?.response?.data?.message);
    }
  };

  const onFinishFailed = (error) => {
    console.log(error);
  };

  const onReset = () => {
    form.resetFields();
    setLoading(false)
  };

  useEffect(() => {
    return onReset();
  }, [data]);

  return (
    <>
      <Modal
        visible={visible}
        footer={null}
        title={<div className="editTitle">Edit Nft Details</div>}
        onOk={handleOk}
        onCancel={handleCancel}
        className="editNftModalWrapper"
      >
        <Form
          name="basic"
          initialValues={{
            remember: true,
            descriptionShort: data?.description_short,
            descriptionLong: data?.description_long,
          }}
          ref={formRef}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            name="descriptionShort"
            label="Short Description"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input Short Description",
              },
            ]}
          >
            <Input placeholder="Enter Short Description" />
          </Form.Item>
          <Form.Item
            name="descriptionLong"
            label="Long Description"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Please input Long Description",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter Long Description" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {loading ? <Spin /> : "Update"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditNftModal;
