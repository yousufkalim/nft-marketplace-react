import React from 'react'
import RIGHT_ARROW from "../../images/right_arrow.svg";
import { Row, Col } from "antd";
import NftCard from "../../components/presentational/Card/Card";
import './TopHits.scss';

const TopHits = () => {
  return (
    <div className='TopHits'>
     <div className="heading">
        <span className="topHits">Top Hits</span>
        <span>
          <span className="discover">Discover</span>
          <img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} />
        </span>
      </div>
      <div className="cardGrid">
        <Row>
          <Col className="gutter-row" md={6}>
            <NftCard />
          </Col>
          <Col className="gutter-row" md={6}>
            <NftCard />
          </Col>
          <Col className="gutter-row" md={6}>
            <NftCard />
          </Col>
          <Col className="gutter-row" md={6}>
            <NftCard />
          </Col>
          <Col className="gutter-row" md={6}>
            <NftCard />
          </Col>
          <Col className="gutter-row" md={6}>
            <NftCard />
          </Col>
          <Col className="gutter-row" md={6}>
            <NftCard />
          </Col>
          <Col className="gutter-row" md={6}>
            <NftCard />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default TopHits