import React from 'react';

import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import style from '../styles/CustomCard.module.scss';
import ownImage from '../../images/nftimage.png';
import box from '../../images/box.png';

const CustomCard = ({ styleCard, image, navigation }) => {
  const naigate = useNavigate();
  const handleLink = () => {
    naigate(navigation);
  };
  return (
    <div>
      <Card
        className={`${style.customCard} ${styleCard ? styleCard : ''} `}
        onClick={navigation ? handleLink : null}
      >
        <Card.Img variant='top' src={image ? image : ownImage} />
        <Card.Body className={style.cardBody}>
          <div>
            <h4>Ghetto Blasters</h4>
            <h5>Phil Lee</h5>
          </div>
          <img src={box} alt='box' width={45} height={45} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomCard;
