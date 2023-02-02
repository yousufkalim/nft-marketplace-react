import React, {  useState } from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import { Tooltip } from "antd";
import "./Card.scss";
import { Link } from "react-router-dom";
import { openNotification } from "../../Smart/Notification";
import {
  followCollection,
  getCollectionFollowers,
  unFollowCollection,
} from "../../../services/collectionServices";
import { truncate, truncateTitle } from "../../../helpers/utils";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const { Meta } = Card;

const NftCard = ({ showTopPick = false, data, showFollowIcon = true }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const history = useHistory();
  const followCollections = async () => {
    try {
      const res = await followCollection(data?.guid);
      setIsFollowed(res?.data?.body?.followed);
      openNotification("Success", "Followed Successfully");
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
    }
  };
  const unFollowCollections = async () => {
    try {
      const res = await unFollowCollection(data?.guid);
      setIsFollowed(res?.data?.body?.followed);
      openNotification("Success", "UnFollowed Successfully");
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
    }
  };

  const handleClick = () => {
    history.push(`/collectionView/${data?.guid}`);
  };

  const handleCreatedBy = (e) => {
    e.stopPropagation();
    history.push(`/creatorDetails/${data?.created_by}`);
  
};

  return (
    <div className="imageCard">
      <Card
        hoverable
        cover={
          <span className="coverWrapper">
            <span className="coverImage" onClick={handleClick}>
              <img alt="example" src={data?.image_large_location} />
            </span>

            <Tooltip
              title={isFollowed ? "UNFOLLOW" : "FOLLOW"}
              color={"#303549"}
              overlayClassName="favouriteToolTip"
            >
              {showFollowIcon && (
                <span
                  className="frame"
                  style={{ backgroundColor: isFollowed ? "blue" : "" }}
                  onClick={isFollowed ? unFollowCollections : followCollections}
                >
                  <img src={FRAME_ICON} alt={"FRAME_ICON"} />
                </span>
              )}
            </Tooltip>

            <span
              className="footer"
              style={{
                background: `url(${
                  data?.image_small_location
                }) no-repeat`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            ></span>
            {showTopPick && <span className="tag">TOP PICK</span>}
          </span>
        }
      >
        <Link to={`/collectionView/${data?.guid}`}>
          <Meta
            title={data ? truncateTitle(data?.store_name) : "Test Title"}
            description={
              <div className="dFlex">
                {data ? truncate(data?.description_short) : "test description"}
              </div>
            }
          />
        </Link>
        <div className="createdBy">
          <span>Created By: </span>
          <span className="textStyle" onClick={(e)=>handleCreatedBy(e)} >{data?.user_details?.username}</span>
        </div>
      </Card>
    </div>
  );
};

export default NftCard;
