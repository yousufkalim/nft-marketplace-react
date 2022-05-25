import React, { useEffect, useState } from "react";
import { Input, Form, Button, Select, Switch, InputNumber } from "antd";
import RightArrow from "../../images/rightIcon.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collectionDataSuccess } from "../../store/collectionForm/collectionActions";
import { checkStroeNameAvailability, codesAPI } from "../../services/createCollectionServices";
import "./CreateCollectionForm.scss";
import { openNotification } from "../../components/Smart/Notification";
import Spin from "../../components/presentational/Spin";

const CreateCollectionForm = () => {
  const [isExplicit, setIsExplicit] = useState(false);
  const [isMintable, setIsMintable] = useState(false);
  // const [isActive, setIsActive] = useState(false);
  const [categoryCodes, setCategoryCodes] = useState([]);
  const [layoutCodes, setLayoutCodes] = useState([]);
  const [mintingCoin, setMintingCoin] = useState([]);
  const [whoPaysFee, setWhoPaysFee] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const user = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCode = async () => {
      try {
        const res = await codesAPI("categoryCodes");
        setCategoryCodes(res.data);
        const response = await codesAPI("layoutCodes");
        setLayoutCodes(response?.data);
        const respons = await codesAPI("Minting Coin");
        setMintingCoin(respons?.data);
        const feeData = await codesAPI("WhoPaysFees");
        setWhoPaysFee(feeData?.data);
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      }
    };
    getCode();
  }, []);


  const onFinish = async (values) => {
    setIsLoading(true);
    const data = {
      store_name: values.storename ?? "",
      url_instagram: values.instagramLink ?? "",
      description_short: values.shortDescription ?? "",
      description_long: values.longDescription ?? "",
      url_personal: values.personalLink ?? "",
      url_medium: values.mediaLink ?? "",
      url_discord: values.discordLink ?? "",
      url_telegram: "",
      after_1st_purchase_text: values.afterPurchaseMessage ?? "",
      minting_supply_count: values.mintingSupply ?? 0,
      minting_coin: values.mintingCoin ?? "",
      mint_locked: values.mintLocked ?? 0,
      layout_style_code: values?.layoutCode ?? "",
      is_explicit: isExplicit ? 1 : 0,
      mintable: isMintable ? 1 : 0,
      isActive: 1,
      created_by: user?.first_name ?? "",
      created_date: new Date().toLocaleString(),
      category_code: values.category ?? "",
      url_name: "",
      delay_days: values.delayDays ?? 0,
      royalty_percent: values.royaltyPercent ?? 0,
      third_party_royalty_percent: values.thirdPartyRoyaltyPercent ?? 0,
      third_party_wallet_id: values.thirdPartyWalletId ?? "",
      who_pays_fees: values?.whoPayFee ?? "",
    };
    try {
      const res=await checkStroeNameAvailability(values.storename);
      if(res?.data?.body?.exists){
        openNotification("Oops", "Store name already exists");
        setIsLoading(false);
      }
      else{
      dispatch(collectionDataSuccess(data));
      history.push("/createCollectionUploadImage");
      setIsLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
      openNotification("Oops", "Something went wrong");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="CreateCollectionFormWrapper">
        <div className="step1Header">
          <span className="step1">Step 1</span>
          <span className="desc">Fill the following fields</span>
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
                // validateStatus={isStoreNameAvailable ? "success" : "error"}
                // help="Store name should be unique"
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your Instagram link !",
                //   },
                // ]}
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
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your Personal link!",
                //   },
                // ]}
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

              <span className="mediaAndDiscordLinks">
                <Form.Item
                  name="mediaLink"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Media link!",
                  //   },
                  // ]}
                >
                  <Input placeholder="Medium link" />
                </Form.Item>

                <Form.Item
                  name="discordLink"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Please input your Discord link!",
                  //   },
                  // ]}
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
                  {categoryCodes?.body?.map((item) => {
                    return (
                      <Select.Option value={item?.code}>
                        {item?.code}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="afterPurchaseMessage"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input After purshase message!",
                //   },
                // ]}
              >
                <Input placeholder="After purshase message" />
              </Form.Item>

              <Form.Item
                name="mintingSupply"
                rules={[
                  {
                    required: true,
                    message: "Please input Minting supply Count!",
                  },
                ]}
              >
                <InputNumber placeholder="Minting supply Count" controls={false} />
              </Form.Item>

              <Form.Item
                name="mintingCoin"
                rules={[
                  {
                    required: true,
                    message: "Please select a Minting Coin!",
                  },
                ]}
              >
                <Select placeholder="Minting Coin">
                  {mintingCoin?.body?.map((item) => {
                    return (
                      <Select.Option value={item?.code}>
                        {item?.code}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

               <Form.Item
                name="mintLocked"
                rules={[
                  {
                    required: true,
                    message: "Please input mint Locked!",
                  },
                ]}
              >
                <InputNumber placeholder="Mint Locked" controls={false} />
              </Form.Item>

               <Form.Item
                name="mintable"
                rules={[
                  {
                    required: true,
                    message: "Please input mintable!",
                  },
                ]}
              >
                <InputNumber placeholder="mintable" controls={false} />
              </Form.Item>

              <Form.Item
                name="delayDays"
                rules={[
                  {
                    required: true,
                    message: "Please input Delay Days!",
                  },
                ]}
              >
                <InputNumber placeholder="Delay Days" controls={false} />
              </Form.Item>   

              <Form.Item
                name="royaltyPercent"
                rules={[
                  {
                    required: true,
                    message: "Please input Royalty Percent!",
                  },
                ]}
              >
                <InputNumber placeholder="Royalty Percent" controls={false} />
              </Form.Item>    

              <Form.Item
                name="thirdPartyRoyaltyPercent"
                rules={[
                  {
                    required: true,
                    message: "Please input third Party Royalty Percent!",
                  },
                ]}
              >
                <InputNumber placeholder="Third Party Royalty Percent" controls={false} />
              </Form.Item>    

              <Form.Item
                name="thirdPartyWalletId"
                rules={[
                  {
                    required: true,
                    message: "Please input Third party wallet id!",
                  },
                ]}
              >
                <Input placeholder="Third party wallet id" />
              </Form.Item>           

              <Form.Item
                name="layoutCode"
                rules={[
                  {
                    required: true,
                    message: "Please select a Layout_Code!",
                  },
                ]}
              >
                <Select placeholder="layout">
                  {layoutCodes?.body?.map((item) => {
                    return (
                      <Select.Option value={item?.code}>
                        {item?.code}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>



              <Form.Item
                name="whoPayFee"
                rules={[
                  {
                    required: true,
                    message: "Please select a role who pays fee!",
                  },
                ]}
              >
                <Select placeholder="Who Pay Fee">
                  {whoPaysFee?.body?.map((item) => {
                    return (
                      <Select.Option value={item?.code}>
                        {item?.code}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <span className="dFlex">
                <Form.Item
                  label="Explicit"
                  labelAlign="left"
                  valuePropName="checked"
                  className="firstSwitch"
                >
                  <Switch
                    size="small"
                    checked={isExplicit}
                    onChange={() => setIsExplicit(!isExplicit)}
                  />
                </Form.Item>

                <Form.Item
                  label="Mintable"
                  labelAlign="left"
                  valuePropName="checked"
                >
                  <Switch
                    size="small"
                    checked={isMintable}
                    onChange={() => setIsMintable(!isMintable)}
                  />
                </Form.Item>

                {/* <Form.Item
                  label="Active"
                  labelAlign="left"
                  valuePropName="checked"
                >
                  <Switch
                    size="small"
                    checked={isActive}
                    onChange={() => setIsActive(!isActive)}
                  />
                </Form.Item> */}
              </span>
            </div>

            <span className="nextButton">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {isLoading ? <Spin /> : "Next"}
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
