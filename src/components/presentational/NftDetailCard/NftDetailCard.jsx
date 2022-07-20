import React,{useState} from "react";
import { Card,Modal } from "antd";
import "./NftDetailCard.scss";

const { Meta } = Card;

const NftDetailCard = ({nftData}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
    <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null} closable={false}>
        <div className="modalImageWrapper">
          <img
          alt="example"
          src={nftData?.nft_data?.image_location?.includes("https") ?  nftData?.nft_data?.image_location : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
          />
        </div>
      </Modal>
    <div className="NftDetailCard">
      <Card
        hoverable
        cover={
          <span className="ExploreCardWrapper">
            <span className="ExploreCardImage">
              <img
                alt="example"
                src={nftData?.nft_data?.image_location?.includes("https") ?  nftData?.nft_data?.image_location : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
              />
            </span>
          </span>
        }
        onClick={showModal}
      >
      </Card>
    </div>
    </>
  );
};

export default NftDetailCard;
