import { Col, Row } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import ExploreCard from '../../components/presentational/ExploreCard/ExploreCard';
import PAGE_HEADER_IMG from "../../images/PageHeader.png";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import CategoryFlicker from './CategoryFlicker';
import './FilterCollections.scss'
import useWindowSize from '../../helpers/hooks';

const FilterCollections = () => {
    const arr=[1,2,3,4,5,5,6,7]
    const [browserWidth]=useWindowSize();
  return (
    <div className='FilterCollectionsPageWrapper'>
         <div className="FilterCollectionsPageHeader">
        <img src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER_IMG} alt={"PAGE_HEADER_IMG"} />
        <div className="FilterCollectionsHeadingSection">
          <span className="FilterCollectionsText">
            FIND, EXPLORE & FOLLOW DIGITAL ART NFTS.
          </span>
          <span className="FilterCollectionsHeading">Find your favorite collections</span>
        </div>
      </div>
      <CategoryFlicker/>
      <div className="filterCollectionscardGrid">
            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              {arr
            //   ?.filter(filterExplore)
              ?.map((item, index) => {
                return (
                  <Col className="gutter-row" span={browserWidth < 620 ? 24 : 8} key={index}>
                   <Link to={'/collectionView'} ><ExploreCard data={item} /></Link> 
                  </Col>
                );
              })}
            </Row>
        </div>
    </div>
  )
}

export default FilterCollections