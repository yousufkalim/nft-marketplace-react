import React from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import EYE_ICON from "../../../images/eye_icon.svg";
import TEST_ICON from "../../../images/test_footer.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import { Tooltip } from "antd";
import "./LoadingCard.scss";

const { Meta } = Card;

const LoadingCard = ({data}) => {
  console.log("data",data)
  return (
    <div className="LoadingCard">
      <Card
        hoverable
        cover={
          <div className="LoadingCardWrapper">
            <div
              className="footer"
              style={{ background: `linear-gradient(270deg, #F2FAFC 0%, #E1ECEF 100%)` }}
            ></div>
          </div>
        }
      >
        <Meta title={<div className="title"></div>} description={<div className="desc"></div>} />
        <div className="LoadingCardFooter">
            <span className="priceHeading"></span>
            <span className="rightSection" >
                <span className="beliefPrice"></span>
                <span className="tagImage">
                <span className="tagPrice"></span>
                </span>
            </span>
        </div>
      </Card>
    </div>
  );
};

export default LoadingCard;
