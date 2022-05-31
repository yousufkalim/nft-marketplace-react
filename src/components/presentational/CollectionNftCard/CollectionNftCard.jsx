import React, { useEffect,useState } from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import EYE_ICON from "../../../images/eye_icon.svg";
import ORANGE_FRAME from "../../../images/orange_frame.svg";
import { Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { followCollection, getCollectionFollowers, unFollowCollection } from "../../../services/collectionServices";
import { openNotification } from "../../Smart/Notification";
import { truncate } from "../../../helpers/utils";
import { useSelector } from "react-redux";
import "./CollectionNftCard.scss";


const { Meta } = Card;

const CollectionNftCard = ({ data }) => {
  const history = useHistory();
  const [followed,setIsFollowed] = useState(false);
  const user = useSelector((state) => state?.auth?.user);
  const [collectionFollowers, setCollectionFollowers] = useState([]);
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });

  const handleClick = () => {
    history.push(`/nftDetail/${data?.guid}`);
  };

  const followTheCollection = async () => {
    try {
      const res = await followCollection(data?.guid);
      setIsFollowed(res?.body?.followed);
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
      setIsFollowed(res?.body?.followed);
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
    <div className="CollectionNftCard">
      <Card
        hoverable
        cover={
          <span className="ExploreCardWrapper">
            <span className="ExploreCardImage" onClick={handleClick}>
              <img alt="example" src={data?.nft_data?.image_location} />
            </span>
            <Tooltip title={followed ? "UnFollow" : "Follow"} color={"#303549"}>
              <span className="frame" onClick={followed ? unFollowCollections : followTheCollection}  >
                <img src={FRAME_ICON} alt={"FRAME_ICON"} />
              </span>
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
              <span className="beliefPrice">456</span>
            </span>
            <span className="tagImage">
              <Tooltip title={"Followers"} color={"#303549"}>
                <img src={ORANGE_FRAME} alt={"ORANGE_FRAME"}/>
              </Tooltip>
              <span className="tagPrice">33</span>
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default CollectionNftCard;
