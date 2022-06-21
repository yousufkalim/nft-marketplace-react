import React, { useEffect, useState } from "react";
import FeaturedCard from "../../components/presentational/FeaturedCard/FeaturedCard";
import PAGE_HEADER_IMG from "../../images/PageHeader.png";
import RIGHT_ARROW from "../../images/right_arrow.svg";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import { Row, Col, Carousel } from "antd";
import NftLeftSection from "./NftLeftSection";
import NftRightSection from "./NftRightSection";
import DetailSection from "./DetailSection";
import { Link } from "react-router-dom";
import useWindowSize from "../../helpers/hooks";
// import DetailSection from "./DetailSection";
import "./NftDetail.scss";
import { nftDetailsApi } from "../../services/nftServices";
import CollectionNftView from "../CollectionView/CollectionNftView";
import Spin from "../../components/presentational/Spin";

const NftDetails = ({ match }) => {
  const arr = [1, 2, 3, 4, 5, 6];
  const [browserWidth] = useWindowSize();
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getNftDetail = async () => {
      try {
        setLoading(true);
        const res = await nftDetailsApi(match?.params?.id);
        console.log("res", res);
        setNftData(res?.data?.body);
        setLoading(false);
      } catch (error) {
        openNotification("Oops", error?.response?.data?.message);
        setLoading(false);
      }
    };
    getNftDetail();
  }, []);

  console.log("nftData", nftData);

  return (
    <div className="NftDetailPageWrapper">
      <div className="CollectionPageHeader">
        <img
          src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER_IMG}
          alt={"PAGE_HEADER_IMG"}
        />
      </div>
      <div className="selectedCollection main_page_width">
        <div className="CollectionDetailsSubHeader">
          <NftLeftSection nftData={nftData} />
          <NftRightSection nftData={nftData} />
        </div>
        <DetailSection nftData={nftData} />
      </div>
      <div className="resultCardsGrid">
        <div className="heading main_page_width">
          <span className="seeMore">More from this collection</span>
          <span>
            <Link to={`/collectionView/${nftData.store_front_guid}`}>
              <span className="view">View all</span>{" "}
              <img src={RIGHT_ARROW} alt="RIGHT_ARROW" />
            </Link>
          </span>
        </div>
        {loading ? (
          <Spin />
        ) : (
          <CollectionNftView
            collectionid={nftData?.store_front_guid}
            currentNftId={nftData?.guid}
            setCount={setCount}
          />
        )}
        {/* <CollectionNftView collectionid={nftData?.store_front_guid}/> */}
        {/* {browserWidth < 620 ? (
           <Carousel  dotPosition={"bottom"}>
            {arr.map(() => {
                return (
                    <FeaturedCard />
                );
              })}
         </Carousel>
        ) : (
          <div className="cardGrid">
            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              {arr.map(() => {
                return (
                  <Col className="gutter-row" span={12}>
                    <FeaturedCard />
                  </Col>
                );
              })}
            </Row>
          </div>
        )} */}
      </div>
      <NewsLetter />
    </div>
  );
};

export default NftDetails;
