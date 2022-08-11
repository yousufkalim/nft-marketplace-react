import React, { useEffect, useState } from "react";
import PAGE_HEADER_IMG from "../../images/PageHeader.png";
import BANNER_IMG from "../../images/banner_img.svg";
import FILTER_IMG from "../../images/filter_icon.svg";

import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import FlickerComp from "./Flicker";
import { Button, Input, Select, Spin } from "antd";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import CollectionNftView from "./CollectionNftView";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import { useSelector } from "react-redux";
import useWindowSize from "../../helpers/hooks";
import {
  collectionDetailsApi,
  collectionView,
} from "../../services/collectionServices";
import { openNotification } from "../../components/Smart/Notification";
import BreadCrumb from "../../components/Smart/Breadcrumb";
import FB from "../../images/facebook.svg";
import INSTAGRAM from "../../images/instagram.svg";
import LINKEDIN from "../../images/linkedin.svg";
import YOUTUBE from "../../images/youtube.svg";
import DISCORD from "../../images/discord_icon.svg";
import MEDIUM from "../../images/M_icon.svg";
import TWITTER from "../../images/twitter_icon.svg";
import "./CollectionView.scss";
import { codesAPI } from "../../services/createCollectionServices";
import { deployNFT } from "../../services/web3Services";

const CollectionView = ({ match }) => {
  const [collectionDetails, setCollectionDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [searchParam, setSearchParam] = useState("");
  const [filterCodes, setFilterCodes] = useState([]);
  const userData=useSelector(state=>state?.auth?.user);
  console.log(userData);
  useEffect(() => {
    const getCollectionDetails = async () => {
      try {
        setLoading(true);
        const res = await collectionDetailsApi(match.params.id);
        setCollectionDetails(res?.body);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openNotification("Oops", error?.response?.data?.message);
      }
    };
    getCollectionDetails();
  }, [match.params.id]);

  useEffect(async () => {
    try {
      await collectionView(match.params.id);
    } catch (error) {
      // openNotification("Oops", error?.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    const getCode = async () => {
      try {
        const res = await codesAPI("SortTypeCodes");
        setFilterCodes(res?.data?.body);
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      }
    };
    getCode();
  }, []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  console.log(collectionDetails);

  const handleDeployNFT = async () => {
    try {
      let name = collectionDetails?.store_name;
      let symbol = collectionDetails?.store_name
        ?.toUpperCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      let localGuid = collectionDetails?.guid;
      // debugger;
      const tx = await deployNFT(name, symbol, localGuid);
      console.log("tx", tx);
      if (tx) {
        openNotification(
          "Success",
          "Transaction submitted successfully, waiting for completion"
        );
      }
      // alert("Transaction submitted, please wait for confirmation, tx hash: " + tx?.hash);
    } catch (error) {
      console.log("error", error);
    }
  };

  const [browserWidth] = useWindowSize();

  return (
    <>
      {/* <BreadCrumb match={match} /> */}
      {loading ? (
        <div className="antdSpinContainer">
          <Spin />
        </div>
      ) : (
        <div className="CollectionViewPageWrapper">
          <div className="CollectionViewPageHeader">
            <img
              // src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER_IMG}
              src={
                collectionDetails?.image_banner_location?.includes("https")
                  ? collectionDetails?.image_banner_location
                  : PAGE_HEADER_IMG
              }
              alt={"COLLECTION_BANNER_IMG"}
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
                        collectionDetails?.image_large_location?.includes(
                          "https"
                        )
                          ? collectionDetails?.image_large_location
                          : BANNER_IMG
                      }
                      alt={"BANNER_IMG"}
                    />
                  </div>
                </div>
                <div className="socialIconsSection">
                  # {collectionDetails?.guid}
                  {/* <div className="socialIcons">
            <a className="socialIcon" href={collectionDetails?.url_twitter ?? 'https://twitter.com/'} target='_blank'>
              <img src={TWITTER} alt="TWITTER" />
            </a>
            <a className="socialIcon" href={collectionDetails?.url_discord} target='_blank'>
              <img src={DISCORD} alt="DISCORD" />
            </a>
            <a className="socialIcon" href={collectionDetails?.url_medium} target='_blank'>
              <img src={MEDIUM} alt="MEDIUM" />
            </a>
          </div> */}
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
            <div className="bannerDetailsWrapper main_page_width">
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
          <div className="socialIconsSection main_page_width display_none">
            # {collectionDetails?.guid}
            {/* <div className="socialIcons">
            <a className="socialIcon" href={collectionDetails?.url_twitter ?? 'https://twitter.com/'} target='_blank'>
              <img src={TWITTER} alt="TWITTER" />
            </a>
            <a className="socialIcon" href={collectionDetails?.url_discord} target='_blank'>
              <img src={DISCORD} alt="DISCORD" />
            </a>
            <a className="socialIcon" href={collectionDetails?.url_medium} target='_blank'>
              <img src={MEDIUM} alt="MEDIUM" />
            </a>
          </div>      
          </div>
          <div className="collectionDetailsWrapper main_page_width">
            <div className="collectionDetails">
              <span>{collectionDetails?.description_short}</span>
            </div> */}
          </div>
          {/* <FlickerComp /> */}
          <div className="searchBar_wrapper_outer">
            <div className="searchBar main_page_width">
              <div className="inputSection">
                <div className="searchInput">
                  <Input
                    suffix={<SearchOutlined />}
                    size="large"
                    placeholder="Search here"
                    value={searchParam}
                    onChange={(e) => setSearchParam(e.target.value)}
                  />
                </div>
                <div className="filterDropdown">
                  <Select
                    placeholder="Filter Data"
                    allowClear
                    onChange={handleChange}
                  >
                    {filterCodes?.map((item, index) => {
                      return (
                        <Select.Option value={item?.code} key={item + index}>
                          {item?.description}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
                <div className="filterImage">
                  <img src={FILTER_IMG} alt={"FILTER_IMG"} />
                </div>
              </div>
              <div className="reset">
                {!collectionDetails?.contract_address && userData && userData?.guid === collectionDetails?.user_details?.guid && (
                  <Button type="primary" onClick={handleDeployNFT}>
                    Deploy
                  </Button>
                )}
                <span>Showing {count} results</span>
              </div>
            </div>
          </div>
          <CollectionNftView
            collectionid={match?.params?.id}
            setCount={setCount}
            searchParam={searchParam}
            count={count}
          />
          <NewsLetter />
        </div>
      )}
    </>
  );
};

export default CollectionView;
