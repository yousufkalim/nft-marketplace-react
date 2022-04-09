import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import CustomButton from '../common/Button';

import style from '../styles/ViewList.module.scss';
import twitter from '../../images/twitter.svg';

const ViewList = () => {
  return (
    <div className='mt-4' style={{ paddingBottom: '70px' }}>
      <Container>
        <div className={style.viewList}>
          <h2>GenOut Studios</h2>
          <h4>Created by UserName</h4>
        </div>
        <Row className={'gy-3 align-items-center mt-4 justify-content-center'}>
          <Col lg={3}>
            <div className={style.twitter}>
              <img src={twitter} alt='twitter' />
              <span>TwitterHandle</span>
            </div>
          </Col>
          <Col lg={3}>
            <div className={style.twitter}>
              <img src={twitter} alt='twitter' />
              <span>TwitterHandle</span>
            </div>
          </Col>
          <Col lg={3}>
            <div className={style.twitter}>
              <img src={twitter} alt='twitter' />
              <span>TwitterHandle</span>
            </div>
          </Col>
        </Row>
        <div className={style.counting}>
          <div className={style.box}>
            <h4>1024.3K</h4>
            <p>items</p>
          </div>
          <div className={style.box}>
            <h4>3.3K</h4>
            <p>owners</p>
          </div>
          <div className={style.box}>
            <h4>0.33</h4>
            <p>floor price</p>
          </div>
          <div className={style.box}>
            <h4>427</h4>
            <p>volume traded</p>
          </div>
        </div>
        <p className={style.detailText}>
          The GenOut Studios is a collection of 10,000 unique Animated NFTs—
          unique digital collectibles living on the Ethereum blockchain. Your
          GenOut Studios grants access to members-only benefits, the first of
          which is access to the treasure chest, a stockpile of goodies. Future
          areas and perks can be unlocked by the community through other
          rewards. Visit www.GenOutStudios.com for more details.
        </p>
        <div className={style.buttons}>
          <CustomButton text={'Items'} customClass={style.explore} />
          <CustomButton text={'Stats'} customClass={style.createBtn} disable />
        </div>
      </Container>
    </div>
  );
};

export default ViewList;
