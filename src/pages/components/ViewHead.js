import React, { useEffect } from 'react';

import { Container } from 'react-bootstrap';

import style from '../styles/ViewHead.module.scss';

import logo from '../../images/logoG.svg';

const ViewHead = ({ id }) => {


  return (
    <div className={style.ViewHead} style={{ backgroundImage: `url('https://picsum.photos/1500/200?random=${id}')` }}>
      <Container>
        <div className={style.image}>
          <img src={logo} alt='logo' />
        </div>
      </Container>
    </div>
  );
};

export default ViewHead;
