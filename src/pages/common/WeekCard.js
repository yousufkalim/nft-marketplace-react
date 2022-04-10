import React from 'react';
import { useNavigate } from 'react-router-dom';

import box from '../../images/box.png';
import { routes } from '../../routes';
import style from '../styles/WeekCard.module.scss';



const WeekCard = ({ content, index }) => {
  const navigate = useNavigate();
  const {

    StoreName,
    MintingSupplyCount,
    DescriptionShort,
    CreatedBy,
    CategoryCode, GUID } = content;

  const routeToView = () => {
    navigate(`${routes.collectionView}/${GUID}`)
  }
  return (
    <div className={style.WeekCard} onClick={routeToView}>
      <h5>{index}</h5>
      <div className={style.cardBody}>
        <div className={style.namespace}>
          <h3>{StoreName}</h3>
          <div className={'d-flex align-center justify-content-between'}>
            <p>Avg: {MintingSupplyCount}</p>
            <p>Floor: {MintingSupplyCount}</p>
          </div>
        </div>
        <img src={box} alt={box} with={55} height={55} />
      </div>
    </div>
  );
};

export default WeekCard;
