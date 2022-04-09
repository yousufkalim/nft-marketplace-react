import React from 'react';
import { Container } from 'react-bootstrap';

import Slider from 'react-slick';

import '../styles/sliderhit.scss';

const SliderHits = ({ children, title }) => {
  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className='SliderHit'>
      <Container>
        <h2>{title}</h2>
        <Slider {...setting}>{children}</Slider>
      </Container>
    </div>
  );
};

export default SliderHits;
