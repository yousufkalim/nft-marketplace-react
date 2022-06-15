import React from "react";
import PAGE_HEADER from "../../images/PageHeader.png";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import "./Profile.scss";
import ProfileCard from "../../components/presentational/ProfileCard/ProfieCard";
import useWindowSize from "../../helpers/hooks";
import { useSelector } from "react-redux";
import moment from "moment";
import ProfileCollections from "./ProfileCollections/ProfileCollections";

const Profile = () => {
  const [browserWidth]=useWindowSize();
  const profileData=useSelector(state=>state?.auth?.user);
  return (
    <>
      <div className="ProfileWrapper">
        <div className="ProfileHeader">
          <img src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={"PAGE_HEADER"} />
        </div>
        <div className="userData main_page_width">
          <div className="profileCard">
            <ProfileCard />
          </div>
          <div className="profilecardFotterSection">
            <span className="flexStyle">
              <span className="key">Profile ID</span>
              <span className="value changeColor">{profileData?.username}</span>
            </span>
            <span className="flexStyle">
              <span className="key"> Joined</span>
              <span className="value">
                <span className="dFlex">
                  {/* <img src={PRICE_ICON} alt={"PRICE_ICON"} /> */}
                </span>{" "}
                {moment(profileData?.created_at).format("MMM DD, YYYY")}
              </span>
            </span>
           {profileData?.url_personal && <span className="flexStyle unsetBorder">
              <span className="key"> Website</span>
              <span className="value">{profileData?.url_personal}</span>
            </span>}
          </div>
        </div>
        <ProfileCollections/>
      </div>
    </>
  );
};

export default Profile;
