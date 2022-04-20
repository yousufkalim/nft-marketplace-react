import React from 'react'
import HEADER_LOGO from '../../../images/headerLogo.svg';
import BELL_ICON from '../../../images/bell_icon.svg';
import PROFILE_ICON from '../../../images/profile_icon.svg';
import SEARCH_ICON from '../../../images/search_icon.svg';




import './Header.scss';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <div className='logo'>
            <Link to='/'>
            <img  src={HEADER_LOGO} alt={'HEADER_LOGO'} />
            </Link>
        </div>
        <div className='tabs'>
        <div className='centerTabs'>
            <h3>Explore</h3>
            <h3>Stats</h3>
            <h3>Resource</h3>
            <h3>Create</h3>


        </div>
        <div className='icons'>
            <span className='headerIcons'>
                <img src={SEARCH_ICON} alt={'SEARCH_ICON'} />
            </span>
            <span className='headerIcons'>
                <img src={BELL_ICON} alt={'BELL_ICON'} />
            </span>
            <span className='headerIcons'>
                <img src={PROFILE_ICON} alt={'PROFILE_ICON'} />
            </span>

        </div>
        </div>
    </div>
  )
}

export default Header