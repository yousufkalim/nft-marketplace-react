import React from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import EYE_ICON from "../../../images/eye_icon.svg";
import TEST_ICON from "../../../images/test_footer.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import { Tooltip } from "antd";
import "./ProfileCard.scss";
import { useSelector } from "react-redux";

const { Meta } = Card;

const ProfileCard = () => {
  const data=useSelector(state=>state?.auth?.user);
  return (
    <div className="ProfileCard">
      <Card
        hoverable
        cover={
          <span className="ProfileCardWrapper">
            <span className="ProfileCardImage">
              <img
                alt="example"
                src={data?.image_profile_location ? data?.image_profile_location : "https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528__340.jpg"}
              />
            </span>
            {/* <Tooltip title="Add to favourites" color={"#303549"}>
              <span className="frame">
                <img src={FRAME_ICON} alt={"FRAME_ICON"} />
              </span>
            </Tooltip> */}

            {/* <span
              className="footer"
              style={{ background: `url(${TEST_ICON}) no-repeat` }}
            ></span> */}
          </span>
        }
      >
        <Meta title={data?.first_name+data?.last_name}/>
        {/* <div className="ProfileCardFooter">
          <span className="priceHeading">
            Price <span className="priceHeading">$$ ETH</span>
          </span>
          <span className="rightSection">
            <span>
              <img src={EYE_ICON} alt={"EYE_ICON"} />
              <span className="beliefPrice">456</span>
            </span>
            <span className="tagImage">
              <img src={ORANGE_FRAME} alt={"ORANGE_FRAME"} />
              <span className="tagPrice">33</span>
            </span>
          </span>
        </div> */}
      </Card>
    </div>
  );
};

export default ProfileCard;
