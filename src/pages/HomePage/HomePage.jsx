import React from 'react'
import BG_IMGAGE from '../../images/HomePageHeader.svg';
import IMAGE_FOOTER from '../../images/imageFooter.svg';

import './HomePage.scss';

const HomePage = () => {
  return (
    <>
        <div className='subHeader'>
            <img src={BG_IMGAGE} alt={'BG_IMGAGE'} className='bgImage' />
            <img src={IMAGE_FOOTER} alt={'IMAGE_FOOTER'} className='footerImage' />
        </div>
    </>
  )
}

export default HomePage