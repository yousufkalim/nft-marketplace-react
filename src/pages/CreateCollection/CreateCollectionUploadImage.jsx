import React, { useState } from "react";
import { Input, Form, Button, Select, Switch, Upload, Radio } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import PAGE_HEADER from "../../images/PageHeader.png";
import DropZone from "../../components/Smart/DropZone/DropZone";
import {
  createCollectionAPI,
  uploadAPI,
} from "../../services/createCollectionServices";
import { useSelector } from "react-redux";
import { openNotification } from "../../components/Smart/Notification";
import "./CreateCollectionUploadImage.scss";
import Spin from "../../components/presentational/Spin";

const CreateCollectionUploadImage = () => {
  const [smallImage, setSmallImage] = useState("");
  const [largeImage, setLargeImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const formData = useSelector((state) => state?.collectionData?.data);

  const handleSubmit = async () => {
    if (smallImage?.length && largeImage?.length && bannerImage?.length) {
      if (isAgree) {
        setIsLoading(true);
        try {
          const smallImageLocation = await uploadAPI(smallImage[0]);
          const largeImageLocation = await uploadAPI(largeImage[0]);
          const bannerImageLocation = await uploadAPI(bannerImage[0]);

          const data = {
            ...formData,
            image_small_location: smallImageLocation?.body?.url,
            image_large_location: largeImageLocation?.body?.url,
            image_banner_location: bannerImageLocation?.body?.url,
          };
          const res = await createCollectionAPI(data);
          console.log("res", res);
          openNotification("Success", "Collection created successfully");
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          openNotification("Oops", "An Error occured");
        }
      } else {
        openNotification("Oops", "Please agree to the terms and conditions");
      }
    } else {
      openNotification("Oops", "Please upload all the images");
    }
  };

  return (
    <div className="CreateCollectionUploadImage">
      <div className="CreateCollectionHeader">
        <img src={PAGE_HEADER} alt={"PAGE_HEADER"} />
        <div className="CreateCollectionHeadingSection">
          <span className="CreateCollectionText">
            Become an NFT artist with NFTdepot
          </span>
          <span className="CreateCollectionHeading">Create a Collection</span>
        </div>
      </div>
      <div className="CreateCollectionUploadImageWrapper">
        <div className="dropZoneHeader">
          <div className="step2Header">
            <span className="step2">Step 2</span>
            <span className="desc">Upload Media</span>
            <span className="desc2">Accepted file formats: JPG, PNG, SVG</span>
          </div>
          <div className="uploadForm">
            <div className="collectionImages">
              <div className="smallImage">
                <DropZone
                  selectedImage={smallImage}
                  setSelectedImage={setSmallImage}
                  imageType="small"
                />
              </div>
              <div className="largeImage">
                <DropZone
                  selectedImage={largeImage}
                  setSelectedImage={setLargeImage}
                  imageType="large"
                />
              </div>
            </div>
            <div className="bannerImage">
              <DropZone
                selectedImage={bannerImage}
                setSelectedImage={setBannerImage}
                imageType="banner"
              />
            </div>
            <div className="agreeSection">
              <Radio
                checked={isAgree}
                onClick={() => setIsAgree((prev) => !prev)}
              />
              <div className="agree">
                I agree to the{" "}
                <span className="termConditions">Terms and Conditions</span> and{" "}
                <span className="termConditions">Privacy Policy</span>
              </div>
            </div>
            <div className="submitBtn" onClick={handleSubmit}>
              {loading ? <span><Spin /></span> : <span className="submit">Submit</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionUploadImage;
