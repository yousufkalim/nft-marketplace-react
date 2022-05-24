import React from "react";
import PAGE_HEADER from "../../images/PageHeader.png";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import { Input, Form, Button, Col, Row } from "antd";
import Spin from "../../components/presentational/Spin";
import { Link } from "react-router-dom";
import "./Profile.scss";
import ProfileCard from "../../components/presentational/ProfileCard/ProfieCard";
import ProfileCollections from "./ProfileCollections";
import useWindowSize from "../../helpers/hooks";

const Profile = () => {
  const [browserWidth]=useWindowSize();
  return (
    <>
      <div className="ProfileWrapper">
        <div className="ProfileHeader">
          <img src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={"PAGE_HEADER"} />
        </div>
        <div className="userData">
          <div className="profileCard">
            <ProfileCard />
          </div>
          <div className="profilecardFotterSection">
            <span className="flexStyle">
              <span className="key">Profile ID</span>
              <span className="value changeColor">phill_lee</span>
            </span>
            <span className="flexStyle">
              <span className="key"> Joined</span>
              <span className="value">
                <span className="dFlex">
                  {/* <img src={PRICE_ICON} alt={"PRICE_ICON"} /> */}
                </span>{" "}
                April 2022
              </span>
            </span>
            <span className="flexStyle unsetBorder">
              <span className="key"> Website</span>
              <span className="value">www.nft.com</span>
            </span>
          </div>
        </div>
        <ProfileCollections/>
      </div>
    </>
  );
};

export default Profile;
