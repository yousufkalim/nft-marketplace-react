import React, { useEffect, useState } from "react";
import { Card } from "antd";
import EYE_ICON from "../../../images/eye_icon.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import LIKE_ICON from "../../../images/like_icon.svg";
import { Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { openNotification } from "../../Smart/Notification";
import { truncate } from "../../../helpers/utils";
import { likeNfts, unLikeNfts } from "../../../services/collectionServices";
import "./CollectionNftCard.scss";

const { Meta } = Card;

const CollectionNftCard = ({ data }) => {
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(data?.is_liked);
  const handleClick = () => {
    history.push(`/nftDetail/${data?.guid}`);
  };
  const likeNft = async (e) => {
    e.stopPropagation();
    try {
      const res = await likeNfts(data?.guid);
      setIsLiked(true);
      if (res?.body?.like == "1" || res?.body?.like == true) {
        // openNotification("Success", "Liked Successfully");
      }
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
    }
  };
  const unLikeNft = async (e) => {
    e.stopPropagation();
    try {
      const res = await unLikeNfts(data?.guid);
      setIsLiked(false);
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
    }
  };

  return (
    <div className="CollectionNftCard">
      <Card
        hoverable
        cover={
          <span className="ExploreCardWrapper">
            <span className="ExploreCardImage" onClick={handleClick}>
              <img alt="example" src={data?.nft_data?.image_location} />
            </span>
            <Tooltip title={isLiked ? "Unlike" : "Like"} color={"#303549"}>
              <span
                className={data?.is_followed ? "orangeFrame" : "frame"}
                onClick={isLiked ? (e) => unLikeNft(e) : (e) => likeNft(e)}
              >
                <img
                  style={{
                    filter: isLiked ? "brightness(10)" : "",
                  }}
                  src={LIKE_ICON}
                  alt={"ORANGE_FRAME"}
                />
              </span>
            </Tooltip>

            <span
              className="footer"
              style={{
                background: `url(${data?.image_small_location}) no-repeat`,
                backgroundSize: "contain",
              }}
            ></span>
          </span>
        }
      >
        <Meta
          title={data?.store_name}
          description={truncate(data?.description_short)}
        />
        <div className="exploreCardFooter">
          {/* <span className="priceHeading">Price <span className="priceHeading">$$ ETH</span></span> */}
          <span className="rightSection">
            <span className="tagImage">
              <Tooltip title={"Likes"} color={"#303549"}>
                <img src={LIKE_ICON} alt={"ORANGE_FRAME"} />
              </Tooltip>
              <span className="tagPrice">{data?.likes}</span>
            </span>
          </span>
        </div>
        <div className="idSection"># {data?.collection_id ?? data?.guid}</div>
      </Card>
    </div>
  );
};

export default CollectionNftCard;
