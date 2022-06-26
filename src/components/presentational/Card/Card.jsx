import React, { useEffect, useState } from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import TEST_IMG from "../../../images/test_img.png";

import TEST_ICON from "../../../images/test_footer.svg";
import { Tooltip } from "antd";
import "./Card.scss";
import { Link } from "react-router-dom";
import { openNotification } from "../../Smart/Notification";
import {
  followCollection,
  getCollectionFollowers,
  unFollowCollection,
} from "../../../services/collectionServices";
import { truncate } from "../../../helpers/utils";
import { useSelector } from "react-redux";

const { Meta } = Card;

const NftCard = ({ showTopPick = false, data }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const [isLiked, setIsLiked] = useState(false);
  const [collectionFollowers, setCollectionFollowers] = useState([]);
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
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


  const getcollectionFollowers = async () => {
    try {
      if (extraData?.has_more) {
        const res = await getCollectionFollowers(
          data?.guid,
          extraData?.next_page
        );
        if (res?.data?.body?.followers?.length) {
          setCollectionFollowers([
            ...collectionFollowers,
            ...res?.data?.body?.followers,
          ]);
          setExtraData({
            has_more: res?.data?.body?.has_more,
            next_page: res?.data?.body?.next_page,
          });
        }
        if (res?.data?.body?.has_more) {
          await getcollectionFollowers();
        } else {
          return;
        }
      }
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
      return;
    }
  };

  useEffect(async () => {
    await getcollectionFollowers();
    const isUserFollowing = collectionFollowers.find(
      (item) => item.guid === user?.guid
    );
    if (isUserFollowing) {
      setIsFollowed(true);
    }
  }, [collectionFollowers]);

  return (
    <div className="imageCard">
      <Link to={`/collectionView/${data?.guid}`}>
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
              title={isFollowed ? "UNFOLLOW" : "FOLLOW"}
              color={"#303549"}
              overlayClassName="favouriteToolTip"
            >
              <span
                className="frame"
                style={{backgroundColor : isFollowed ? "blue" : ""}}
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
          description={
            data ? truncate(data?.description_short) : "test description"
          }
        />
      </Card>
      </Link>
    </div>
  );
};

export default NftCard;
