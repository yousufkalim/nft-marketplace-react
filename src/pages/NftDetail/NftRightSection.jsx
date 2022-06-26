import React from "react";
import DISCORD_ICON from "../../images/discord_icon.svg";
import M_ICON from "../../images/M_icon.svg";
import TWITTER_ICON from "../../images/twitter_icon.svg";
import WHITE_FRAME_ICON from "../../images/white_frame_icon.svg";
import SHARE_ICON from "../../images/share.svg";
import PRICE_ICON from "../../images/price_icon.svg";
import LIKE_ICON from "../../images/like_icon.svg";

import { Tooltip } from "antd";

import "./NftRightSection.scss";

const NftRightSection = ({nftData}) => {
  return (
    <div className="NftrightSectionWrapper">
      <div className="RightHeader">
        <div className="leftSideWithImage">
            <div className="priceDetails">
                <span className="test">Current Price</span>
                <span className="icon" >78.62  <img src={PRICE_ICON} alt={'PRICE_ICON'} /></span>
            </div>
          <div className="socialIcons">
            <span className="socialIconImage">
              <img src={DISCORD_ICON} alt={"DISCORD_ICON"} />
            </span>
            <span className="socialIconImage">
              <img src={M_ICON} alt={"M_ICON"} />
            </span>
            <span className="socialIconImage">
              <img src={TWITTER_ICON} alt={"TWITTER_ICON"} />
            </span>
            <span className="socialIconImage changebg">
              <img src={SHARE_ICON} alt={"SHARE_ICON"} />
            </span>
            <Tooltip
              title="Like"
              color={"#303549"}
              overlayClassName="favouriteToolTip"
            >
              <span className="socialIconImage changebgColor ">
                <img src={LIKE_ICON} alt={"LIKE_ICON"} />
              </span>
            </Tooltip>
          </div>
        </div>
        <div className="itemDetails">
          <span className="detail">
           {nftData?.description_short}
          </span>
        </div>
        <div className="offerBtn" >
            <span className="buyNow" >Buy Now</span>
            <span className="makeOffer" >Make Offer</span>

        </div>
      </div>
    </div>
  );
};

export default NftRightSection;
