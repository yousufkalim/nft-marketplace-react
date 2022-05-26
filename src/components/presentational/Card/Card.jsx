import React,{useState} from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import TEST_IMG from "../../../images/test_img.png";

import TEST_ICON from "../../../images/test_footer.svg";
import { Tooltip } from "antd";
import "./Card.scss";
import { Link } from "react-router-dom";
import { openNotification } from "../../Smart/Notification";
import { followCollection, unFollowCollection } from "../../../services/collectionServices";

const { Meta } = Card;

const NftCard = ({ showTopPick = false, data }) => {
  console.log("token",localStorage.getItem("token"));
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const followCollections = async () => {
    try {
      const res = await followCollection(data?.guid);
      setIsFollowed(res?.data?.body?.followed);
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
    }
  };
  const unFollowCollections = async () => {
    try {
      const res = await unFollowCollection(data?.guid);
      setIsFollowed(res?.data?.body?.followed);
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
    }
  };
  return (
    <div className="imageCard">
      <Card
        hoverable
        cover={
          <span className="coverWrapper">
            <Link to={`/collectionView/${data?.guid}`}>
              <span className="coverImage">
                <img
                  alt="example"
                  src={showTopPick ? TEST_IMG : data?.image_large_location}
                />
              </span>
            </Link>

            <Tooltip
              title={isFollowed ? 'UNFOLLOW' : "FOLLOW"}
              color={"#303549"}
              overlayClassName="favouriteToolTip"
            >
              <span
                className="frame"
                onClick={isFollowed ? unFollowCollections : followCollections}
              >
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
        <Meta
          title={data ? data?.store_name : "Test Title"}
          description={data ? data?.description_short : "test description"}
        />
      </Card>
    </div>
  );
};

export default NftCard;
