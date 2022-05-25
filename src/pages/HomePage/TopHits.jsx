import React, { useEffect, useState } from "react";
import RIGHT_ARROW from "../../images/right_arrow.svg";
import { Row, Col,Carousel } from "antd";
import NftCard from "../../components/presentational/Card/Card";
import "./TopHits.scss";
import { getTopHitsAPI } from "../../services/homePageServices";
import { Link } from "react-router-dom";
import useWindowSize from "../../helpers/hooks";
import { openNotification } from "../../components/Smart/Notification";

const TopHits = () => {
  const [topHits, setTopHits] = useState([]);
  const [browserWidth]=useWindowSize()
  useEffect(() => {
    const topHits = async () => {
      try{
      const res = await getTopHitsAPI();
      setTopHits(res?.data?.body);
      }
      catch(error){
        openNotification("Oops",error?.response?.data?.message)
      }
    };

    topHits();
  }, []);

  const filterTopHits = (topHits) => {
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



  return (
    <div className="TopHits">
      <div className="heading">
        <span className="topHits">Top Hits</span>
        <span>
          <span className="discover">Discover</span>
          <Link to={"/explore"}>
            <img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} />
          </Link>
        </span>
      </div>
      <div className="cardGrid">
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          {topHits
            ?.filter(filterTopHits)
            ?.slice(0, 8)
            ?.map((item, index) => {
              return (
                <Col className="gutter-row" span={6} key={index}>
                  {/* <Link to={"/collectionView/"}> */}
                    <NftCard data={item} />
                  {/* </Link> */}
                </Col>
              );
            })}
        </Row>
      </div>
      {browserWidth <620  && (
         <Carousel  dotPosition={"bottom"}>
         {topHits
            ?.filter(filterTopHits)
            ?.slice(0, 8)
            ?.map((item, index) => {
              return (
                  <Link to={"/collectionView"} key={index}>
                    <NftCard data={item} />
                  </Link>
              );
            })}
       </Carousel>
      )
      }
    </div>
  );
};

export default TopHits;
