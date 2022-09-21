import { Button, Col, Row, Steps } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useWindowSize from "../../helpers/hooks";
import { collectionActions } from "../../services/collectionServices";
import CollectionNftCard from "../presentational/CollectionNftCard/CollectionNftCard";
import ProgressBar from "../presentational/Progress";
import "./Timeline.scss";

const { Step } = Steps;

const TimeLine = ({ status, data, collectionid }) => {
  const [browserWidth] = useWindowSize();
  const history = useHistory();

  const messages = {
    1: "We are generating samples.... You will receive an email shortly when they are ready for your review.",
    2: "Please verify the sample NFT’s are looking as expected.When you have validated them, click below to Approve.",
    3: "Please be patient as this process can take a while.We will notify you by email once the NFT’s have been fully generated",
  };

  const handleAction = async () => {
    try {
      const res = await collectionActions(collectionid, "Approve");
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleInvalid = async () => {
    try {
      const res = await collectionActions(collectionid, "invalid");
      console.log("res", res);

      history.push(`/createNft/${collectionid}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="main_page_width">
      <div className="timeLineWrapper">
        <Steps current={status - 1} responsive={true}>
          <Step
            title="Processing Zip"
          />
          <Step title="Waiting For Approval" />
          <Step
            title="Generating NFT"
          />
        </Steps>
      </div>
      <div className="messageWrapper">
        <div className="message">{messages[status]}</div>
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
      {status !== 2 && <ProgressBar percent={data?.body?.progress} />}
    </div>
  );
};

export default TimeLine;
