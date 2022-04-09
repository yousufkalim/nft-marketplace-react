import React from 'react';

import box from '../../images/box.png';
import style from '../styles/WeekCard.module.scss';



const WeekCard = ({ content, index }) => {
  const {

    StoreName,
    MintingSupplyCount,
    DescriptionShort,
    CreatedBy,
    CategoryCode } = content;
  return (
    <div className={style.WeekCard}>
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
