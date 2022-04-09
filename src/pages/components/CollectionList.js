import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import FishCard from '../common/FishCard';

import { getCatagory } from '../../redux/Actions'
import { useDispatch, useSelector } from 'react-redux';


const CollectionList = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state?.api?.payload?.body?.collections)
  // const user = useSelector(state => console.log(state))
  useEffect(() => {
    dispatch(getCatagory())
  }, [])
  return (
    <div>
      <Container>
        <Row className='gy-5'>
          {data && data.map((e, i) => (
            <Col lg={4} md={6} xs={12} key={i}>
              <FishCard content={e} i={i + 1} />
            </Col>))
          }
        </Row>
      </Container>
    </div>
  );
};

export default CollectionList;
