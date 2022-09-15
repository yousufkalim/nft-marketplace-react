import { Button, Steps } from "antd";
import React from "react";

const { Step } = Steps;

const TimeLine = ({ status }) => {
    console.log("status",status)
  return (
    <div>
      <Steps current={status} responsive={true}>
        <Step
          title="Processing Zip File"
          description="Your Zip file is currently Under Progress"
        />
        <Step
          title="Waiting For Approval"
          description={
            <>
              <Button>Approve</Button>
            </>
          }
        />
        <Step
          title="Minting"
          description={
            <>
              <Button>Mint</Button>
            </>
          }
        />
      </Steps>
    </div>
  );
};

export default TimeLine;
