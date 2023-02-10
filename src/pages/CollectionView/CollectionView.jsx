import React, { useEffect, useState } from 'react';
import PAGE_HEADER_IMG from '../../images/PageHeader.png';
import BANNER_IMG from '../../images/banner_img.svg';
import FILTER_IMG from '../../images/filter_icon.svg';
import TOOGLE_IMG from '../../images/toogle_icon.svg';

import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import FlickerComp from './Flicker';
import { Button, Input, Select, Spin, Tooltip } from 'antd';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';
import CollectionNftView from './CollectionNftView';
import NewsLetter from '../../components/presentational/NewsLetter/NewsLetter';
import { useSelector } from 'react-redux';
import useWindowSize from '../../helpers/hooks';
import {
  collectionDetailsApi,
  collectionView,
  getCollectionTraitsFilter,
} from '../../services/collectionServices';
import { openNotification } from '../../components/Smart/Notification';
import BreadCrumb from '../../components/Smart/Breadcrumb';
import FB from '../../images/facebook.svg';
import INSTAGRAM from '../../images/instagram.svg';
import LINKEDIN from '../../images/linkedin.svg';
import YOUTUBE from '../../images/youtube.svg';
import DISCORD from '../../images/discord_icon.svg';
import MEDIUM from '../../images/M_icon.svg';
import TWITTER from '../../images/twitter_icon.svg';
import './CollectionView.scss';
import { codesAPI } from '../../services/createCollectionServices';
import { deployNFT } from '../../services/web3Services';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import REPORT_ICON from '../../images/report_icon.svg';
import LINK_ICON from '../../images/link_white_icon.svg';
import { confirm } from '../../components/Smart/Modal';
import ReportCollectionModal from '../../components/Smart/ReportCollectionModal';
import FiltersSection from './FiltersSection';

const CollectionView = ({ match }) => {
  const [collectionDetails, setCollectionDetails] = useState([]);
  console.log('collectionDetails', collectionDetails);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [searchParam, setSearchParam] = useState('');
  const [filterCodes, setFilterCodes] = useState([]);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const userData = useSelector((state) => state?.auth?.user);
  const [stickyOffset, setStickyOffset] = useState(0);
  const [showSearchBarAndRarirtyTable, setShowSearchBarAndRarirtyTable] = useState(false);
  const [showFiltersBar, setShowFiltersBar] = useState(true);
  const isSticky = () => {
    var header = document.getElementById('searchHeader');
    var sticky = header?.offsetTop;
    if (sticky !== 0) {
      setStickyOffset(sticky);
    }
    if (window.pageYOffset > sticky && window.pageYOffset > stickyOffset) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };
  window.onscroll = function () {
    isSticky();
  };
  const history = useHistory();
  useEffect(() => {
    const getCollectionDetails = async () => {
      try {
        setLoading(true);
        const res = await collectionDetailsApi(match.params.id);
        setCollectionDetails(res?.body);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        openNotification('Oops', error?.response?.data?.message);
      }
    };
    getCollectionDetails();
  }, [match.params.id]);

  useEffect(() => {
    const getCode = async () => {
      try {
        const res = await codesAPI('SortTypeCodes');
        setFilterCodes(res?.data?.body);
      } catch (error) {
        console.log('error', error?.response?.data?.message);
      }
    };
    getCode();
  }, []);

  const handleChange = (value) => {
    setSelectedFilter(value);
  };

  const handleDeployNFT = async () => {
    try {
      let name = collectionDetails?.store_name;
      let symbol = collectionDetails?.store_name
        ?.toUpperCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      let localGuid = collectionDetails?.guid;
      // debugger;
      const tx = await deployNFT(name, symbol, localGuid);
      if (tx) {
        openNotification('Success', 'Transaction submitted successfully, waiting for completion');
      }
      // alert("Transaction submitted, please wait for confirmation, tx hash: " + tx?.hash);
    } catch (error) {
      console.log('error', error);
    }
  };

  const [browserWidth] = useWindowSize();

  const handleClick = () => {
    if (userData?.guid === collectionDetails?.user_details?.guid) {
      history.push(`/profile`);
    } else {
      history.push(`/creatorDetails/${collectionDetails?.user_details?.guid}`);
    }
  };

  const handleOk = () => {
    collectionDetails?.url_personal?.includes('https') &&
      window.open(collectionDetails?.url_personal);
  };

  const handleUrlPersonal = (e) => {
    e.stopPropagation();
    confirm(
      <>
        You are about ready to leave NFTDepot.Art and go to
        <p className='linkStyle'>{collectionDetails?.url_personal}</p>
      </>,
      'Are you sure you wish to do this? ',
      'YES',
      'NO',
      handleOk
    );
  };
  console.log('filterCodes', filterCodes);
  console.log('collectionDetails', collectionDetails);
  return (
    <>
      <ReportCollectionModal
        visible={isReportModalVisible}
        setVisible={setIsReportModalVisible}
        collectionId={collectionDetails?.guid}
      />
      {loading ? (
        <div className='antdSpinContainer'>
          <Spin />
        </div>
      ) : (
        <div className='CollectionViewPageWrapper'>
          <div className='CollectionViewPageHeader'>
            <img
              src={
                collectionDetails?.image_banner_location?.includes('https')
                  ? collectionDetails?.image_banner_location
                  : PAGE_HEADER_IMG
              }
              alt={'COLLECTION_BANNER_IMG'}
            />
            <div className='CollectionViewHeadingSection'>
              <span className='CollectionViewHeading'>{collectionDetails?.store_name}</span>
            </div>
          </div>
          {browserWidth < 821 ? (
            <div className='mobileBannerDetailsWrapper'>
              <div className='mobileBannerDetails'>
                <div className='banner'>
                  <div className='mainWrapper'>
                    <div className='imageWrapper'>
                      <img
                        src={
                          collectionDetails?.image_large_location?.includes('https')
                            ? collectionDetails?.image_large_location
                            : BANNER_IMG
                        }
                        alt={'BANNER_IMG'}
                      />
                    </div>
                    <div className='icons top'>
                      <Tooltip title={'Personal Link'} color={'#303549'} className='toltipStyle'>
                        <span onClick={(e) => handleUrlPersonal(e)}>
                          <img src={LINK_ICON} alt={'LINK_ICON'} />
                        </span>
                      </Tooltip>
                      <Tooltip title={'Report this Collection'} color={'#303549'}>
                        <span onClick={() => setIsReportModalVisible(true)}>
                          <img src={REPORT_ICON} alt={'REPORT_ICON'} />
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                </div>
                <div className='socialIconsSection'>
                  <span>Created By:</span>
                  <span className='value' onClick={handleClick}>
                    {collectionDetails?.user_details?.username}
                  </span>
                </div>
                <div className='values'>
                  <div className='mobileItemWrapper'>
                    <span>FloorPrice</span>
                    <span>$0.00</span>
                  </div>
                  <div className='mobileItemWrapper'>
                    <span>Volume Traded</span>
                    <span>$0.00</span>
                  </div>
                  <div className='mobileItemWrapper'>
                    <span>Items</span>
                    <span>$0.00</span>
                  </div>
                  <div className='mobileItemWrapper'>
                    <span>Owners</span>
                    <span>$0.00</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='bannerDetailsWrapper main_page_width'>
              <div className='bannerDetails'>
                <div className='itemWrapper'>
                  <span>FloorPrice</span>
                  <span>$0.00</span>
                </div>
                <div className='itemWrapper'>
                  <span>Volume Traded</span>
                  <span>$0.00</span>
                </div>
                <div className='mainWrapper'>
                  <div className='imageWrapper'>
                    <img
                      src={
                        collectionDetails?.image_large_location?.includes('https')
                          ? collectionDetails?.image_large_location
                          : BANNER_IMG
                      }
                      alt={'BANNER_IMG'}
                    />
                  </div>
                  <div className='icons'>
                    {collectionDetails?.url_personal && (
                      <Tooltip title={'Personal Link'} color={'#303549'}>
                        <span onClick={(e) => handleUrlPersonal(e)}>
                          <img src={LINK_ICON} alt={'LINK_ICON'} />
                        </span>
                      </Tooltip>
                    )}
                    <Tooltip title={'Report this Collection'} color={'#303549'}>
                      <span onClick={() => setIsReportModalVisible(true)}>
                        <img src={REPORT_ICON} alt={'REPORT_ICON'} />
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <div className='itemWrapper'>
                  <span>Items</span>
                  <span>$0.00</span>
                </div>
                <div className='itemWrapper'>
                  <span>Owners</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
          )}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '3%',
            }}
          >
            <div className='socialIconsSection display_none'>
              <span>Created By:</span>
              <span className='value' onClick={handleClick}>
                {collectionDetails?.user_details?.username}s
              </span>
            </div>
          </div>
          <div className='collectionDetailsWrapper main_page_width'>
            <div className='collectionDetails'>
              <div className='descriptionShort'>{collectionDetails?.description_short}</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: collectionDetails?.description_long?.startsWith('"')
                    ? JSON.parse(collectionDetails?.description_long)
                    : collectionDetails?.description_long,
                }}
              >
                {/* {collectionDetails?.description_long} */}
              </div>
            </div>
          </div>
          {showSearchBarAndRarirtyTable && <FlickerComp collectionId={match.params.id} />}
          {showSearchBarAndRarirtyTable && (
            <div className={`searchBar_wrapper_outer`} id='searchHeader'>
              <div className='searchBar main_page_width'>
                <div className='inputSection'>
                  <div className='toogle_icon' onClick={() => setShowFiltersBar((prev) => !prev)}>
                    <img src={TOOGLE_IMG} alt={'TOOGLE_IMG'} />
                  </div>
                  <div className='searchInput'>
                    <Input
                      suffix={<SearchOutlined />}
                      size='large'
                      placeholder='Search here'
                      value={searchParam}
                      onChange={(e) => setSearchParam(e.target.value)}
                    />
                  </div>
                  <div className='filterDropdown'>
                    <Select placeholder='Filter By' allowClear onChange={handleChange}>
                      {filterCodes?.map((item, index) => {
                        return (
                          <Select.Option value={item?.code} key={item + index}>
                            {item?.description}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </div>
                  <div className='filterImage'>
                    <img src={FILTER_IMG} alt={'FILTER_IMG'} />
                  </div>
                </div>
                <div className='reset'>
                  {!collectionDetails?.contract_address &&
                    userData?.guid === collectionDetails?.user_details?.guid && (
                      <Button type='primary' onClick={handleDeployNFT}>
                        Deploy
                      </Button>
                    )}
                  <span>Showing {count} results</span>
                </div>
              </div>
            </div>
          )}
          <div style={{ display: 'flex' }}>
            {browserWidth > 821 && count > 0 && showFiltersBar && (
              <div>
                <div className='filterBar'>
                  <FiltersSection collectionid={match?.params?.id} />
                </div>
              </div>
            )}
            <CollectionNftView
              collectionid={match?.params?.id}
              setCount={setCount}
              searchParam={searchParam}
              count={count}
              userId={collectionDetails?.user_details?.guid}
              setShowSearchBarAndRarirtyTable={setShowSearchBarAndRarirtyTable}
              isCollectionDeployed={collectionDetails?.contract_address ? true : false}
              selectedFilter={selectedFilter}
            />
          </div>
          <NewsLetter />
        </div>
      )}
    </>
  );
};

export default CollectionView;
