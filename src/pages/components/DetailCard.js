import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import BidCard from '../common/BidCard';

import style from '../styles/DetailCard.module.scss';
import CustomButton from '../common/Button';
import { useSelector } from 'react-redux';
const DetailCard = () => {
  const user = useSelector(state => state?.singleNFT)

  const {
    CreatedBy,

    DescriptionLong } = user
  return (
    <div className={style.DetailCard}>
      <Container>
        <Row className={'gy-5 align-items-start'}>
          <Col lg={4} md={12} xs={12}>
            <BidCard overlay={false} post={user} />
          </Col>
          <Col lg={7} md={12} xs={12}>
            <div className={style.DetailContent}>
              <h2>
                {CreatedBy}
              </h2>
              <p>
                {DescriptionLong}
              </p>
              <br />
              <p>Purchase artwork or start publishing now.</p>
              <div className={style.buttons}>
                <CustomButton text={'Buy'} customClass={style.explore} />
                <CustomButton text={'Bid'} customClass={style.createBtn} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailCard;
