import React from 'react';

import { Container } from 'react-bootstrap';

import style from '../styles/ViewHead.module.scss';

import logo from '../../images/logoG.svg';

const ViewHead = () => {
  return (
    <div className={style.ViewHead}>
      <Container>
        <div className={style.image}>
          <img src={logo} alt='logo' />
        </div>
      </Container>
    </div>
  );
};

export default ViewHead;
