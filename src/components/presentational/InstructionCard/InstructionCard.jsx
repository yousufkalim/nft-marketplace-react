import React from "react";

import "./InstructionCard.scss";

const InstructionCard = ({title,description,changeDirection,imageUrl}) => { 
  return (
    <div className="InstructionCard" style={changeDirection ? {direction:'rtl'} : {}}>
      <div className="shadowBg">
        <span className="imageContainer">
          <img src={imageUrl} alt={'imageHere'} />
        </span>
      </div>
      <div className="intructText" style={changeDirection ? {marginRight:'22px'} : {marginLeft:'22px'}} >
        <span className="InstructHeading">{title}</span>
        <span className="InstructDesc">
          {description}
        </span>
      </div>
    </div>
  );
};

export default InstructionCard;
