import React, { useEffect } from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import TEST_IMG from "../../../images/test_img.png";

import TEST_ICON from "../../../images/test_footer.svg";
import { Tooltip } from "antd";
import "./Card.scss";
import { getImageUrl } from "../../../services/createCollectionServices";
import { Link } from "react-router-dom";

const { Meta } = Card;

const NftCard = ({ showTopPick = false, data }) => {
  return (
    <Link to={`/collectionView/${data?.guid}`}>
    <div className="imageCard">
      <Card
        hoverable
        cover={
          <span className="coverWrapper">
            <span className="coverImage">
              <img
                alt="example"
                src={showTopPick ? TEST_IMG : data?.image_large_location}
              />
            </span>
            <Tooltip
              title="Add to favourites"
              color={"#303549"}
              overlayClassName="favouriteToolTip"
            >
              <span className="frame">
                <img src={FRAME_ICON} alt={"FRAME_ICON"} />
              </span>
            </Tooltip>

            <span
              className="footer"
              style={{
                background: `url(${
                  showTopPick ? TEST_ICON : data?.image_small_location
                }) no-repeat`,
              }}
            ></span>
            {showTopPick && <span className="tag">TOP PICK</span>}
          </span>
        }
      >
        <Meta title={data ? data?.store_name : 'Test Title'} description={data ? data?.description_short : 'test description'} />
      </Card>
    </div>
    </Link>
  );
};

export default NftCard;
