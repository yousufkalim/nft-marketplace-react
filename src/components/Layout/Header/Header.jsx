import React, { useState, useEffect } from "react";
import HEADER_LOGO from "../../../images/headerLogo.svg";
import BELL_ICON from "../../../images/bell_icon.svg";
import PROFILE_ICON from "../../../images/profile_icon.svg";
import SEARCH_ICON from "../../../images/search_icon.svg";
import TOGGLE_ICON from "../../../images/toggle_icon.png";

import { Link } from "react-router-dom";
import { AutoComplete, Drawer, Tooltip, Dropdown, Menu, Button } from "antd";
import { searchApi } from "../../../services/searchServices";
import useWindowSize from "../../../helpers/hooks";
import "./Header.scss";
import { useDispatch } from "react-redux";
import { Logout } from "../../../store/auth/authActions";
import { useHistory } from "react-router-dom";
import { Web3Connector } from "../../Smart/Web3/Web3Wrapper";

const { Option } = AutoComplete;

const AppHeader = () => {
  const [collections, setCollections] = useState([]);
  const [browserWidth] = useWindowSize();
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const isLoggedIn = localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleSearch = async (value) => {
    if (value) {
      let collections = await searchApi(value);
      setCollections(collections?.data?.body);
    }
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const onClose = () => {
    setVisible(false);
  };

  const menu = isLoggedIn ? (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to={"/profile"}>My Profile</Link>,
        },
        {
          key: "2",
          label: <Link to={"/settings"}>Settings</Link>,
        },
        {
          key: "3",
          label: <span onClick={() => dispatch(Logout())}>Logout</span>,
        },
      ]}
    />
  ) : (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to={"/auth/login"}>Login</Link>,
        },
      ]}
    />
  );

  const handleClick = (id) => {
    history.push(`/collectionView/${id}`);
  };

  return (
    <div className="editpf header main_page_width">
      <div className="logo">
        <Link to="/">
          <img src={HEADER_LOGO} alt={"HEADER_LOGO"} />
        </Link>
      </div>
      <div className="tabs">
        <div className="centerTabs">
          <a href="/explore" target={"_self"}>
            <h3>Explore</h3>
          </a>
          {/* <h3>Stats</h3> */}
          {/* <h3>Resource</h3> */}
          <Link to={"/createCollection"}>
            <h3>Create</h3>
          </Link>
        </div>
        <div className="icons">
          <div className="connectButton">
            <Web3Connector />
          </div>

          {browserWidth < 620 && (
            <span
              className="toggleIcon"
              onClick={() => setVisible((prev) => !prev)}
            >
              <img src={TOGGLE_ICON} alt={"PROFILE_ICON"} />
            </span>
          )}
          <Tooltip
            placement={"bottomLeft"}
            color={"transparent"}
            trigger={"click"}
            title={
              <AutoComplete
                style={{
                  width: 200,
                }}
                onSelect={(e) => onSelect(e)}
                onSearch={handleSearch}
                placeholder="Search here"
              >
                {collections?.length ? (
                  collections?.map((location) => (
                    <Option key={location.guid} value={location.store_name}>
                      <div onClick={() => handleClick(location?.guid)}>
                        {location.store_name}
                      </div>
                    </Option>
                  ))
                ) : (
                  <Option key={1} value={"No Collections Found"}>
                    No Collections Found
                  </Option>
                )}
              </AutoComplete>
            }
          >
            {isLoggedIn && (
              <span className="headerIcons">
                <img src={SEARCH_ICON} alt={"SEARCH_ICON"} />
              </span>
            )}
          </Tooltip>
          <span className="headerIcons">
            <img src={BELL_ICON} alt={"BELL_ICON"} />
          </span>
          <Dropdown overlay={menu} placement="bottomLeft" arrow>
            <span className="headerIcons">
              <img src={PROFILE_ICON} alt={"PROFILE_ICON"} />
            </span>
          </Dropdown>
        </div>
      </div>
      <Drawer
        title={
          <div onClick={onClose}>
            <Link to="/">
              <img src={HEADER_LOGO} alt={"HEADER_LOGO"} />
            </Link>
          </div>
        }
        placement={"right"}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={"right"}
      >
        <div className="mobileConnectButton">
          <Web3Connector/>
        </div>
        <Link to={"/explore"}>
          <h2 onClick={onClose}>Explore</h2>
        </Link>
        <Link to={"/createNft"}>
          <h2 onClick={onClose}>Create</h2>
        </Link>
      </Drawer>
    </div>
  );
};

export default AppHeader;
