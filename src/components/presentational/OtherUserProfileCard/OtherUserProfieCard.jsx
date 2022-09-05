import React from "react";
import { Card } from "antd";
import "./OtherUserProfileCard.scss";

const { Meta } = Card;

const  OtherUserProfileCard = ({data}) => {
  return (
    <div className="OtherUserProfileCard">
      <Card
        cover={
          <span className="ProfileCardWrapper">
            <span className="ProfileCardImage">
              <img
                alt="example"
                src={data?.image_profile_location ? data?.image_profile_location : "https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528__340.jpg"}
              />
            </span>
          </span>
        }
      >
        <Meta title={data?.first_name+" "+data?.last_name}/>
      </Card>
    </div>
  );
};

export default OtherUserProfileCard;
