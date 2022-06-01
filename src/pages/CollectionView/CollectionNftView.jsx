import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import "./CollectionNftView.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useWindowSize from "../../helpers/hooks";
import { openNotification } from "../../components/Smart/Notification";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCollectionNft } from "../../services/collectionServices";
import LoadingCard from "../../components/presentational/LoadingCard/LoadingCard";
import CollectionNftCard from "../../components/presentational/CollectionNftCard/CollectionNftCard";
import FeaturedCard from "../../components/presentational/FeaturedCard/FeaturedCard";
import FeaturedLoadingCard from "../../components/presentational/FeaturedLoadingCard/FeaturedLoadingCard";

const CollectionNftView = ({ collectionid, setCount }) => {
  const arr = [1, 2];

  const [exploreData, setExploreData] = useState([]);
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
  const fetchExploreData = async () => {
    // try {
      const res = await getCollectionNft(collectionid, extraData?.next_page);
      if (res?.data?.body?.data?.length) {
        setExploreData([...exploreData, ...res?.data?.body?.data]);
        setExtraData({
          next_page: res?.data?.body?.next_page,
          has_more: res?.data?.body?.has_more,
        });
        setCount(exploreData?.length);
      }
    // } catch (error) {
    //   openNotification("Oops", error?.response?.data?.message);
    // }
  };
  useEffect(async () => {
    await fetchExploreData();
  }, []);

  const [browserWidth] = useWindowSize();

  return (
    <>
      <div className="collectionNftViewWrapper">
        {exploreData.length > 0 ? (
          <div className="collectionNftViewCardGrid">
            <InfiniteScroll
              dataLength={exploreData.length} //This is important field to render the next data
              next={fetchExploreData}
              hasMore={extraData?.has_more}
              loader={
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                  {arr?.map((item, index) => {
                    return (
                      <Col
                        className="gutter-row"
                        span={browserWidth < 620 ? 24 : 12}
                        key={index}
                      >
                        <FeaturedLoadingCard isNft={true} />
                      </Col>
                    );
                  })}
                </Row>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                {exploreData?.map((item, index) => {
                  return (
                    <Col
                      className="gutter-row"
                      span={browserWidth < 620 ? 24 : 12}
                      key={index}
                    >
                      <FeaturedCard isNft={true} data={item} />
                    </Col>
                  );
                })}
              </Row>
            </InfiniteScroll>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            No Nfts found for this collection
          </div>
        )}
      </div>
    </>
  );
};

export default CollectionNftView;
