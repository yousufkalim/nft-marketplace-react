import React from "react";
import CollectionDetailCard from "../../components/presentational/CollectionDetailCard/CollectionDetailCard";
import NftDetailCard from "../../components/presentational/NftDetailCard/NftDetailCard";
import PRICE_ICON from "../../images/price_icon.svg";

import "./NftLeftSection.scss";

const NftLeftSection = () => {
  return (
    <div className="NftleftSideSection">
      <span className="searchedCard">
        <NftDetailCard />
      </span>
    </div>
  );
};

export default NftLeftSection;
