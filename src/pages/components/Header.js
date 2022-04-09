import React, { useState, useEffect } from 'react';

import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import style from '../styles/header.module.scss';
import logo from '../../images/logonft.png';
import { routes } from '../../routes';
import { useSelector, useDispatch } from 'react-redux';
import { Logout, getInfo } from '../../redux/Actions';
import { toast } from 'react-toastify';




const Header = () => {
  const user = useSelector(state => (state.authReducer))

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [input, setInput] = useState('')
  const [show, setShow] = useState(false)
  const routeToLogin = () => {
    navigate(routes.login)

  }
  useEffect(() => {
    if (user.isLoginIn) {

      dispatch(getInfo())
    }
  }, [user.isLoginIn])
  const logout = () => {
    dispatch(Logout())
    localStorage.removeItem('userID')
    localStorage.removeItem('token')
    toast.dark("Succesfully Logout");
  }
  return (
    <div className={style.mainSection}>
      <Navbar variant='light' expand='lg'>
        <Container fluid className='position-relative'>
          <Link to={routes.home}>
            <Navbar.Brand className={style.brand}>
              <img src={logo} alt='logo-nft' />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse
            id='basic-navbar-nav'
            className='justify-content-end'
          >
            <div className={style.menuSetting}>
              <div>
                <Nav className={` ${style.navmenu} activeNav`}>
                  <NavLink to={routes.home}>Home</NavLink>
                  <NavLink to={routes.collectionList}>Features</NavLink>
                  <NavLink to={routes.collectionView}>Pricing</NavLink>
                  {user.isLoginIn ? <NavLink to={routes.info}>Profile</NavLink> : null}
                </Nav>
              </div>
              <div className={style.icons}>
                <div className='d-flex align-items-center position-relative'>
                  {show ? <input placeholder='Search' style={{ position: show ? 'relative' : 'absolute', left: show ? '0px' : '105px' }} onChange={(e) => setInput(e.target.value)} value={input} /> : null}

                  <FontAwesomeIcon icon={faSearch} onClick={() => setShow(!show)} />
                </div>
                <div className='d-flex align-items-center' style={{ gap: '10px', marginLeft: '24px' }}>


                  <Dropdown>
                    <Dropdown.Toggle >
                      <FontAwesomeIcon icon={faUser} className='me-1' />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {user.isLoginIn ? <Dropdown.Item href="#">{localStorage.getItem('userID')?.slice(0, 6)}</Dropdown.Item> : null}
                      <Dropdown.Item onClick={routeToLogin}>Login Page</Dropdown.Item>
                      {user.isLoginIn ? <Dropdown.Item onClick={logout}>Logout</Dropdown.Item> : null}

                    </Dropdown.Menu>
                  </Dropdown>



                </div>

              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
