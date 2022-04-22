import React from "react";
import BG_IMGAGE from "../../images/HomePageHeader.svg";
import IMAGE_FOOTER from "../../images/imageFooter.svg";
import RIGHT_ARROW from "../../images/right_arrow.svg";

import { Row, Col } from "antd";
import NftCard from "../../components/presentational/Card/Card";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <>
      <div className="subHeader">
       <div className="bgImage"  style={{background: `url(${BG_IMGAGE}) no-repeat` }} >
        <div className="leftSide">
          <span className="leftHeading" >
        Purchase artwork or start publishing now
        </span>
        <span className="leftSubHeading" >
        Explore a collection of entertaining animations, comics and anime of talented artists from around the world
        </span>
        <span className="btnSection">
          <span className="explore">
            Explore
          </span>
          <span className="create" >
            Create
          </span>
        </span>
        </div>
        <div className="rightSide" >
          <span className="leftHeading">
          <NftCard />
          </span>
        </div>

      </div>
        <img src={IMAGE_FOOTER} alt={"IMAGE_FOOTER"} className="footerImage" />
      </div>
      <div className="heading">
        <span className="topHits">Top Hits</span>
        <span>
          <span className="discover">Discover</span>
          <img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} />
        </span>
      </div>
      <div className="cardGrid">
        <Row>
          <Col className="gutter-row"  md={6}>
            <NftCard />
          </Col>
          <Col className="gutter-row"  md={6}>
            <NftCard />
          </Col>
          <Col className="gutter-row"  md={6} >
            <NftCard />
          </Col>
          <Col className="gutter-row"  md={6} >
            <NftCard />
          </Col>
          <Col className="gutter-row"  md={6} >
            <NftCard />
          </Col>
          <Col className="gutter-row"  md={6} >
            <NftCard />
          </Col>
          <Col className="gutter-row"  md={6} >
            <NftCard />
          </Col>
          <Col className="gutter-row"  md={6} >
            <NftCard />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
