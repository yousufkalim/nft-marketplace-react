import React, { useEffect, useState } from "react";
import ExploreCard from "../../components/presentational/ExploreCard/ExploreCard";
import PAGE_HEADER from "../../images/PageHeader.png";
import { Row, Col } from "antd";
import { allCollectionsAPI } from "../../services/explorePageServices";
import InfiniteScroll from "react-infinite-scroll-component";
import "./CollectionNftView.scss";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useWindowSize from "../../helpers/hooks";


const CollectionNftView = () => {
  const [exploreData, setExploreData] = useState([]);
  useEffect(() => {
    const fetchExploreData = async () => {
      const res = await allCollectionsAPI(0);
      setExploreData(res?.data?.body?.data);
    };
    fetchExploreData();
  }, []);

  const filterCollections = (topHits) => {
    if (topHits?.image_large_location?.includes("https")) {
      const check = topHits?.image_large_location?.lastIndexOf(".");
      const extension = topHits?.image_large_location.slice(check);
      if (extension !== ".svg") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const [browserWidth]=useWindowSize();

  return (
    <>
      <div className="collectionNftViewWrapper">
        <div className="collectionNftViewCardGrid">
          {/* <InfiniteScroll
            dataLength={exploreData.length} //This is important field to render the next data
            next={fetchExploreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            below props only if you need pull down functionality
            refreshFunction={fetchExploreData}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8593; Release to refresh
              </h3>
            }
          > */}
            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              {exploreData?.filter(filterCollections)?.map((item, index) => {
                return (
                  <Col className="gutter-row" span={browserWidth < 620 ? 24 : 8} key={index}>
                   <Link to={'/nftDetail'} ><ExploreCard data={item} /></Link> 
                  </Col>
                );
              })}
            </Row>
          {/* </InfiniteScroll> */}
        </div>
      </div>
    </>
  );
};

export default CollectionNftView;
