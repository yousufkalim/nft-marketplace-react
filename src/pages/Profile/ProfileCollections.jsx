import React, { useEffect, useState } from "react";
import ExploreCard from "../../components/presentational/ExploreCard/ExploreCard";
import PAGE_HEADER from "../../images/PageHeader.png";
import { Row, Col } from "antd";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import { allCollectionsAPI } from "../../services/explorePageServices";
import InfiniteScroll from "react-infinite-scroll-component";
import "./ProfileCollections.scss";
import FeaturedCard from "../../components/presentational/FeaturedCard/FeaturedCard";
import useWindowSize from "../../helpers/hooks";
import ProfileCollectionsFlicker from "./ProfileCollectionsFlicker";

const ProfileCollections = () => {
  const [exploreData, setExploreData] = useState([]);
  useEffect(() => {
  const fetchExploreData = async () => {
    const res = await allCollectionsAPI(0);
    setExploreData(res?.data?.body?.data);
  };
  fetchExploreData();
  }, []);
  const [browserWidth]=useWindowSize()
  return (
    <>
      <div className="ProfileCollectionWrapper">
        <div className="filterHeader">
          <div className="filterItem">
            <span className="text highlighted">CREATED</span>
            <span className="value" >55</span>
          </div>
          <div className="filterItem">
            <span className="text" >COLLECTED</span>
            <span className="value" >55</span>
          </div>
          <div className="filterItem">
            <span className="text">FAVOURITED</span>
            <span className="value">55</span>
          </div>
          <div className="filterItem">
            <span className="text" >ACTIVITY</span>
            <span className="value" >55</span>
          </div>
          <div className="filterItem">
            <span className="text" >MY COLLECTION</span>
            <span className="value" >0</span>
          </div>
        </div>
        {browserWidth < 620 && (
          <ProfileCollectionsFlicker/>
        )

        }

        <div className="ProfileCollectioncardGrid">
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
              {exploreData?.map((item, index) => {
                return (
                  <Col className="gutter-row" span={browserWidth < 620 ? 24 : 12} key={index}>
                    <FeaturedCard />
                  </Col>
                );
              })}
            </Row>
          {/* </InfiniteScroll> */}
        </div>
        <NewsLetter />
      </div>
    </>
  );
};

export default ProfileCollections;
