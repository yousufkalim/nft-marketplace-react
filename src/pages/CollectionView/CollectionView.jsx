import React from 'react'
import PAGE_HEADER_IMG from "../../images/PageHeader.png";

import './CollectionView.scss';


const CollectionView = () => {
  return (
    <div className="CollectionViewPageWrapper">
      <div className="CollectionViewPageHeader">
        <img src={PAGE_HEADER_IMG} alt={"PAGE_HEADER_IMG"} />
        <div className="CollectionViewHeadingSection">
            <span className="CollectionViewText">
            FIND, EXPLORE & FOLLOW DIGITAL ART NFTS.
            </span>
            <span className="CollectionViewHeading">GenOut Studios</span>
          </div>
      </div>
      <div className='bannerDetailsWrapper'>
         <div className='bannerDetails'>
             <div className='itemWrapper'>
                <span>
                    FloorPrice
                </span>
                <span>
                    $0.00
                </span>
             </div>
             <div className='itemWrapper'>
                <span>
                    FloorPrice
                </span>
                <span>
                    $0.00
                </span>
             </div>
         </div>   
      </div>
      </div>
  )
}

export default CollectionView