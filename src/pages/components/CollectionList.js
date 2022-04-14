import React, { useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

import FishCard from '../common/FishCard';

import { getCatagoryTitle, removeNftpage } from '../../redux/Actions'
import { useDispatch, useSelector } from 'react-redux';


const CollectionList = ({ id }) => {
  const dispatch = useDispatch()
  const data = useSelector(state => state?.apii?.payload?.body?.collections)
  const [loading, isLoading] = React.useState(false)
  let title = ''

  // const user = useSelector(state => console.log(state))


  useEffect(() => {
    isLoading(true)
    switch (id) {
      case 0:
        title = 'Art'
        break;
      case 1:
        title = 'Anime'
        break;
      case 2:
        title = 'Comics'
        break;
      default:
        break;
    }
    dispatch(getCatagoryTitle(title))
    setTimeout(() => {
      isLoading(false)
    }, 900)


  }, [id])


  return (
    <div>
      <Container>
        <Row className='gy-5'>
          {loading && <div className="spinnerClass">
            <Spinner animation="border" role="status" style={{ color: "white" }}>
            </Spinner>
          </div>}

          {data?.length > 0 ? data.map((e, i) => (
            <Col lg={4} md={6} xs={12} key={i}>
              <FishCard content={e} i={i + 1} />
            </Col>)) : <div className="spinnerClass text-white">Data not found</div>
          }
        </Row>
      </Container>
    </div>
  );
};

export default CollectionList;
