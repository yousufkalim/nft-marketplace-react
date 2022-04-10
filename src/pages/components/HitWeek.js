import React, { useEffect, useState } from 'react';
import style from '../styles/HitWeek.module.scss';
import { Container, Row, Col } from 'react-bootstrap';
import WeekCard from '../common/WeekCard';
import { getCatagory } from '../../redux/Actions'
import { useDispatch, useSelector } from 'react-redux';


const HitWeek = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state?.api?.payload?.body?.collections)
  // const user = useSelector(state => console.log(state))
  useEffect(() => {

  }, [])


  // const login = () => {
  //   dispatch(Login({ user: 'talha' }))
  // }

  return (
    <div className={style.HitWeek}>
      <Container>
        <h2 >Top 12 Hits This Week</h2>
        <Row className={'gy-5'}>
          {data && data.map((ele, index) => (
            <Col key={index} lg={4} md={6} xs={12}>
              <WeekCard content={ele} index={index + 1} />
            </Col>
          )


          )}

        </Row>
      </Container>
    </div>
  );
};

export default HitWeek;
