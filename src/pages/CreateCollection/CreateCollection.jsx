import React from "react";
import PAGE_HEADER from "../../images/Page_Header.svg";
import { Input, Form, Button, Col, Row } from "antd";
import Spin from "../../components/presentational/Spin";
import { Link } from "react-router-dom";

import "./CreateCollection.scss";
import CreateCollectionForm from "./CreateCollectionForm";

const CreateCollection = () => {
  return (
    <>
      <div className="CreateCollectionWrapper">
        <div className="CreateCollectionHeader">
          <img src={PAGE_HEADER} alt={"PAGE_HEADER"} />
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
