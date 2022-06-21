import React, { useEffect, useState } from "react";
import ExploreCard from "../../components/presentational/ExploreCard/ExploreCard";
import PAGE_HEADER from "../../images/PageHeader.png";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import { Row, Col } from "antd";
import "./ExplorePage.scss";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import { allCollectionsAPI } from "../../services/explorePageServices";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import LoadingCard from "../../components/presentational/LoadingCard/LoadingCard";
import useWindowSize from "../../helpers/hooks";
import { openNotification } from "../../components/Smart/Notification";
import CategoryFlicker from "../FilterCollections/CategoryFlicker";
import Spin from "../../components/presentational/Spin";
import { StringParam, useQueryParams } from "use-query-params";

const ExplorePage = () => {
  const arr = [1, 2, 3];
  const [exploreData, setExploreData] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState("");
  const [extraData, setExtraData] = useState({
    has_more: true,
    next_page: 1,
  });
  const [browserWidth] = useWindowSize();

  console.log("category", category);
  
  useEffect(() => {
    const query=new URLSearchParams(window?.location?.search);
    if(query?.get('SelectedCategory')!==""){
      setCategory(query.get('SelectedCategory'));
    }
    else{
      setCategory("");
    }
  }, [window.location.search]);

  const fetchExploreData = async () => {
    try {
      const res = await allCollectionsAPI(extraData?.next_page);
      setExploreData([...exploreData, ...res?.data?.body?.data]);
      setExtraData({
        next_page: res?.data?.body?.next_page,
        has_more: res?.data?.body?.has_more,
      });
    } catch (error) {
      openNotification("Oops", error?.response?.data?.message);
      // setExploreData([]);
    }
  };

  useEffect(async () => {
    await fetchExploreData();
  }, []);

  const filterExplore = (exploreData) => {
    if (exploreData?.image_large_location?.includes("https")) {
      const check = exploreData?.image_large_location?.lastIndexOf(".");
      const extension = exploreData?.image_large_location.slice(check);
      if (extension !== ".svg") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const filterCategory = (data) => {
    console.log("data",data);
    if (category === "" || category === null) {
      console.log("i am returning true");
      return true;
    } else {
      return data?.category_code === category;
    }
  };

  return (
    <>
      <div className="ExplorePageWrapper">
        <div className="ExplorePageHeader">
          <img
            src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER}
            alt={"PAGE_HEADER"}
          />
          <div className="exploreHeadingSection">
            <span className="exploreText">
              FIND, EXPLORE & FOLLOW DIGITAL ART NFTS.
            </span>
            <span className="exploreHeading">Explore Collections</span>
          </div>
        </div>
        <CategoryFlicker category={category} setCategory={setCategory} />
        {exploreData.length > 0 ? (
          <div className="ExplorecardGrid main_page_width">
            <InfiniteScroll
              dataLength={exploreData?.length} //This is important field to render the next data
              next={fetchExploreData}
              hasMore={extraData?.has_more}
              loader={
                <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                  {browserWidth < 620 ? (
                    <LoadingCard />
                  ) : (
                    arr?.map((item, index) => {
                      return (
                        <Col
                          className="gutter-row"
                          span={browserWidth < 620 ? 24 : 8}
                          key={index}
                        >
                          <LoadingCard />
                        </Col>
                      );
                    })
                  )}
                </Row>
              }
              endMessage={
                <p className="all_seen_txt" style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
                {exploreData
                  ?.filter(filterExplore)
                  ?.filter(filterCategory)
                  ?.map((item, index) => {
                    return (
                      <Col
                        className="gutter-row"
                        span={browserWidth < 620 ? 24 : 8}
                        key={index}
                      >
                        <ExploreCard data={item} />
                      </Col>
                    );
                  })}
              </Row>
            </InfiniteScroll>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>No Such Collection Found</div>
        )}
        <NewsLetter />
      </div>
    </>
  );
};

export default ExplorePage;
