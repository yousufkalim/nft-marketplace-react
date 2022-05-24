import React,{useState,useEffect} from 'react'
import FeaturedCard from '../../components/presentational/FeaturedCard/FeaturedCard';
import RIGHT_ARROW from "../../images/right_arrow.svg";

import { Row,Col,Carousel } from 'antd';
import './Featured.scss';
import { getFeaturedAPI } from '../../services/homePageServices';
import { Link } from 'react-router-dom';
import useWindowSize from '../../helpers/hooks';
import ExploreCard from '../../components/presentational/ExploreCard/ExploreCard';
import FeatureMobileCard from '../../components/presentational/FeatureMobileCard/FeatureMobileCard';

const Featured = () => {
  const [featured, setFeatured] = useState([]);
  const [browserWidth]=useWindowSize()
  useEffect(() => {
    const featured = async () => {
      const res = await getFeaturedAPI();
      setFeatured(res?.data?.body);
    };

    featured();
  }, []);

  const filterFeatured = (featured) => {
    if (featured?.image_large_location?.includes("https")) {
      const check = featured?.image_large_location?.lastIndexOf(".");
      const extension = featured?.image_large_location.slice(check);
      if (extension !== ".svg") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  return (
    <div className='featured'>
          <div className="heading">
        <span className="feature">Featured</span>
        <span>
          <span className="discover">Discover</span>
          <Link to={'/explore'} ><img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} /></Link>
        </span>
      </div>
      <div className="cardGrid">
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          {
            featured
            ?.filter(filterFeatured)
            ?.slice(0,8)?.map((item, index) => {
              return (
                <Col className="gutter-row" span={12} key={index}>
                  <Link to={'/explore'} ><FeaturedCard data={item}/></Link>
                </Col>
              );
            })
          }
        </Row>
      </div>
      {browserWidth <620  && (
         <Carousel dotPosition={"bottom"}>
         { featured
            ?.filter(filterFeatured)
            ?.slice(0,8)?.map((item, index) => {
              return (
                  <Link to={'/explore'} key={index} ><FeatureMobileCard data={item}/></Link>
              );
            })
            }
       </Carousel>
      )
      }
    </div>
  )
}

export default Featured