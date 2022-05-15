import React, { useEffect } from "react";
import { Card } from "antd";
import FRAME_ICON from "../../../images/frame.svg";
import TEST_ICON from "../../../images/test_footer.svg";
import { Tooltip } from "antd";
import "./Card.scss";
import { getImageUrl } from "../../../services/createCollectionServices";
import TEST_IMG from "../../../images/test_img.png";

const { Meta } = Card;

const NftCard = ({ showTopPick = false ,data}) => {
  // useEffect(()=>{
  //   const getImgrl=async()=>{
  //     const res=await getImageUrl(data?.image_large_location)
  //     console.log("res",res);
  //   }
  //   getImgrl();
  // },[])
  return (
    <div className="imageCard">
      <Card
        hoverable
        cover={
          <span className="coverWrapper">
            <span className="coverImage" >
            <img
              alt="example"
              src={TEST_IMG}
             
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
        <Meta title={data?.store_name} description={data?.description_short} />
      </Card>
    </div>
  );
};

export default NftCard;
