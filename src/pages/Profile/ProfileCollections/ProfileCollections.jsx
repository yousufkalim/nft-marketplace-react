import React, { useState } from "react";
import NewsLetter from "../../../components/presentational/NewsLetter/NewsLetter";
import useWindowSize from "../../../helpers/hooks";
import MyCollections from "./MyCollections";
import CollectedNfts from "./CollectedNfts";
import "./ProfileCollections.scss";
import Followed from "./Followed";
import ProfileCollectionsFlicker from "../ProfileCollectionsFlicker";

const ProfileCollections = () => {
  const arr = [0, 1, 2];
  const [browserWidth] = useWindowSize();
  const [currentTab, setCurrentTab] = useState("MY COLLECTION");
  const [myCollectionItemsCount,setMyCollectionItemsCount]=useState(0);
  const [myCollectedNftsCount,setMyCollectedNftsCount]=useState(0);
  const [myFollowedCount,setMyFollowedCount]=useState(0);

  return (
    <>
      <div className="ProfileCollectionWrapper">
        <div className="filterHeader main_page_width">
          <div
            className="filterItem"
            onClick={() => setCurrentTab("CREATED")}
          >
            <span
              className={currentTab == "CREATED" ? "highlighted" : "text"}
            >
              CREATED
            </span>
            <span className="value">{0}</span>
          </div>
          <div
            className="filterItem"
            onClick={() => setCurrentTab("COLLECTED Nfts")}
          >
            <span
              className={currentTab == "COLLECTED Nfts" ? "highlighted" : "text"}
            >
              COLLECTED Nfts
            </span>
            <span className="value">{myCollectedNftsCount}</span>
          </div>
          <div className="filterItem" onClick={() => setCurrentTab("FOLLOWED")}>
            <span className={currentTab == "FOLLOWED" ? "highlighted" : "text"}>
              FOLLOWED
            </span>
            <span className="value">{myFollowedCount}</span>
          </div>
          <div className="filterItem" onClick={() => setCurrentTab("ACTIVITY")}>
            <span className={currentTab == "ACTIVITY" ? "highlighted" : "text"}>
              ACTIVITY
            </span>
            <span className="value">{0}</span>
          </div>
          <div
            className="filterItem"
            onClick={() => setCurrentTab("MY COLLECTION")}
          >
            <span
              className={currentTab == "MY COLLECTION" ? "highlighted" : "text"}
            >
              MY COLLECTION
            </span>
            <span className="value">{myCollectionItemsCount}</span>
          </div>
        </div>
        {browserWidth < 620 && <ProfileCollectionsFlicker currentTab={currentTab} setCurrentTab={setCurrentTab}  />  }
        {currentTab == "MY COLLECTION" ? (
          <MyCollections setMyCollectionItemsCount={setMyCollectionItemsCount}  />
        ) : currentTab == "COLLECTED Nfts" ? (
          <CollectedNfts setMyCollectedNftsCount={setMyCollectedNftsCount} />
        ) : currentTab == "FOLLOWED" ? (
          <Followed setMyFollowedCount={setMyFollowedCount} />
        ) : (
          <div style={{textAlign:'center'}}>Coming Soon</div>
        )}
        <NewsLetter />
      </div>
    </>
  );
};

export default ProfileCollections;
