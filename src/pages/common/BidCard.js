import React from 'react';

import { Card } from 'react-bootstrap';

import style from '../styles/BidCard.module.scss';
import ownImage from '../../images/nftimage.png';
import eye from '../../images/eye.png';
import heart from '../../images/heart.png';
import { useNavigate } from 'react-router';
import { routes } from '../../routes'

const BidCard = ({ overlay, styleClass, image, post }) => {

  const navigate = useNavigate();

  return (
    <>
      <Card className={`${style.cardfish} ${styleClass}`} onClick={() => navigate(`${routes.collectionDetail}/${post?.GUID}`)}>
        {overlay ? (
          <Card.Title className={style.cardTitle}>{post?.Category ? post?.Category : 'StoreName'}</Card.Title>
        ) : null}
        <div>
          <Card.Img src={post?.nft_data[0]?.ImageLocation} alt='title' />
        </div>
        <Card.Body className={style.cardBody}>
          <div className={style.innerText}>
            <h5>{post?.CreatedBy ? post?.CreatedBy : 'Username'}</h5>
            <p>{post?.DescriptionShort ? post?.DescriptionShort : 'Description'}</p>
          </div>
        </Card.Body>
        <div className={style.footer}>
          <div className='d-flex align-items-center justify-content-between'>
            <div>
              <p>Price $$ {post?.MintingCoin ? post?.MintingCoin : 'Eth'}</p>
            </div>
            <div>
              <span>{post?.Views}</span>
              <img src={eye} alt='eye' />
            </div>
          </div>
          <div className='d-flex align-items-center justify-content-between mt-2'>
            <div>
              <p>Auction Hours</p>
            </div>
            <div>
              <span>{post?.Likes}</span>
              <img src={heart} alt='heart' />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BidCard;
