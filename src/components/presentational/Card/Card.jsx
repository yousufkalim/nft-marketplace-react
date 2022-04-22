import React from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import TEST_ICON from "../../../images/test_footer.svg";

import './Card.scss';

const { Meta } = Card;

const NftCard = () => {
  return (
    <div className="imageCard">
    <Card
      hoverable
      style={{ width: '343px', height: '430px' }}
      cover={
          <span style={{position:'relative'}}>
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          style={{objectFit:'cover',borderRadius:'10px 10px 0px 0px'}}
          width="343"
          height="303"
        />
        <span className="frame">
            <img src={FRAME_ICON} alt={'FRAME_ICON'} />
        </span>
        <span className="footer" style={{background: `url(${TEST_ICON}) no-repeat` }} >
        </span>
        </span>
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
    </div>
  );
};

export default NftCard;
