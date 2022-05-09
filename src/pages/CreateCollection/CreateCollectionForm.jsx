import React,{useState} from "react";
import { Input, Form, Button, Select, Switch } from "antd";
import { Link } from "react-router-dom";
import RightArrow from "../../images/rightIcon.svg";
import "./CreateCollectionForm.scss";
import { useHistory } from "react-router-dom";

const CreateCollectionForm = () => {

  const [isExplicit, setIsExplicit] = useState(false);
  const [isMintable, setIsMintable] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const history=useHistory();

  const onFinish = async (values) => {
    console.log("value", values);
    try {
        history.push("/createCollectionUploadImage");
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="CreateCollectionFormWrapper">
        <div className="step1Header">
          <span className="step1">Step 1</span>
          <span className="desc" >Fill the following fields</span>
        </div>
        <div className="CreateCollectionForm">
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
            <div className="CreateCollectionFormItemWrapper">
              <Form.Item
                name="storename"
                rules={[
                  {
                    required: true,
                    message: "Please input your storeName!",
                  },
                ]}
              >
                <Input placeholder="Store name" />
              </Form.Item>
              <Form.Item
                name="instagramLink"
                rules={[
                  {
                    required: true,
                    message: "Please input your Instagram link !",
                  },
                ]}
              >
                <Input placeholder="Instagram link " />
              </Form.Item>
              <Form.Item
                name="shortDescription"
                rules={[
                  {
                    required: true,
                    message: "Please input your Short Description!",
                  },
                ]}
              >
                <Input placeholder="Short Description" />
              </Form.Item>

              <Form.Item
                name="personalLink"
                rules={[
                  {
                    required: true,
                    message: "Please input your Personal link!",
                  },
                ]}
              >
                <Input placeholder="Personal link" />
              </Form.Item>

              <Form.Item
                name="longDescription"
                rules={[
                  {
                    required: true,
                    message: "Please input your Long description!",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Long description"
                  style={{ height: 120 }}
                />
              </Form.Item>

              <span>
                <Form.Item
                  name="mediaLink"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Media link!",
                    },
                  ]}
                >
                  <Input placeholder="Media link" />
                </Form.Item>

                <Form.Item
                  name="discordLink"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Discord link!",
                    },
                  ]}
                >
                  <Input placeholder="Discord link" />
                </Form.Item>
              </span>

              <Form.Item
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please select a Category!",
                  },
                ]}
              >
                <Select placeholder="Category">
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="afterPurchaseMessage"
                rules={[
                  {
                    required: true,
                    message: "Please input After purshase message!",
                  },
                ]}
              >
                <Input placeholder="After purshase message" />
              </Form.Item>

              <Form.Item
                name="mintingSupply"
                rules={[
                  {
                    required: true,
                    message: "Please input Minting supply!",
                  },
                ]}
              >
                <Input placeholder="Minting supply" />
              </Form.Item>

              <Form.Item
                name="mintingCoin"
                rules={[
                  {
                    required: true,
                    message: "Please input Minting coin!",
                  },
                ]}
              >
                <Input placeholder="Minting coin" />
              </Form.Item>

              <span className="dFlex">
                <Form.Item
                  label="Explicit"
                  labelAlign="left"
                  valuePropName="checked"
                  className="firstSwitch"
                >
                  <Switch size="small" checked={isExplicit} onChange={()=>setIsExplicit(!isExplicit)} />
                </Form.Item>

                <Form.Item
                  label="Mintable"
                  labelAlign="left"
                  valuePropName="checked"
                >
                  <Switch size="small" checked={isMintable} onChange={()=>setIsMintable(!isMintable)}  />
                </Form.Item>

                <Form.Item
                  label="Active"
                  labelAlign="left"
                  valuePropName="checked"
                >
                  <Switch size="small" checked={isActive} onChange={()=>setIsActive(!isActive)}  />
                </Form.Item>
              </span>
            </div>

            <span className="nextButton">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {/* {loading ? <Spin /> : "Sign Up"} */}
                  Next
                  <img src={RightArrow} alt={"RightArrow"} />
                </Button>
              </Form.Item>
            </span>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateCollectionForm;
