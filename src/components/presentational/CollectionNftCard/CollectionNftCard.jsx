import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import EYE_ICON from '../../../images/eye_icon.svg';
import ORANGE_FRAME from '../../../images/orange_frame.svg';
import LIKE_ICON from '../../../images/like_icon.svg';
import LIKED_ICON from '../../../images/liked_icon.svg';

import { Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import { openNotification } from '../../Smart/Notification';
import { truncate } from '../../../helpers/utils';
import { likeNfts, unLikeNfts } from '../../../services/collectionServices';
import './CollectionNftCard.scss';
import { useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CollectionNftCard = ({
  data,
  showLikeIcon,
  isCollectionDeployed,
  isUserCollection,
  setVisible,
  setSelectedNft,
  collectionDetails,
}) => {
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(data?.is_liked);
  const user = useSelector((state) => state.auth.user);
  const handleClick = () => {
    history.push(`/nftDetail/${data?.guid}`, { data: collectionDetails });
  };
  const likeNft = async (e) => {
    e.stopPropagation();
    try {
      const res = await likeNfts(data?.guid);
      setIsLiked(true);
      if (res?.body?.like == '1' || res?.body?.like == true) {
        openNotification('Nft liked successfully');
      }
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };
  const unLikeNft = async (e) => {
    e.stopPropagation();
    try {
      const res = await unLikeNfts(data?.guid);
      setIsLiked(false);
      openNotification('Nft unliked successfully');
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();

    if (user?.guid === data?.user_guid) {
      history.push(`/profile`);
    } else {
      history.push(`/creatorDetails/${data?.user_guid}`);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setVisible(true);
    setSelectedNft(data);
  };
  console.log('dataaaa', data);

  return (
    <div className='CollectionNftCard' onClick={handleClick}>
      <Card
        hoverable
        cover={
          <span className='ExploreCardWrapper'>
            <span className='ExploreCardImage'>
              <img alt='example' src={data?.nft_data?.image_location} />
            </span>
          </span>
        }
      >
        <Meta
          title={data?.store_name}
          description={
            <div className='nftDesc'>
              <span>{truncate(data?.description_short)}</span>
              {!isCollectionDeployed && isUserCollection && (
                <Tooltip title={'Edit Nft Details'} color={'#303549'}>
                  <span className='editIcon' onClick={(e) => handleEdit(e)}>
                    <EditOutlined style={{ color: '#f37342' }} />
                  </span>
                </Tooltip>
              )}
            </div>
          }
        />
        <div className='exploreCardFooter'>
          <span className='priceHeading'>
            Coin Type: <span className='priceHeading grayColor'>{data?.minting_coin}</span>
          </span>
          <span className='rightSection'>
            {showLikeIcon && (
              <span className='tagImage'>
                <Tooltip title={isLiked ? 'Unlike' : 'Like'} color={'#303549'}>
                  <span
                    className={data?.is_followed ? 'orangeFrame' : 'frame'}
                    onClick={isLiked ? (e) => unLikeNft(e) : (e) => likeNft(e)}
                  >
                    <img src={isLiked ? LIKED_ICON : LIKE_ICON} alt={'ORANGE_FRAME'} />
                  </span>
                </Tooltip>
                <span className='tagPrice'>{data?.likes}</span>
              </span>
            )}
          </span>
        </div>
        <div className='dflex'>
          <div className='idSection'># {data?.collection_id ?? data?.guid}</div>
          <span className='createdBy'>
            <span>Created By: </span>
            <span className='textStyle' onClick={(e) => handleProfileClick(e)}>
              {data?.user_name}
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default CollectionNftCard;
