import React from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import TEST_ICON from "../../../images/test_footer.svg";
import { Tooltip } from "antd";
import "./Card.scss";

const { Meta } = Card;

const NftCard = ({ showTopPick = false }) => {
  return (
    <div className="imageCard">
      <Card
        hoverable
        cover={
          <span className="coverWrapper">
            <span className="coverImage" >
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
             
            />
            </span>
            <Tooltip title="Add to favourites" color={'#303549'}  overlayClassName="favouriteToolTip" >
              <span className="frame">
                <img src={FRAME_ICON} alt={"FRAME_ICON"} />
              </span>
            </Tooltip>

            <span
              className="footer"
              style={{ background: `url(${TEST_ICON}) no-repeat` }}
            ></span>
            {showTopPick && <span className="tag">TOP PICK</span>}
          </span>
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </div>
  );
};

export default NftCard;
