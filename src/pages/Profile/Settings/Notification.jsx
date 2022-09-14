import { Form, Switch, Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spin from "../../../components/presentational/Spin";
import { openNotification } from "../../../components/Smart/Notification";
import { updateProfileAPI } from "../../../services/userServices";
import { setProfile } from "../../../store/auth/authActions";

const Notification = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(
    user?.notification_marketing === 1 ? true : false
  );

  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    const updatedData = {
      ...user,
      notification_auction_expired: values?.auctionExpired ? 1 : 0,
      notification_bid_activity: values?.bidActivity ? 1 : 0,
      notification_marketing: values?.newsLetter ? 1 : 0,
      notification_item_sold: values?.itemSold ? 1 : 0,
      notification_owned_item_updated: values?.itemUpdated ? 1 : 0,
      notification_bid_minimum_met_amount: values?.minimumMetAmount ? 1 : 0,
      notification_bid_minimum_met_coin_type: values?.minimumMetCoinType
        ? "1"
        : "0",
      notification_out_bid: values?.outBid ? 1 : 0,
      notification_price_change: values?.priceChange ? 1 : 0,
      notification_purchase_successful: values?.purcshaseSuccessfull ? 1 : 0,
    };

    try {
      const res = await updateProfileAPI(updatedData);
      setLoading(false);
      dispatch(setProfile(updatedData));
      openNotification("Success", "Data Updated Successfully");
    } catch (e) {
      setLoading(false);
      openNotification("Oops", e?.response?.data?.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="notificationWrapper">
      <Form
        name="basic"
        layout="horizontal"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="deactivate_acc_last">
          <div className="switch_antd _space_inner_de">
            <div className="switch_antd_subscription">
              <p>Your subscriptions</p>
            </div>
          </div>
          <hr />
          <div className="switch_antd _space_inner_de">
            <div className="outer_layer_select">
              <Form.Item
                label="Newsletter"
                labelAlign="right"
                className="firstSwitch"
                // valuePropName="checked"
                name="newsLetter"
              >
                <Switch size="small" defaultChecked={user?.notification_marketing} />
              </Form.Item>
              {/* <p className="get_promo_subs">
              I would like to receive marketing, blog and special offer emails from NFTDepot.Art
              </p> */}
              <Form.Item
                label="Item Sold"
                labelAlign="right"
                className="firstSwitch"
                name="itemSold"
              >
                <Switch size="small" defaultChecked={user?.notification_item_sold} />
              </Form.Item>
              <Form.Item
                label="Bid Activity"
                labelAlign="right"
                className="firstSwitch"
                name="bidActivity"
              >
                <Switch size="small" defaultChecked={user?.notification_bid_activity} />
              </Form.Item>
              <Form.Item
                label="Price Change"
                labelAlign="right"
                className="firstSwitch"
                name="priceChange"
              >
                <Switch size="small" defaultChecked={user?.notification_price_change} />
              </Form.Item>
              <Form.Item
                label="Auction Expired"
                labelAlign="right"
                className="firstSwitch"
                name="auctionExpired"
              >
                <Switch size="small" defaultChecked={user?.notification_auction_expired} />
              </Form.Item>
              <Form.Item
                label="Out Bid"
                labelAlign="right"
                className="firstSwitch"
                name="outBid"
              >
                <Switch size="small" defaultChecked={user?.notification_out_bid} />
              </Form.Item>
              <Form.Item
                label="Owned Item Updated"
                labelAlign="right"
                className="firstSwitch"
                name="itemUpdated"
              >
                <Switch size="small" defaultChecked={user?.notification_owned_item_updated} />
              </Form.Item>
              <Form.Item
                label="Purchase SuccessFull"
                labelAlign="right"
                className="firstSwitch"
                name="purcshaseSuccessfull"
              >
                <Switch size="small" defaultChecked={user?.notification_purchase_successful} />
              </Form.Item>
              <Form.Item
                label="Bid Minimum Met Amount"
                labelAlign="right"
                className="firstSwitch"
                name="minimumMetAmount"
              >
                <Switch size="small" defaultChecked={user?.notification_bid_minimum_met_amount} />
              </Form.Item>
              <Form.Item
                label="Bid Minimum Met Coin Type"
                labelAlign="right"
                className="firstSwitch"
                name="minimumMetCoinType"
              >
                <Switch size="small" defaultChecked={user?.notification_bid_minimum_met_coin_type=="1" ? true : false} />
              </Form.Item>
            </div>
            <span className="nextButton">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {loading ? <Spin /> : "Save Changes"}
                </Button>
              </Form.Item>
            </span>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Notification;
