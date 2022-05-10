import React from "react";
import FeaturedCard from "../../components/presentational/FeaturedCard/FeaturedCard";
import PAGE_HEADER_IMG from "../../images/collection_detail_header.svg";
import FILTER_IMG from "../../images/filter_icon.svg";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import NewsLetter from "../../components/presentational/NewsLetter/NewsLetter";
import { Row, Col, AutoComplete, Input, Menu, Dropdown, Space } from "antd";
import { UserOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";

import "./CollectionDetails.scss";

const CollectionDetails = () => {
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
    <div className="CollectionPageWrapper">
      <div className="CollectionPageHeader">
        <img src={PAGE_HEADER_IMG} alt={"PAGE_HEADER_IMG"} />
      </div>
      <div className="selectedCollection">
        <div className="CollectionDetailsSubHeader">
          <LeftSection />
          <RightSection />
        </div>
      </div>
      <div className="searchBar">
        <div className="inputSection">
          <div className="searchInput">
            <AutoComplete
              dropdownClassName="certain-category-search-dropdown"
              dropdownMatchSelectWidth={500}
              style={{
                width: "100%",
              }}
              options={options}
            >
              <Input
                suffix={<SearchOutlined />}
                size="large"
                placeholder="input here"
              />
            </AutoComplete>
          </div>
          <div className="filterDropdown">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <span>
                  Click me
                  <DownOutlined />
                </span>
              </a>
            </Dropdown>
          </div>
          <div className="filterImage">
            <img src={FILTER_IMG} alt={"FILTER_IMG"} />
          </div>
        </div>
        <div className="reset">RESET FILTERS</div>
      </div>
      <div className="resultCardsGrid">
        <div className="heading">
          <span className="resultCount">Showing 54 results</span>
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
          </Row>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default CollectionDetails;
