import React from "react";
import { Card } from "antd";
import EYE_ICON from "../../../images/eye_icon.svg";
import TEST_ICON from "../../../images/test_footer.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import "./NftDetailCard.scss";

const { Meta } = Card;

const NftDetailCard = ({nftData}) => {
  return (
    <div className="NftDetailCard">
      <Card
        hoverable
        cover={
          <span className="ExploreCardWrapper">
            <span className="ExploreCardImage">
              <img
                alt="example"
                src={nftData?.nft_data?.image_location?.includes("https") ?  nftData?.nft_data?.image_location : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
              />
            </span>
          </span>
        }
      >
        {/* <Meta description={nftData?.description_short} />
        <div className="exploreCardFooter">
          <div className="creatorDetails">
            <span className="imageSection">
              <img src={TEST_ICON} alt={"TEST_ICON"} />
            </span>
            <span className="textSection">
              <span className="createdBy">created by</span>
              <span className="creatorName">{nftData?.created_by}</span>
            </span>
          </div>
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

export default NftDetailCard;
