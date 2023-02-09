import React, { useEffect, useState } from 'react';
import PAGE_HEADER_IMG from '../../images/PageHeader.png';
import RIGHT_ARROW from '../../images/right_arrow.svg';
import HEADER_IMAGE_MOBILE from '../../images/header_image_mobile.png';
import NewsLetter from '../../components/presentational/NewsLetter/NewsLetter';
import NftLeftSection from './NftLeftSection';
import NftRightSection from './NftRightSection';
import DetailSection from './DetailSection';
import { Link } from 'react-router-dom';
import useWindowSize from '../../helpers/hooks';
import './NftDetail.scss';
import { nftDetailsApi } from '../../services/nftServices';
import Spin from '../../components/presentational/Spin';
import { openNotification } from '../../components/Smart/Notification';
import NftDetailSection from './NftDetailSection';

const NftDetails = ({ match }) => {
  const arr = [1, 2, 3, 4, 5, 6];
  const [browserWidth] = useWindowSize();
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getNftDetail = async () => {
      try {
        setLoading(true);
        const res = await nftDetailsApi(match?.params?.id);
        setNftData(res?.body);
        setLoading(false);
      } catch (error) {
        openNotification('Oops', error?.response?.data?.message);
        setLoading(false);
      }
    };
    getNftDetail();
  }, [match?.params?.id]);

  return (
    <>
      <div className='NftDetailPageWrapper'>
        <div className='CollectionPageHeader'>
          <img
            src={browserWidth < 821 ? HEADER_IMAGE_MOBILE : PAGE_HEADER_IMG}
            alt={'PAGE_HEADER_IMG'}
          />
        </div>
        <>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          ) : (
            <>
              <div className='selectedCollection main_page_width'>
                <div className='CollectionDetailsSubHeader'>
                  <NftLeftSection nftData={nftData} />
                  <NftRightSection nftData={nftData} />
                </div>
                <DetailSection nftData={nftData} />
              </div>
              <div className='resultCardsGrid'>
                <div className='heading main_page_width'>
                  <span className='seeMore'>More from this collection</span>
                  <span>
                    <Link to={`/collectionView/${nftData.store_front_guid}`}>
                      <span className='view'>View all</span>{' '}
                      <img src={RIGHT_ARROW} alt='RIGHT_ARROW' />
                    </Link>
                  </span>
                </div>

                <NftDetailSection
                  collectionid={nftData?.store_front_guid}
                  currentNftId={nftData?.guid}
                  setCount={setCount}
                  sliceItem={true}
                />
              </div>
            </>
          )}
        </>
        <NewsLetter />
      </div>
    </>
  );
};

export default NftDetails;
