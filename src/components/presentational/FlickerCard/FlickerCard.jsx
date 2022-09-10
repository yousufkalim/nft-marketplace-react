import React from "react";
import { Card } from "antd";
import "./FlickerCard.scss";

const FlickerCard = ({data}
  ) => {
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
                src={data?.image_location}
              />
            </span>
          </span>
        }
      >
        <div className="flickerCardFooter">
          <span className="descHeading">
             <span className="priceHeading">{data?.image_name}</span>
          </span>
          <span className="rightSection">
            <span>
              <span className="beliefPrice">RARITY</span>
            </span>
            <span className="tagImage">
              <span className="tagPrice">{data?.rarity}%</span>
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default FlickerCard;
