import { Button, Form, Input, Switch } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DropZone from "../../../components/Smart/DropZone/DropZone";
import { openNotification } from "../../../components/Smart/Notification";
import { updateProfileAPI } from "../../../services/userServices";
import "./Account.scss";

const Account = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(
    user?.image_profile_location
  );

  const onFinish = async (values) => {
    setLoading(true);
    const updatedData = {
      ...user,
      first_name: values?.first_name ?? user?.first_name,
      last_name: values?.last_name ?? user?.last_name,
      username: values?.valuesname ?? user?.username,
      email: values?.email ?? user?.email,
      address1: values?.address1 ?? user?.address1,
      address2: values?.address2 ?? user?.address2,
      country: values?.country ?? user?.country,
      phone1: values?.phone1 ?? user?.phone1,
      company: values?.company ?? user?.company,
    };

    try {
      const res = await updateProfileAPI(updatedData);
      setLoading(false);
      openNotification("Success",'Data Updated Successfully')
    } catch (e) {
      openNotification("Oops", e?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="accSettingWrapper">
      <div className="dropZoneWrapper">
        <div className="dropZoneSection">
          <DropZone
            selectedImage={profileImage}
            setSelectedImage={setProfileImage}
            imageType="profile"
          />
        </div>
      </div>
      <Form
        name="basic"
        layout="horizontal"
        scrollToFirstError="true"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        initialValues={{
          first_name: user?.first_name ?? "",
          last_name: user?.last_name ?? "",
          username: user?.username ?? "",
          email: user?.email ?? "",
          address1: user?.address1 ?? "",
          address2: user?.address2 ?? "",
          country: user?.country ?? "",
          phone1: user?.phone1 ?? "",
          company: user?.company ?? "",
        }}
      >
        <div className="tabform_part_1 _space_inner_de">
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="first_name" label="First Name">
                <Input placeholder="First Name" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="last_name" label="Last Name">
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="username" label="Username">
                <Input placeholder="Username" readOnly />
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
                <Input placeholder="Email" readOnly />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="address1" label="Primary Address">
                <Input placeholder="Primary Address" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="address2" label="Secondary Address">
                <Input placeholder="Secondary Address" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="country" label="Country">
                <Input placeholder="Country" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="phone1" label="Phone Number">
                <Input placeholder="Phone Number" />
              </Form.Item>
            </div>
          </div>
          <div className="_field_out">
            <div className="fields_input_data">
              <Form.Item name="company" label="Company">
                <Input placeholder="Company" />
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

export default Account;
