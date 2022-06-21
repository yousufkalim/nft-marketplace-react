import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import FeaturedCard from "../../../components/presentational/FeaturedCard/FeaturedCard";
import useWindowSize from "../../../helpers/hooks";
import { myFollowingCollectionsAPI } from "../../../services/userServices";
import InfiniteScroll from "react-infinite-scroll-component";
import { openNotification } from "../../../components/Smart/Notification";
import FeaturedLoadingCard from "../../../components/presentational/FeaturedLoadingCard/FeaturedLoadingCard";
import "./Followed.scss";

const Followed = ({ setMyFollowedCount }) => {
  const arr = [0, 1, 2];
  const [browserWidth] = useWindowSize();
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    try {
      const res = await myFollowingCollectionsAPI(extraData?.next_page);

      console.log(res)

      setCollections([...collections, ...res?.data?.body?.collections]);
      setExtraData({
        next_page: res?.data?.body?.next_page,
        has_more: res?.data?.body?.has_more,
      });
      if (collections?.length > 0) {
        setMyFollowedCount(collections?.length);
      } else {
        setMyFollowedCount(res?.data?.body?.collections?.length);
      }
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
      //   setExploreData([]);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <>
      <div className="FollowedCardsGrid main_page_width">
        <InfiniteScroll
          dataLength={collections.length} //This is important field to render the next data
          next={fetchCollections}
          hasMore={extraData?.has_more}
          loader={
            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              {arr?.map((item, index) => {
                return (
                  <Col
                    className="gutter-row"
                    span={browserWidth < 620 ? 24 : 8}
                    key={index}
                  >
                    <FeaturedLoadingCard isNft={true} />
                  </Col>
                );
              })}
            </Row>
          }
          endMessage={
            <p className="all_seen_txt" style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
            {collections?.map((item, index) => {
              return (
                <Col
                  className="gutter-row"
                  span={browserWidth < 620 ? 24 : 12}
                  key={index}
                >
                  <FeaturedCard data={item} isNft={false} />
                </Col>
              );
            })}
          </Row>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Followed;
