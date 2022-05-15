import React from "react";
import PAGE_HEADER from "../../images/PageHeader.png";
import { Input, Form, Button, Col, Row } from "antd";
import Spin from "../../components/presentational/Spin";
import { Link } from "react-router-dom";

import "./CreateNft.scss";
import CreateNftForm from "./CreateNftForm";

const CreateNft = () => {

  return (
    <>
      <div className="CreateNftWrapper">
        <div className="CreateNftHeader">
          <img src={PAGE_HEADER} alt={"PAGE_HEADER"} />
          <div className="CreateNftHeadingSection">
            <span className="CreateNftText">
              Become an NFT artist with NFTdepot
            </span>
            <span className="CreateNftHeading">Create your NFT</span>
          </div>
        </div>

        <div>
          <CreateNftForm/>
        </div>
      </div>
    </>
  );
};

export default CreateNft;
