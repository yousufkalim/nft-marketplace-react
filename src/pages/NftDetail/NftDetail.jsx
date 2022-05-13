import React from "react";
import FeaturedCard from "../../components/presentational/FeaturedCard/FeaturedCard";
import PAGE_HEADER_IMG from "../../images/PageHeader.png";
import FILTER_IMG from "../../images/filter_icon.svg";
import RIGHT_ARROW from "../../images/right_arrow.svg";

import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import { Row, Col, AutoComplete, Input, Menu, Dropdown, Space } from "antd";
import { UserOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import "./NftDetail.scss";
import NftLeftSection from "./NftLeftSection";
import NftRightSection from "./NftRightSection";
import DetailSection from "./DetailSection";
// import DetailSection from "./DetailSection";

const NftDetails = () => {
  const renderTitle = (title) => (
    <span>
      {title}
      <a
        style={{
          float: "right",
        }}
        href="https://www.google.com/search?q=antd"
        target="_blank"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
  );

  const renderItem = (title, count) => ({
    value: title,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        <span>
          <UserOutlined /> {count}
        </span>
      </div>
    ),
  });

  const options = [
    {
      label: renderTitle("Libraries"),
      options: [
        renderItem("AntDesign", 10000),
        renderItem("AntDesign UI", 10600),
      ],
    },
    {
      label: renderTitle("Solutions"),
      options: [
        renderItem("AntDesign UI FAQ", 60100),
        renderItem("AntDesign FAQ", 30010),
      ],
    },
    {
      label: renderTitle("Articles"),
      options: [renderItem("AntDesign design language", 100000)],
    },
  ];

  const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: "0",
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "3rd menu item",
          key: "3",
        },
      ]}
    />
  );

  return (
    <div className="NftDetailPageWrapper">
      <div className="CollectionPageHeader">
        <img src={PAGE_HEADER_IMG} alt={"PAGE_HEADER_IMG"} />
      </div>
      <div className="selectedCollection">
        <div className="CollectionDetailsSubHeader">
          <NftLeftSection />
          <NftRightSection />
        </div>
      <DetailSection/>
      </div>
      <div className="resultCardsGrid"> 
        <div className="heading">
          <span className="seeMore">More from this collection</span>
          <span ><span className="view" >View all</span> <img src={RIGHT_ARROW} alt="RIGHT_ARROW" /> </span>
        </div>
        <div className="cardGrid">
          <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }} >
            <Col className="gutter-row" span={12}>
              <FeaturedCard />
            </Col>
            <Col className="gutter-row" span={12}>
              <FeaturedCard />
            </Col>
            <Col className="gutter-row" span={12}>
              <FeaturedCard />
            </Col>
            <Col className="gutter-row" span={12}>
              <FeaturedCard />
            </Col>
            <Col className="gutter-row" span={12}>
              <FeaturedCard />
            </Col>
            <Col className="gutter-row" span={12}>
              <FeaturedCard />
            </Col>
          </Row>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default NftDetails;
