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
  const dispatch=useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    const updatedData = {
      ...user,
      notification_marketing: isSubscribed ? 1 : 0,
    };

    try {
      const res = await updateProfileAPI(updatedData);
      setLoading(false);
      dispatch(setProfile(updatedData))
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
    <div>
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
              >
                <Switch
                  size="small"
                  checked={isSubscribed}
                  onChange={() => setIsSubscribed((prev) => !prev)}
                />
              </Form.Item>
              <p className="get_promo_subs">
                Get latest news and learn new opportunities
              </p>
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
