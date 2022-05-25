import React from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import EYE_ICON from "../../../images/eye_icon.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import { Tooltip } from "antd";
import "./FeatureMobileCard.scss";

const { Meta } = Card;

const FeatureMobileCard = ({data}) => {
  return (
    <div className="FeatureMobileCard">
      <Card
        hoverable
        cover={
          <span className="ExploreCardWrapper">
            <span className="ExploreCardImage" >
            <img
              alt="example"
              src={data?.image_large_location}
             
            />
            </span>
            <Tooltip title="Add to favourites" color={'#303549'}>
              <span className="frame">
                <img src={FRAME_ICON} alt={"FRAME_ICON"} />
              </span>
            </Tooltip>

            <span
              className="footer"
              style={{ background: `url(${data?.image_small_location}) no-repeat` }}
            ></span>
          </span>
        }
      >
        <Meta title={data?.store_name} description={data?.description_short} />
        <div className="exploreCardFooter">
            <span className="priceHeading">Price <span className="priceHeading">$$ ETH</span></span>
            <span className="rightSection" >
                <span>
                <img src={EYE_ICON} alt={'EYE_ICON'} />
                <span className="beliefPrice">456</span>
                </span>
                <span className="tagImage">
                <img src={ORANGE_FRAME} alt={'ORANGE_FRAME'} />
                <span className="tagPrice">33</span>
                </span>
            </span>
        </div>
      </Card>
    </div>
  );
};

export default FeatureMobileCard;
