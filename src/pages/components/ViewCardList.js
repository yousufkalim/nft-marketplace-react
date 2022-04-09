import React, { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BidCard from '../common/BidCard';
import axios from '../../api/instance';
import '../styles/ViewCardList.scss';
import fish from '../../images/fish.png';
const ViewCardList = () => {
  const [value, setValue] = useState('');
  const [searchData, isData] = useState([]);
  const [loading, isLoading] = useState(false)
  const [search, setSearch] = useState(false)


  const submit = async (e) => {
    e.preventDefault();
    isLoading(true)
    if (value.toString().trim() === '') {
      setSearch(false)
      isLoading(false)
      return
    }
    const res = await axios.get('/nfts/search', { params: { query: value } })
    console.log(res)
    try {
      if (res.status === 200) {
        if (res.data.body.nfts.length > 0) {
          isData(res.data.body.nfts)
          isLoading(false)
          setSearch(true)
        } else {
          isLoading(false)
          setSearch(false)
        }

      } else {
        isData([])
        isLoading(false)
        setSearch(false)
      }

      isLoading(false)
    } catch (e) {
      return e
    }

  }

  return (
    <div className={'ViewCardList'}>
      <Container>
        <Row className='align-items-center gy-4 mb-4'>
          <Col lg={6}>
            <input
              type='text'
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder='Search'
            />
          </Col>
          <Col lg={3} xs={6}>
            <div className='buttonSearch' onClick={submit}>Single Items</div>
          </Col>
          <Col lg={3} xs={6}>
            <div className='buttonSearch'>Price: High to Low</div>
          </Col>
        </Row>
        <Row className='align-item-center gy-4 '>

          {loading ? <div style={{ color: "white", height: '50vh', margin: 'auto' }} className='d-flex align-items-center justify-content-center'> <Spinner animation="border" role="status" style={{ color: "white" }}>
          </Spinner>
          </div> :
            (
              search ? (

                searchData && searchData?.map((e, i) => (
                  <Col key={i} lg={3} md={6} xs={12}>
                    <BidCard styleClass={'cards'} image={fish} overlay={true} post={e} />
                  </Col>
                ))

              ) : (
                <>

                  <Col lg={3} md={6} xs={12}>
                    <BidCard styleClass={'cards'} image={fish} overlay={true} />
                  </Col>
                  <Col lg={3} md={6} xs={12}>
                    <BidCard styleClass={'cards'} image={fish} overlay={true} />
                  </Col>
                  <Col lg={3} md={6} xs={12}>
                    <BidCard styleClass={'cards'} image={fish} overlay={true} />
                  </Col>
                  <Col lg={3} md={6} xs={12}>
                    <BidCard styleClass={'cards'} image={fish} overlay={true} />
                  </Col>
                </>

              )

            )

          }
        </Row>


      </Container>
    </div>
  );
};

export default ViewCardList;
