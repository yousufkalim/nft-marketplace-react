import React, { useState, useEffect } from "react";
import { Card } from "antd";
import TEST_ICON from "../../../images/test_footer.svg";
import TEST_IMG from "../../../images/test_img.png";
import ORANGE_DOT from "../../../images/orange_dot.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import LIKE_ICON from "../../../images/like_icon.svg";
import { Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { openNotification } from "../../Smart/Notification";
import {
  followCollection,
  getCollectionFollowers,
  likeNfts,
  unFollowCollection,
  unLikeNfts,
} from "../../../services/collectionServices";
import "./FeaturedCard.scss";
import { truncate } from "../../../helpers/utils";
import { useSelector } from "react-redux";

const FeaturedCard = ({ data, isNft }) => {
  const history = useHistory();
  const [isFollowed, setIsFollowed] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const [isLiked, setIsLiked] = useState(false);
  const [collectionFollowers, setCollectionFollowers] = useState([]);
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
  const handleClick = () => {
    if (isNft) {
      history.push(`/nftDetail/${data?.guid}`);
    } else {
      history.push(`/collectionView/${data?.guid}`);
    }
  };

  const followCollections = async () => {
    try {
      const res = await followCollection(data?.guid);
      setIsFollowed(res?.body?.followed);
      if (res?.body?.followed) {
        openNotification("Success", "Followed Successfully");
      }
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
      return error;
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
  const likeNft = async () => {
    try {
      const res = await likeNfts(data?.guid);
      console.log("test", res?.body?.like);
      if (res?.body?.like == "1" || res?.body?.like == true) {
        openNotification("Success", "Liked Successfully");
      }
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
    }
  };
  const unLikeNft = async () => {
    try {
      const res = await unLikeNfts(data?.guid);
      setIsLiked(res?.data?.body?.liked);
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

  console.log(collectionFollowers);

  return (
    <div className="featuredCard">
      <Card>
        <div className="cardContent">
          <div className="coverImageWrapper" onClick={handleClick}>
            <div className="coverImage">
              <img
                alt="example"
                src={
                  isNft && data
                    ? data?.nft_data?.image_location
                    : data
                    ? data?.image_large_location
                    : TEST_IMG
                }
              />
            </div>
            {!isNft && (
              <div className="tagImage">
                <img
                  src={data ? data?.image_small_location : TEST_ICON}
                  alt={"TEST_ICON"}
                />
              </div>
            )}
          </div>
          <div className="content">
            <div className="description">
              <span className="head">
                {data ? data?.store_name : "test store_name"}
              </span>
              <span className="desc">
                {data ? truncate(data?.description_short) : "test description"}
              </span>
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
                title={
                  isNft
                    ? isLiked
                      ? "Unlike"
                      : "Like"
                    : isFollowed
                    ? "Unfollow"
                    : "Follow"
                }
                color={"#303549"}
              >
                <span
                  className="orangeFrame"
                  onClick={
                    isNft
                      ? isLiked
                        ? unLikeNft
                        : likeNft
                      : isFollowed
                      ? unFollowCollections
                      : followCollections
                  }
                >
                  <img
                    src={isNft ? LIKE_ICON : ORANGE_FRAME}
                    alt={"ORANGE_FRAME"}
                  />
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
