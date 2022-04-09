import React from 'react';

import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import style from '../styles/FishCard.module.scss';
import fish from '../../images/fish.png';
import box from '../../images/box.png';
import eye from '../../images/eye.png';
import heart from '../../images/heart.png';
import { routes } from '../../routes';

const FishCard = ({ navigation, content, i }) => {
  const { StoreName,
    MintingSupplyCount,
    DescriptionLong,
    CreatedBy,
    CategoryCode
  } = content;

  const navigate = useNavigate();
  const linkSite = () => {
    navigation ? navigate(navigation) : navigate(routes.collectionView);
  };

  return (
    <Card className={style.cardfish} onClick={linkSite}>
      <Card.Title className={style.cardTitle}>{StoreName}</Card.Title>
      <Card.Img src={fish} alt='title' />
      <Card.Body className={style.cardBody}>
        <img src={box} alt='box' width={60} height={60} />
        <div className={style.innerText}>
          <h5>{CreatedBy}</h5>
          <p>{DescriptionLong}...</p>
        </div>
      </Card.Body>
      <div className={style.footer}>
        <div className='text-end'>
          <span>123</span>
          <img src={eye} alt='eye' />
        </div>
        <div className='text-start'>
          <span>123</span>
          <img src={heart} alt='heart' />
        </div>
      </div>
    </Card>
  );
};

export default FishCard;
