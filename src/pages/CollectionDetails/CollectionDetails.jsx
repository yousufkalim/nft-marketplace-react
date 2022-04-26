import React from "react";
import CollectionDetailCard from "../../components/presentational/CollectionDetailCard/CollectionDetailCard";
import PAGE_HEADER_IMG from "../../images/collection_detail_header.svg";

import "./CollectionDetails.scss";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const CollectionDetails = () => {
  return (
    <div className="CollectionPageWrapper">
      <div className="CollectionPageHeader">
        <img src={PAGE_HEADER_IMG} alt={"PAGE_HEADER_IMG"} />
      </div>
      <div className="selectedCollection">
        <div className="CollectionDetailsSubHeader">
          <LeftSection />
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
