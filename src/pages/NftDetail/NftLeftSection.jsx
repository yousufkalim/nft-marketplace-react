import React from "react";
import NftDetailCard from "../../components/presentational/NftDetailCard/NftDetailCard";

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
