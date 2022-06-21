import React from "react";
import { Card } from "antd";
import "./FlickerCard.scss";

const FlickerCard = () => {
  return (
    <div className="flickerCard">
      <Card
        hoverable
        bordered={false}
        cover={
          <span className="flickerCardWrapper">
            <span className="flickerCardImage">
              <img
                alt="example"
                src="https://nftdepotblob.blob.core.windows.net/images/first/smh5bgbtfb6acg5i7x2mwnu5x25p3tqyb.PNG"
              />
            </span>
          </span>
        }
      >
        <div className="flickerCardFooter">
          <span className="descHeading">
             <span className="priceHeading">Private collection unique characters</span>
          </span>
          <span className="rightSection">
            <span>
              <span className="beliefPrice">RARITY</span>
            </span>
            <span className="tagImage">
              <span className="tagPrice">30%</span>
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default FlickerCard;
