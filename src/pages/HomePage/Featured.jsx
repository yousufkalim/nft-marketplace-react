import React from 'react'
import FeaturedCard from '../../components/presentational/FeaturedCard/FeaturedCard';
import RIGHT_ARROW from "../../images/right_arrow.svg";
import { Row,Col } from 'antd';
import './Featured.scss';

const Featured = () => {
  return (
    <div className='featured'>
          <div className="heading">
        <span className="feature">Featured</span>
        <span>
          <span className="discover">Discover</span>
          <img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} />
        </span>
      </div>
      <div className="cardGrid">
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          <Col className="gutter-row" span={12}>
            <FeaturedCard />
          </Col>
          <Col className="gutter-row" span={12}>
          < FeaturedCard />
          </Col>
          <Col className="gutter-row" span={12}>
          < FeaturedCard />
          </Col>
          <Col className="gutter-row" span={12}>
          < FeaturedCard />
          </Col>
          <Col className="gutter-row" span={12}>
          < FeaturedCard />
          </Col>
          <Col className="gutter-row" span={12}>
          < FeaturedCard />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Featured