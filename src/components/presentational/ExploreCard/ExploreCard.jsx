import React, { useEffect,useState } from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import EYE_ICON from "../../../images/eye_icon.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import { Tooltip } from "antd";
import "./ExploreCard.scss";
import { useHistory } from "react-router-dom";
import { followCollection, unFollowCollection } from "../../../services/collectionServices";
import { openNotification } from "../../Smart/Notification";
import { truncate } from "../../../helpers/utils";
import { useSelector } from "react-redux";

const { Meta } = Card;

const ExploreCard = ({ data,showFollowIcon=true }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/collectionView/${data?.guid}`);
  };

  const followTheCollection = async () => {
    try {
      const res = await followCollection(data?.guid);
      if(res?.body?.followed)
      {
      openNotification("Success","Followed Successfully");
      }

    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
      return error;

    }
  };
  const unFollowCollections = async () => {
    try {
      const res = await unFollowCollection(data?.guid);
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
    }
  };


  return (
    <div className="ExploreCard">
      <Card
        hoverable
        cover={
          <span className="ExploreCardWrapper">
            <span className="ExploreCardImage" onClick={handleClick}>
              <img alt="example" src={data?.image_large_location} />
            </span>
            <Tooltip title={data?.is_followed ? "UnFollow" : "Follow"} color={"#303549"}>
              {showFollowIcon && 
              <span className="frame" onClick={data?.is_followed ? unFollowCollections : followTheCollection}  >
                <img src={FRAME_ICON} alt={"FRAME_ICON"} />
              </span>
              }
            </Tooltip>

            <span
              className="footer"
              style={{
                background: `url(${data?.image_small_location}) no-repeat`,
              }}
            ></span>
          </span>
        }
      >
        <Meta title={data?.store_name} description={truncate(data?.description_short)} />
        <div className="exploreCardFooter">
          {/* <span className="priceHeading">Price <span className="priceHeading">$$ ETH</span></span> */}
          <span className="rightSection">
            <span>
              <img src={EYE_ICON} alt={"EYE_ICON"} />
              <span className="beliefPrice">{data?.views}</span>
            </span>
            <span className="tagImage">
              <Tooltip title={"Followers"} color={"#303549"}>
                <img src={ORANGE_FRAME} alt={"ORANGE_FRAME"}/>
              </Tooltip>
              <span className="tagPrice">{data?.followers_count}</span>
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default ExploreCard;
