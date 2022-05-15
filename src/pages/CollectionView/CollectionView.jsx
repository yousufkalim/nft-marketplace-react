import React from "react";
import PAGE_HEADER_IMG from "../../images/PageHeader.png";
import BANNER_IMG from "../../images/banner_img.svg";
import FlickerComp from "./Flicker";
import { Input,Dropdown} from "antd";
import {SearchOutlined,DownOutlined } from "@ant-design/icons";
import "./CollectionView.scss";
import CollectionNftView from "./CollectionNftView";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";


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
      <div className="bannerDetailsWrapper">
        <div className="bannerDetails">
          <div className="itemWrapper">
            <span>FloorPrice</span>
            <span>$0.00</span>
          </div>
          <div className="itemWrapper">
            <span>FloorPrice</span>
            <span>$0.00</span>
          </div>
          <div className="imageWrapper">
            <img src={BANNER_IMG} alt={"BANNER_IMG"} />
          </div>
          <div className="itemWrapper">
            <span>FloorPrice</span>
            <span>$0.00</span>
          </div>
          <div className="itemWrapper">
            <span>FloorPrice</span>
            <span>$0.00</span>
          </div>
        </div>
      </div>
      <div className="collectionDetailsWrapper">
        <div className="collectionDetails">
        <span>
        The GenOut Studios is a collection of 10,000 unique Animated NFTs— unique digital collectibles living on the Ethereum blockchain. Your GenOut Studios grants access to members-only benefits, the first of which is access to the treasure chest, a stockpile of goodies. Future areas and perks can be unlocked by the community through other rewards.
        </span>
        </div>
      </div>
      <FlickerComp/>
      <div className="searchBar">
        <div className="inputSection">
          <div className="searchInput">
              <Input
                suffix={<SearchOutlined />}
                size="large"
                placeholder="Search here"
              />
          </div>
          <div className="filterDropdown">
            <Dropdown overlay={true} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <span>
                  Click me
                  <DownOutlined />
                </span>
              </a>
            </Dropdown>
          </div>
          <div className="filterImage">
            {/* <img src={FILTER_IMG} alt={"FILTER_IMG"} /> */}
          </div>
        </div>
        <div className="reset">Showing 54 results</div>
      </div>
      <CollectionNftView/>
      <NewsLetter/>
    </div>
  );
};

export default CollectionView;
