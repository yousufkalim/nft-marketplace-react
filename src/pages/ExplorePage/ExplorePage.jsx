import React, { useState } from "react";
import ExploreCard from "../../components/presentational/ExploreCard/ExploreCard";
import PAGE_HEADER from "../../images/Page_Header.svg";
import { Row,Col } from "antd";
import './ExplorePage.scss';
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";

const ExplorePage = () => {
  return (
    <>
      <div className="ExplorePageWrapper">
        <div className="ExplorePageHeader">
          <img src={PAGE_HEADER} alt={"PAGE_HEADER"} />
          <div className="exploreHeadingSection">
            <span className="exploreText" >FIND, EXPLORE & FOLLOW DIGITAL ART NFTS.</span>
            <span className="exploreHeading" >Explore Collections</span>
          </div>
        </div>
       
        <div className="ExplorecardGrid">
        <Row>
          <Col className="gutter-row" md={8}>
            <ExploreCard />
          </Col>
          <Col className="gutter-row" md={8}>
            <ExploreCard />
          </Col>
          <Col className="gutter-row" md={8}>
            <ExploreCard />
          </Col>
          <Col className="gutter-row" md={8}>
            <ExploreCard />
          </Col>
        </Row>
      </div>
        <NewsLetter/>
      </div>
    </>
  );
};

export default ExplorePage;
