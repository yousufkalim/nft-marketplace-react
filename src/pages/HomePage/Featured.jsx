import React,{useState,useEffect} from 'react'
import FeaturedCard from '../../components/presentational/FeaturedCard/FeaturedCard';
import RIGHT_ARROW from "../../images/right_arrow.svg";
import { Row,Col } from 'antd';
import './Featured.scss';
import { getFeaturedAPI } from '../../services/homePageServices';
import { Link } from 'react-router-dom';

const Featured = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const featured = async () => {
      const res = await getFeaturedAPI();
      setFeatured(res?.data?.body);
    };

    featured();
  }, []);

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
            featured?.slice(0,8)?.map((item, index) => {
              return (
                <Col className="gutter-row" span={12} key={index}>
                  <Link to={'/explore'} ><FeaturedCard data={item}/></Link>
                </Col>
              );
            })
          }
        </Row>
      </div>
    </div>
  )
}

export default Featured