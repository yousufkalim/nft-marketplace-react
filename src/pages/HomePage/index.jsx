import React from "react";
import BG_IMGAGE from "../../images/HomePageHeader.svg";
import IMAGE_FOOTER from "../../images/imageFooter.svg";
import TopHits from "./TopHits";
import NftCard from "../../components/presentational/Card/Card";
import "./index.scss";
import Featured from "./Featured";
import CreateandSellNft from "./CreateandSellNft";
import InstructionCard from "../../components/presentational/InstructionCard/InstructionCard";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="subHeader">
        <div
          className="bgImage"
          style={{ background: `url(${BG_IMGAGE}) no-repeat` }}
        >
          <div className="leftSide">
            <span className="leftHeading">
              Purchase artwork or start publishing now
            </span>
            <span className="leftSubHeading">
              Explore a collection of entertaining animations, comics and anime
              of talented artists from around the world
            </span>
            <span className="btnSection">
              <span className="explore">Explore</span>
              <span className="create">Create</span>
            </span>
          </div>
          <div className="rightSide">
            <span className="leftHeading">
              <NftCard showTopPick={true} />
            </span>
          </div>
        </div>
        <img src={IMAGE_FOOTER} alt={"IMAGE_FOOTER"} className="footerImage" />
      </div>
      <TopHits />
      <Featured/>
      <CreateandSellNft/>
      <NewsLetter/>
    </div>
  );
};

export default HomePage;
