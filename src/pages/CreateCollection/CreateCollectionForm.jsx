import React, { useEffect, useState } from "react";
import {
  Input,
  Form,
  Button,
  Select,
  Switch,
  InputNumber,
  Tooltip,
} from "antd";
import RightArrow from "../../images/rightIcon.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { collectionDataSuccess } from "../../store/collectionForm/collectionActions";
import {
  checkStroeNameAvailability,
  codesAPI,
} from "../../services/createCollectionServices";
import "./CreateCollectionForm.scss";
import { openNotification } from "../../components/Smart/Notification";
import Spin from "../../components/presentational/Spin";

const CreateCollectionForm = () => {
  const [isExplicit, setIsExplicit] = useState(false);
  const [isMintable, setIsMintable] = useState(false);
  // const [isActive, setIsActive] = useState(false);
  const [delayDays, setDelayDays] = useState(5);
  const [categoryCodes, setCategoryCodes] = useState([]);
  const [layoutCodes, setLayoutCodes] = useState([]);
  const [mintingCoin, setMintingCoin] = useState([]);
  const [whoPaysFee, setWhoPaysFee] = useState([]);
  const [isMintLocked, setIsMintLocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const user = useSelector((state) => state?.auth?.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCode = async () => {
      try {
        const res = await codesAPI("CategoryCode");
        setCategoryCodes(res.data);
        const response = await codesAPI("LayoutCodes");
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
      url_medium: values.mediumLink ?? "",
      url_discord: values.discordLink ?? "",
      url_telegram: values.telegramLink ?? "",
      after_1st_purchase_text: values.afterPurchaseMessage ?? "",
      minting_supply_count: values.mintingSupply ?? 0,
      minting_coin: values.mintingCoin ?? "",
      mint_locked: isMintLocked ? 1 : 0,
      layout_style_code: values?.layoutCode ?? "",
      is_explicit: isExplicit ? 1 : 0,
      mintable: isMintable ? 1 : 0,
      isActive: 1,
      created_by: user?.first_name ?? "",
      created_date: new Date().toLocaleString(),
      category_code: values.category ?? "",
      url_name: "",
      delay_days: delayDays,
      royalty_percent: values.royaltyPercent ?? 2,
      third_party_royalty_percent: values.thirdPartyRoyaltyPercent ?? 0,
      third_party_wallet_id: values.thirdPartyWalletId ?? "",
      who_pays_fees: "Seller",
    };
    try {
      const res = await checkStroeNameAvailability(values.storename);
      if (res?.data?.body?.exists) {
        openNotification("Oops", "Store name already exists");
        setIsLoading(false);
      } else {
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
            layout="vertical"
            initialValues={{
              remember: true,
              delayDays: 5,
              thirdPartyRoyaltyPercent: 0.0,
              instagramLink: "https://www.instagram.com/",
              personalLink: "yourSite.io",
              mediumLink: "https://medium.com/",
              discordLink: "https://discord.com/",
              telegramLink: "https://telegram.com/",
            }}
            scrollToFirstError="true"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <div className="CreateCollectionFormItemWrapper">
              <Form.Item
                name="storename"
                // validateStatus={isStoreNameAvailable ? "success" : "error"}
                // help="Store name should be unique"
                label="Store Name"
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
                label="Instagram Link"
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
                label="Short Description"
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
                label="Personal Link"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your Personal link!",
                //   },
                // ]}
              >
                <Input placeholder="Personal link" />
              </Form.Item>

              <Form.Item name="longDescription" label="Long Description">
                <Input.TextArea
                  placeholder="Long description"
                  style={{ height: 150 }}
                />
              </Form.Item>

              <span className="mediaAndDiscordLinks">
                <Form.Item
                  name="mediumLink"
                  label="Medium Link"
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
                  label="Discord Link"
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
                label="Category"
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
                        {item?.description}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item name="telegramLink" label="Telegram Link">
                <Input placeholder="Telegram link" />
              </Form.Item>

              <Form.Item
                name="afterPurchaseMessage"
                label="After 1st Purchase Message"
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
                label="Minting Supply"
                rules={[
                  {
                    required: true,
                    message: "Please input Minting supply Count!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Minting supply Count"
                  controls={false}
                />
              </Form.Item>

              <Form.Item
                name="mintingCoin"
                label="Minting Coin"
                rules={[
                  {
                    required: true,
                    message: "Please select a Minting Coin!",
                  },
                ]}
              >
                <Select placeholder="Minting Coin">
                  {mintingCoin?.body?.slice(0,2)?.map((item) => {
                    return (
                      <Select.Option value={item?.code}>
                        {item?.description}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              {/* <Form.Item
                name="mintable"
                label="Mintable"
                rules={[
                  {
                    required: true,
                    message: "Please input mintable!",
                  },
                ]}
              >
                <InputNumber placeholder="mintable" controls={false} />
              </Form.Item> */}

              <Form.Item
                name="delayDays"
                label="Delay Days"
                rules={[
                  {
                    required: true,
                    message: "Please input Delay Days!",
                  },
                ]}
              >
                <InputNumber
                  placeholder="Days to delay before showing next level"
                  controls={false}
                  // value={delayDays} onChange={()=>setDelayDays(e.target.value)}
                />
              </Form.Item>

              {/* <Form.Item
                name="royaltyPercent"
                label="Royalty Percent"
                rules={[
                  {
                    required: true,
                    message: "Please input Royalty Percent!",
                  },
                ]}
              >
                <InputNumber placeholder="Royalty Percent" controls={false} />
              </Form.Item> */}

              <Form.Item
                name="thirdPartyRoyaltyPercent"
                label={<div>Royalty Percent
                  <Tooltip title=" This is the “Royalty Percentage” you will receive for each resale after the 1st sale. This will be deducted from the sale price and paid to the “Payout Wallet”."
                  color={"#303549"}
                  overlayClassName="favouriteToolTip"
                  >
                   <span className="infoIcon"> ? </span>
                    </Tooltip>
                </div>}
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input third Party Royalty Percent!",
                //   },
                // ]}
              >
                <InputNumber
                  placeholder="Royalty Percent"
                  controls={false}
                />
              </Form.Item>

              <Form.Item
                name="thirdPartyWalletId"
                label={<div>Payout Wallet
                  <Tooltip title="This is the Wallet ID that will receive the first sale and future royalty payments (if applicable) for this collection."
                  color={"#303549"}
                  overlayClassName="favouriteToolTip"
                  >
                   <span className="infoIcon"> ? </span>
                    </Tooltip>
                </div>}
                rules={[
                  {
                    required: true,
                    message: "Please input Payout Wallet id!",
                  },
                ]}
              >
                <Input placeholder="Wallet ID we will payout the royalty to" />
              </Form.Item>

              <Form.Item
                name="layoutCode"
                label="Layout Code"
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
                        {item?.description}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              {/* <Form.Item
                name="whoPayFee"
                label="Who Pay Fee"
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
              </Form.Item> */}

              <Form.Item
                label="Mint Locked"
                labelAlign="left"
                valuePropName="checked"
                className="firstSwitch"
              >
                <Switch
                  size="small"
                  checked={isMintLocked}
                  onChange={() => setIsMintLocked(!isMintLocked)}
                />
              </Form.Item>

              <div className="dFlex">
                <Form.Item
                  label={
                    <div>
                      Explicit
                      <Tooltip
                        title={
                          "Enable this if your items may contain harmful, sexual, or violent  content. This will help users to safely limit their searches."
                        }
                        color={"#303549"}
                        overlayClassName="favouriteToolTip"
                      >
                        <span className="infoIcon">?</span>
                      </Tooltip>
                    </div>
                  }
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
                  label={
                    <div>
                      Mintable
                      <Tooltip
                        title={
                          "Enabling this will create your contract on the blockchain. This may entail gas fees depending on the blockchain you have selected."
                        }
                        color={"#303549"}
                        overlayClassName="favouriteToolTip"
                      >
                        <span className="infoIcon">?</span>
                      </Tooltip>
                    </div>
                  }
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
              </div>
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
