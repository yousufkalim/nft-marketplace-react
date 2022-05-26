import React, { useState } from "react";
import { Radio } from "antd";
import PAGE_HEADER from "../../images/PageHeader.png";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import {
  uploadAPI,
} from "../../services/createCollectionServices";
import { openNotification } from "../../components/Smart/Notification";
import Spin from "../../components/presentational/Spin";
import "./UploadNft.scss";
import ZipDropZone from "../../components/Smart/ZipDropdown/ZipDropZone";
import useWindowSize from "../../helpers/hooks";
import { uploadNft } from "../../services/createNftServices";
import { useHistory } from "react-router-dom";


const UploadNft = ({match}) => {
  const [nftFile, setNftFile] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const history=useHistory();
  const [browserWidth]=useWindowSize()

  const handleSubmit = async () => {
    if (nftFile?.length) {
      if (isAgree) {
        setIsLoading(true);
        try {
          const nftFileLocation = await uploadNft(nftFile[0],match.params.id);
          openNotification("Success", "Nft Uploaded created successfully");
          setIsLoading(false);
          history.push('/myCollections')
        } catch (error) {
          setIsLoading(false);
          openNotification("Oops", error?.response?.data?.message);
        }
      } else {
        openNotification("Oops", "Please agree to the terms and conditions");
      }
    } else {
      openNotification("Oops", "Please upload all the images");
    }
  };

  return (
    <div className="UploadNft">
      <div className="UploadNftHeader">
        <img src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER} alt={"PAGE_HEADER"} />
        <div className="UploadNftHeadingSection">
          <span className="UploadNftText">
            Become an NFT artist with NFTdepot
          </span>
          <span className="UploadNftHeading">Upload Zip</span>
        </div>
      </div>
      <div className="UploadNftUploadImageWrapper">
        <div className="dropZoneHeader">
          <div className="uploadForm">
            <div className="bannerImage">
              <ZipDropZone
                selectedImage={nftFile}
                setSelectedImage={setNftFile}
                imageType="zip"
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

export default UploadNft;
