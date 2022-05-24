import React from "react";
import PAGE_HEADER from "../../images/PageHeader.png";
import { Input, Form, Button, Col, Row } from "antd";
import Spin from "../../components/presentational/Spin";
import { Link } from "react-router-dom";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";

import "./CreateCollection.scss";
import CreateCollectionForm from "./CreateCollectionForm";
import useWindowSize from "../../helpers/hooks";

const CreateCollection = () => {
  const [browserWidth]=useWindowSize()
  return (
    <>
      <div className="CreateCollectionWrapper">
        <div className="CreateCollectionHeader">
          <img src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={"PAGE_HEADER"} />
          <div className="CreateCollectionHeadingSection">
            <span className="CreateCollectionText">
              Become an NFT artist with NFTdepot
            </span>
            <span className="CreateCollectionHeading">Create a Collection</span>
          </div>
        </div>
        <CreateCollectionForm/>
      </div>
    </>
  );
};

export default CreateCollection;
