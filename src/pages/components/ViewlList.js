import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import CustomButton from '../common/Button';

import style from '../styles/ViewList.module.scss';
import twitter from '../../images/twitter.svg';
import insta from '../../images/insta.svg';
import discord from '../../images/discord.svg';
import { useSelector } from 'react-redux';

const ViewList = () => {
  const data = useSelector(state => state.collection.collectionpage)

  return (
    <div className='mt-4' style={{ paddingBottom: '70px' }}>
      <Container>
        <div className={style.viewList}>
          <h2>{data?.StoreName}</h2>
          <h4>{data?.CreatedBy}</h4>
        </div>
        <Row className={'gy-3 align-items-center mt-4 justify-content-center'}>
          <Col lg={3}>
            <div className={style.twitter}>
              <a target="_blank" rel="noreferrer" href={`${data?.URLInstagram}`}>
                <img src={insta} alt='instagram' />
                <span>Instagram</span>
              </a>
            </div>
          </Col>
          <Col lg={3}>
            <div className={style.twitter}>
              <a target="_blank" rel="noreferrer" href={`${data?.URLDiscord}`} >
                <img src={discord} alt='discord' />
                <span>Discord</span>
              </a>
            </div>
          </Col>
          <Col lg={3}>
            <div className={style.twitter}>
              <a target="_blank" rel="noreferrer" href={`${data?.URLPersonal}`} >
                <img src={twitter} alt='twitter' />
                <span>Personal</span>
              </a>
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
          {data?.DescriptionLong}
        </p>
        {/* <div className={style.buttons}>
          <CustomButton text={'Items'} customClass={style.explore} />
          <CustomButton text={'Stats'} customClass={style.createBtn} disable />
        </div> */}
      </Container>
    </div>
  );
};

export default ViewList;
