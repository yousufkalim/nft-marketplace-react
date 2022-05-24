import React, { useEffect } from "react";
import PAGE_HEADER_IMG from "../../images/PageHeader.png";
import BANNER_IMG from "../../images/banner_img.svg";
import FILTER_IMG from "../../images/filter_icon.svg";

import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import FlickerComp from "./Flicker";
import { Input, Dropdown } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import "./CollectionView.scss";
import CollectionNftView from "./CollectionNftView";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import useWindowSize from "../../helpers/hooks";
import { collectionDetailsApi } from "../../services/collectionServices";

const CollectionView = ({match}) => {

  useEffect(()=>{
    const getCollectionDetails = async () => {
      try{
      const res=await collectionDetailsApi(match.params.id);
      console.log("res",res);
      }catch(error){
      console.log("err",error?.response?.data?.message);
      }
    }
    getCollectionDetails();
  },[])

  const [browserWidth] = useWindowSize();
  return (
    <div className="CollectionViewPageWrapper">
      <div className="CollectionViewPageHeader">
        <img
          src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER_IMG}
          alt={"PAGE_HEADER_IMG"}
        />
        <div className="CollectionViewHeadingSection">
          <span className="CollectionViewText">
            FIND, EXPLORE & FOLLOW DIGITAL ART NFTS.
          </span>
          <span className="CollectionViewHeading">GenOut Studios</span>
        </div>
      </div>
      {browserWidth < 620 ? (
        <div className="mobileBannerDetailsWrapper">
          <div className="mobileBannerDetails">
            <div className="banner">
              <div className="imageWrapper">
                <img src={BANNER_IMG} alt={"BANNER_IMG"} />
              </div>
            </div>
            <div className="values">
              <div className="mobileItemWrapper">
                <span>FloorPrice</span>
                <span>$0.00</span>
              </div>
              <div className="mobileItemWrapper">
                <span>FloorPrice</span>
                <span>$0.00</span>
              </div>
              <div className="mobileItemWrapper">
                <span>FloorPrice</span>
                <span>$0.00</span>
              </div>
              <div className="mobileItemWrapper">
                <span>FloorPrice</span>
                <span>$0.00</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
      )}
      <div className="collectionDetailsWrapper">
        <div className="collectionDetails">
          <span>
            The GenOut Studios is a collection of 10,000 unique Animated NFTs—
            unique digital collectibles living on the Ethereum blockchain. Your
            GenOut Studios grants access to members-only benefits, the first of
            which is access to the treasure chest, a stockpile of goodies.
            Future areas and perks can be unlocked by the community through
            other rewards.
          </span>
        </div>
      </div>
      <FlickerComp />
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
            {/* <Dropdown overlay={true} trigger={["click"]}> */}
              <a onClick={(e) => e.preventDefault()}>
                <span>
                  Price
                  <DownOutlined className="downIcon" />
                </span>
              </a>
            {/* </Dropdown> */}
          </div>
          <div className="filterImage">
            <img src={FILTER_IMG} alt={"FILTER_IMG"} />
          </div>
        </div>
        <div className="reset">Showing 54 results</div>
      </div>
      <CollectionNftView />
      <NewsLetter />
    </div>
  );
};

export default CollectionView;
