import React from "react";
import NftDetailCard from "../../components/presentational/NftDetailCard/NftDetailCard";

import "./NftLeftSection.scss";

const NftLeftSection = ({nftData}) => {
  return (
    <div className="NftleftSideSection">
      <span className="searchedCard">
        <NftDetailCard nftData={nftData} />
      </span>
      <span className="idSection">
       # {
          nftData?.collection_id ?? nftData?.guid
        }
      </span>
    </div>
  );
};

export default NftLeftSection;
