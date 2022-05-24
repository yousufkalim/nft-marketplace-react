import React from "react";
import { Card } from "antd";
import TEST_ICON from "../../../images/test_footer.svg";
import TEST_IMG from "../../../images/test_img.png";
import ORANGE_DOT from "../../../images/orange_dot.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import { Tooltip } from "antd";
import "./FeaturedCard.scss";

const FeaturedCard = ({data}) => {
  return (
    <div className="featuredCard">
      <Card>
        <div className="cardContent">
          
          <div className="coverImageWrapper">
            <div className="coverImage">
              <img
                alt="example"
                src={data ? data?.image_large_location : TEST_IMG}
              />
            </div>
            <div className="tagImage">
              <img src={data ? data?.image_small_location : TEST_ICON} alt={"TEST_ICON"} />
            </div>
          </div>
          <div className="content">
          <div className="description">
            <span className="head">{data ? data?.store_name : 'test store_name'}</span>
            <span className="desc">{data ? data?.description_short : 'test description'}</span>
            <span className="StatsSection">
              <span className="avgSection">
                <img src={ORANGE_DOT} alt={"ORANGE_DOT"} />
                <span className="avg"> Avg: 3872.44</span>
              </span>
              <span className="floorSection">
                <img src={ORANGE_DOT} alt={"ORANGE_DOT"} />
                <span className="floor">Floor: 3872.44</span>
              </span>
            </span>
          </div>
          <div className="frameIconSection">
            <Tooltip
              title="Add to favourites"
              color={"#303549"}
            >
              <span className="orangeFrame">
                <img src={ORANGE_FRAME} alt={"ORANGE_FRAME"} />
              </span>
            </Tooltip>
          </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeaturedCard;
