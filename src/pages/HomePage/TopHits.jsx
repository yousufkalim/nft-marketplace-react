import React, { useEffect, useState } from "react";
import RIGHT_ARROW from "../../images/right_arrow.svg";
import { Row, Col } from "antd";
import NftCard from "../../components/presentational/Card/Card";
import "./TopHits.scss";
import { getTopHitsAPI } from "../../services/homePageServices";
import { getImageUrl } from "../../services/createCollectionServices";

const TopHits = () => {
  const [topHits, setTopHits] = useState([]);

  useEffect(() => {
    const topHits = async () => {
      const res = await getTopHitsAPI();
      setTopHits(res?.data?.body);
    };

    topHits();
  }, []);

  return (
    <div className="TopHits">
      <div className="heading">
        <span className="topHits">Top Hits</span>
        <span>
          <span className="discover">Discover</span>
          <img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} />
        </span>
      </div>
      <div className="cardGrid">
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          {topHits.map((item, index) => {
            return (
              <Col className="gutter-row" span={6} key={index}>
                <NftCard data={item}/>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default TopHits;
