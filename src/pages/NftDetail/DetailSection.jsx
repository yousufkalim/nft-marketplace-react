import { Tooltip } from "antd";
import React from "react";
import { truncateAddress } from "../../helpers/utils";
import "./DetailSection.scss";
import LineChart from "./LineChart";
import { Collapse } from "antd";
import OffersTable from "./OffersTable";
const { Panel } = Collapse;

const DetailSection = ({ nftData }) => {
  console.log("nftData", nftData);

  return (
    <div className="detailSection">
      <div className="detailselectedCollection">
        <div className="detailCollectionDetailsSubHeader">
          <div className="leftSide">
            <span className="aboutUserDesc">
              <Collapse expandIconPosition="end" className="headerDesign">
                <Panel
                  header={<div className="aboutUser">Traits & Attributes</div>}
                  key="1"
                >
                  <div className="nftTraitWrpper">
                    {nftData.nft_data_attributes?.length ?
                      nftData?.nft_data_attributes?.map((item) => {
                        return (
                          <div className="nftTrait">
                            <span className="name">{item?.trait_name}</span>
                            <span className="value">{item?.value}</span>
                          </div>
                        );
                      })
                    :
                    'No Such Traits Yet..'
                    }
                  </div>
                </Panel>
              </Collapse>
            </span>
            <span className="aboutUserDesc">
              <Collapse expandIconPosition="end" className="headerDesign">
                <Panel
                  header={<div className="aboutUser">Long Description</div>}
                  key="1"
                >
                  <div className="aboutUserDesc">
                    {nftData?.description_long}
                  </div>
                </Panel>
              </Collapse>
            </span>
          </div>
          <div className="details">
            <span className="heading">Details</span>
            <span className="flexStyle">
              <span className="key">Contract Address</span>
              <span className="value">
                {nftData?.contract_id && (
                  <a
                    href={`https://etherscan.io/address/${nftData?.contract_id}`}
                    target="_blank"
                  >
                    <Tooltip
                      color={"#303549"}
                      title={nftData?.contract_id}
                      placement={"leftTop"}
                    >
                      {truncateAddress(nftData?.contract_id)}
                    </Tooltip>
                  </a>
                )}
              </span>
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
        <div className="statsSection">
          <div className="chartContainer">
            <LineChart />
          </div>
          <div className="offers">
            <OffersTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
