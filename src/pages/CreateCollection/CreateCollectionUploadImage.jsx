import React, { useEffect, useState } from "react";
import { Radio, Select } from "antd";
import PAGE_HEADER from "../../images/PageHeader.png";
import HEADER_IMAGE_MOBILE from "../../images/header_image_mobile.png";
import DropZone from "../../components/Smart/DropZone/DropZone";
import {
  codesAPI,
  createCollectionAPI,
  uploadAPI,
} from "../../services/createCollectionServices";
import { useDispatch, useSelector } from "react-redux";
import { openNotification } from "../../components/Smart/Notification";
import "./CreateCollectionUploadImage.scss";
import Spin from "../../components/presentational/Spin";
import useWindowSize from "../../helpers/hooks";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { collectionDataSuccess } from "../../store/collectionForm/collectionActions";
import { Link } from "react-router-dom";

const CreateCollectionUploadImage = () => {
  const [smallImage, setSmallImage] = useState("");
  const [largeImage, setLargeImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [layoutCodes, setLayoutCodes] = useState([]);
  const [selectedCode, setSelectedCode] = useState(null);
  const [browserWidth] = useWindowSize();
  const history = useHistory();
  const dispatch = useDispatch();

  const formData = useSelector((state) => state?.collectionData?.data);

  useEffect(() => {
    const getCode = async () => {
      try {
        const response = await codesAPI("LayoutCodes");
        setLayoutCodes(response?.data);
      } catch (error) {
        console.log("error", error?.response?.data?.message);
      }
    };
    getCode();
  }, []);

  const handleChange = (value) => {
    setSelectedCode(value);
  };

  const handleSubmit = async () => {
    if (
      smallImage?.length &&
      largeImage?.length &&
      bannerImage?.length &&
      selectedCode
    ) {
      if (isAgree) {
        setIsLoading(true);
        try {
          const smallImageLocation = await uploadAPI(smallImage[0]);
          const largeImageLocation = await uploadAPI(largeImage[0]);
          const bannerImageLocation = await uploadAPI(bannerImage[0]);

          const data = {
            ...formData,
            layout_style_code: selectedCode,
            url_discord: "https://discord.com/" + formData?.url_discord,
            url_instagram:
              "https://www.instagram.com/" + formData?.url_instagram,
            url_medium: "https://medium.com/" + formData?.url_medium,
            url_personal:
              window.location.origin +
              "/collectionView/" +
              formData?.url_personal,
            url_telegram: "https://telegram.com/" + formData?.url_telegram,
            image_small_location: smallImageLocation?.body?.url,
            image_large_location: largeImageLocation?.body?.url,
            image_banner_location: bannerImageLocation?.body?.url,
          };
          const res = await createCollectionAPI(data);
          dispatch(collectionDataSuccess({}));
          openNotification(
            "Success",
            "Collection created successfully , Lets Add some NFTs to your collection"
          );
          history.push(`/createNft/${res?.body?.collection_id}`);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          openNotification("Oops", error?.response?.data?.message);
        }
      } else {
        openNotification("Oops", "Please agree to the terms and conditions");
      }
    } else {
      openNotification("Oops", "Please Fill in all Fields");
    }
  };

  useEffect(() => {
    if (!formData) {
      history.push("/createCollection");
    }
  }, []);

  return (
    <div className="CreateCollectionUploadImage">
      <div className="CreateCollectionHeader">
        <img
          src={browserWidth < 620 ? HEADER_IMAGE_MOBILE : PAGE_HEADER}
          alt={"PAGE_HEADER"}
        />
        <div className="CreateCollectionHeadingSection">
          <span className="CreateCollectionText">
            Become an NFT artist with NFTdepot
          </span>
          <span className="CreateCollectionHeading">Create a Collection</span>
        </div>
      </div>
      <div className="CreateCollectionUploadImageWrapper main_page_width">
        <div className="dropZoneHeader">
          <div className="step2Header">
            <span className="step2">Step 2</span>
            <span className="desc">Upload Media</span>
            <span className="desc2">
              Accepted file formats: JPG, JPEG,PNG,GIF
            </span>
          </div>
          <div>
            <Select
              placeholder="Select the style for the layout of your Small/Large images."
              onChange={handleChange}
            >
              {layoutCodes?.body?.map((item, index) => {
                return (
                  <Select.Option value={item?.code} key={item + index}>
                    {item?.description}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
          <div className="uploadForm">
            <div className="collectionImages">
              <div className="dflex">
                {" "}
                <div className="smallImage">
                  <label>Small Image</label>
                  <span>
                    Image will show on the collection as a icon. Recommended
                    size: 350 x 350{" "}
                  </span>
                  <DropZone
                    selectedImage={smallImage}
                    setSelectedImage={setSmallImage}
                    imageType="small"
                  />
                </div>
                <div className="largeImage">
                  <label>Large Image</label>
                  <span>
                    This is the larger image shown on all listings, categories
                    and featured pages. Recommended size: 600 x 400
                  </span>
                  <DropZone
                    selectedImage={largeImage}
                    setSelectedImage={setLargeImage}
                    imageType="large"
                  />
                </div>
              </div>

              <div className="bannerImage">
                <label>Banner Image</label>
                <span>
                  This image will display on the top of your
                  Storefront/Collection Page. Recommended dimension 1400 X 400.
                </span>
                <DropZone
                  selectedImage={bannerImage}
                  setSelectedImage={setBannerImage}
                  imageType="banner"
                />
              </div>
            </div>
            {/* <div className="bannerImage">
              <DropZone
                selectedImage={bannerImage}
                setSelectedImage={setBannerImage}
                imageType="banner"
              />
            </div> */}
            <div className="agreeSection">
              <Radio
                checked={isAgree}
                onClick={() => setIsAgree((prev) => !prev)}
              />
              <div className="agree">
                I agree to the{" "}
                <Link to="TermsAndCondition" target="_blank">
                  <span className="termConditions">Terms and Conditions</span>{" "}
                  and{" "}
                </Link>
                <span className="termConditions">Privacy Policy</span>
              </div>
            </div>
            <div className="submitBtn" onClick={handleSubmit}>
              {loading ? (
                <span>
                  <Spin />
                </span>
              ) : (
                <span className="submit">Submit</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionUploadImage;
