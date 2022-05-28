import React, { useEffect, useState } from "react";
import PAGE_HEADER_IMG from "../../images/PageHeader.png";
import BANNER_IMG from "../../images/banner_img.svg";
import FILTER_IMG from "../../images/filter_icon.svg";

import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import FlickerComp from "./Flicker";
import { Input } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import "./CollectionView.scss";
import CollectionNftView from "./CollectionNftView";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import useWindowSize from "../../helpers/hooks";
import { collectionDetailsApi, collectionView } from "../../services/collectionServices";
import { openNotification } from "../../components/Smart/Notification";

const CollectionView = ({ match }) => {
  const [collectionDetails, setCollectionDetails] = useState([]);

  useEffect(() => {
    const getCollectionDetails = async () => {
      try {
        const res = await collectionDetailsApi(match.params.id);
        setCollectionDetails(res?.data?.body);
        console.log("res", res);
      } catch (error) {
        openNotification("Oops", error?.response?.data?.message);
      }
    };
    getCollectionDetails();
  }, [match.params.id]);

  useEffect(async()=>{
    try{
      await collectionView(match.params.id);
    }
    catch(error){
      // openNotification("Oops", error?.response?.data?.message);
    }
  },[])

  const [browserWidth] = useWindowSize();
  return (
    <div className="CollectionViewPageWrapper">
      <div className="CollectionViewPageHeader">
        <img
          // src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER_IMG}
          src={
            collectionDetails?.image_banner_location?.includes("https")
              ? collectionDetails?.image_banner_location
              : PAGE_HEADER_IMG
          }
          alt={"PAGE_HEADER_IMG"}
        />
        <div className="CollectionViewHeadingSection">
          {/* <span className="CollectionViewText">
            FIND, EXPLORE & FOLLOW DIGITAL ART NFTS.
          </span> */}
          <span className="CollectionViewHeading">
            {collectionDetails?.store_name}
          </span>
        </div>
      </div>
      {browserWidth < 620 ? (
        <div className="mobileBannerDetailsWrapper">
          <div className="mobileBannerDetails">
            <div className="banner">
              <div className="imageWrapper">
                <img
                  src={
                    collectionDetails?.image_large_location?.includes("https")
                      ? collectionDetails?.image_large_location
                      : BANNER_IMG
                  }
                  alt={"BANNER_IMG"}
                />
              </div>
            </div>
            <div className="values">
              <div className="mobileItemWrapper">
                <span>FloorPrice</span>
                <span>$0.00</span>
              </div>
              <div className="mobileItemWrapper">
                <span>Volume Traded</span>
                <span>$0.00</span>
              </div>
              <div className="mobileItemWrapper">
                <span>Items</span>
                <span>$0.00</span>
              </div>
              <div className="mobileItemWrapper">
                <span>Owners</span>
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
              <span>Volume Traded</span>
              <span>$0.00</span>
            </div>
            <div className="imageWrapper">
              <img
                src={
                  collectionDetails?.image_large_location?.includes("https")
                    ? collectionDetails?.image_large_location
                    : BANNER_IMG
                }
                alt={"BANNER_IMG"}
              />
            </div>
            <div className="itemWrapper">
              <span>Items</span>
              <span>$0.00</span>
            </div>
            <div className="itemWrapper">
              <span>Owners</span>
              <span>$0.00</span>
            </div>
          </div>
        </div>
      )}
      <div className="collectionDetailsWrapper">
        <div className="collectionDetails">
          <span>{collectionDetails?.description_short}</span>
        </div>
      </div>
      {/* <FlickerComp /> */}
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
      <CollectionNftView collectionid={match?.params?.id} />
      <NewsLetter />
    </div>
  );
};

export default CollectionView;
