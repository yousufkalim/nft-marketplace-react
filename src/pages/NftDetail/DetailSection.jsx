import React from "react";
import "./DetailSection.scss";
import LineChart from "./LineChart";
import OffersTable from "./OffersTable";

const DetailSection = ({nftData}) => {

  return (
    <div className="detailSection">
      <div className="detailselectedCollection">
        <div className="detailCollectionDetailsSubHeader">
          <div className="leftSide">
            <span className="aboutUser">About {nftData?.created_by}</span>
            <span className="aboutUserDesc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </span>
          </div>
          <div className="details">
          <span className="heading">Details</span>
            <span className="flexStyle">
              <span className="key">Contract Address</span>
              <span className="value">0xeaa4...bb7b</span>
            </span>
            <span className="flexStyle">
              <span className="key"> Token ID</span>
              <span className="value">
                <span className="dFlex">
                  {/* <img src={PRICE_ICON} alt={"PRICE_ICON"} /> */}
                </span>{" "}
                {nftData?.token_id}
              </span>
            </span>
            <span className="flexStyle">
              <span className="key"> Token Standard</span>
              <span className="value">ERC-721</span>
            </span>
            <span className="flexStyle unsetBorder">
              <span className="key"> Blockchain</span>
              <span className="value">{nftData?.minting_coin}</span>
            </span>
          </div>
        </div>
        <div className="statsSection" >
          <div className="chartContainer"><LineChart/></div>
          <div className="offers"><OffersTable/></div> 
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
