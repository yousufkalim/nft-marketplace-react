import { Button, Col, Row, Steps, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useWindowSize from "../../helpers/hooks";
import { collectionActions } from "../../services/collectionServices";
import CollectionNftCard from "../presentational/CollectionNftCard/CollectionNftCard";
import ProgressBar from "../presentational/Progress";
import { openNotification } from "../Smart/Notification";
import "./Timeline.scss";

const { Step } = Steps;

const TimeLine = ({ status, data, collectionid }) => {
  console.log("status",status)
  console.log("data", data);
  const [browserWidth] = useWindowSize();
  const history = useHistory();
  const [visible, setVisible] = useState(status == -1);

  const messages = {
    1: "We are generating samples.... You will receive an email shortly when they are ready for your review.",
    2: "Please verify the sample NFT’s are looking as expected.When you have validated them, click below to Approve.",
    3: "Please be patient as this process can take a while.We will notify you by email once the NFT’s have been fully generated",
  };

  const handleAction = async () => {
    try {
      const res = await collectionActions(collectionid, "Approve");
      openNotification(
        "Approved",
        "Thanks for your approval. You will receive further updates here soon."
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInvalid = async () => {
    try {
      // const res = await collectionActions(collectionid, "Invalid");
      // console.log("res", res);

      history.push(`/createNft/${collectionid}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOk = () => {
    setVisible(false);
    history.goBack();
  };

  const handleZip = () => {
    history.push(`/createNft/${collectionid}`);
  };

  return (
    <div className="main_page_width">
      <div className="timeLineWrapper">
        <Steps current={status} responsive={true}>
          <Step title="Awaiting Processing" />
          <Step title="Processing Zip" />
          <Step title="Waiting For Approval" />
          <Step title="Awaiting Processing" />
          <Step title="Generating NFT" />
        </Steps>
      </div>
      <div className="messageWrapper">
        <div className="message">{data?.body?.comments}</div>
      </div>
      <div className="collectionNftViewCardGrid">
        <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
          {data?.body?.data?.map((item, index) => {
            return (
              <Col
                className="gutter-row"
                span={browserWidth < 620 ? 24 : 8}
                key={index}
              >
                <CollectionNftCard data={item} showLikeIcon={false} />
              </Col>
            );
          })}
        </Row>
      </div>
      {status == 2 && (
        <div className="actionBtnsWrapper">
          <div className="actionBtn">
            <span className="btn" onClick={handleAction}>
              Approve
            </span>
            <span className="btn" onClick={handleInvalid}>
              Upload New Zip File
            </span>
          </div>
        </div>
      )}
      {status !== 2 && (
        <ProgressBar
          percent={data?.body?.progress}
          classname={status == 0 ? "dimOpacity" : ""}
        />
      )}
      {status == -1 && (
        <Modal
          visible={visible}
          footer={
            <>
              <Button onClick={handleZip}>Upload Zip File</Button>
              <Button className="bgColor" onClick={handleOk}>
                Ok
              </Button>
            </>
          }
          closable={false}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          maskClosable={false}
        >
          <p>{data?.body?.comments}</p>
          <p>
            You can choose to upload a new valid Zip File or email
            <span className="email"> support@nftdepot.art</span>
            with the above error information.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default TimeLine;
