import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CustomButton from '../common/Button';
import style from '../styles/Hero.module.scss';
import { useNavigate } from 'react-router-dom';
import CustomCard from '../common/Card';
import { routes } from '../../routes';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Hero = () => {
  const navigate = useNavigate();
  const user = useSelector(state => (state?.authReducer))
  const routeTo = (name) => {
    navigate(name);
  };

  const clickHandle = () => {
    if (user?.isLoginIn) {
      routeTo(routes.createCollection)
    } else {
      toast.dark('Login First')
      return
    }
  }
  return (
    <div className={style.hero}>
      <Container>
        <Row className='gy-5'>
          <Col xs={12} lg={7}>
            <div className={style.heroContent}>
              <p>
                Explore a collection of entertaining animations, comics and
                anime of talented artists from around the world.
              </p>
              <br />
              <p>Purchase artwork or start publishing now.</p>
              <div className={style.buttons}>
                <CustomButton
                  text={'Explore'}
                  customClass={style.explore}
                  onClick={() => routeTo(routes.collectionList)}
                />
                <CustomButton
                  text={'Create'}
                  customClass={style.createBtn}
                  onClick={clickHandle}


                />
              </div>
            </div>
          </Col>
          <Col xs={12} lg={4}>
            <CustomCard navigation={routes.collectionDetail} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Hero;
