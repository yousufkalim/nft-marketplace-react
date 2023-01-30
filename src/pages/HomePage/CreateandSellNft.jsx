import React from "react";
import InstructionCard from "../../components/presentational/InstructionCard/InstructionCard";
import SETUP_WALLET from "../../images/setup_wallet.svg";
import CREATE_COLLECTION from "../../images/create_collection.svg";
import ADD_NFT from "../../images/add_nft.svg";
import LIST_NFT from "../../images/list_nft.svg";

import "./CreateandSellNft.scss";

const CreateandSellNft = () => {
  const Instruction = [
    {
      id: 1,
      title: "Set up your wallet",
      description:
        "Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the",
      changeDirection: false,
      imageUrl: SETUP_WALLET,
    },
    {
      id: 2,
      title: "Create your collection",
      description:
        "Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.",
      changeDirection: true,
      imageUrl: CREATE_COLLECTION,
    },
    {
      id: 3,
      title: "Add your NFTs",
      description:
        "Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.",
      changeDirection: false,
      imageUrl: ADD_NFT,
    },
    {
      id: 4,
      title: "List them for sale",
      description:
        "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!",
      changeDirection: true,
      imageUrl: LIST_NFT,
    },
  ];

  const onFinish = async () => {
    
      history.push("../CreateNft/CreateNft.jsx");
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <div className="instructionSection main_page_width">
      <div className="headingText">Create and sell your NFTs</div>
      <div>
          {
            Instruction.map((item,index) => (
                <InstructionCard title={item?.title} description={item?.description} changeDirection={item?.changeDirection} imageUrl={item?.imageUrl} key={index} />
            ))
          }
          <div className="Createnft">
          
            {/* name="basic"
            layout="vertical"
            initialValues={{
            }}
            scrollToFirstError="true" */}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            </div>
          
      </div>
    </div>
  );
};

export default CreateandSellNft;
