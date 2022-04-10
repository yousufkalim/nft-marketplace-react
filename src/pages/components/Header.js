import React, { useState, useEffect } from 'react';

import { Container, Navbar, Nav, Dropdown, ListGroup } from 'react-bootstrap';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/instance'
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
  const user = useSelector(state => (state?.authReducer))
  const location = useLocation();

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [input, setInput] = useState('')
  const [show, setShow] = useState(false)
  const [data, isData] = useState([])
  const routeToLogin = () => {
    navigate(routes.login)

  }
  useEffect(() => {
    setInput('')
    if (user.isLoginIn) {
      dispatch(getInfo())
    }
  }, [user.isLoginIn, location])

  useEffect(() => {
    if (input === '') return
    async function search() {

      const res = await axios.get('/collections/search/', { params: { query: input } })
      try {
        if (res.status === 200) {

          isData(res.data.body)
        } else {
          isData([])
        }
      } catch (e) {
        if (res.status === 400) {

          return e
        }
      }

    }
    search()

  }, [input])

  const logout = () => {
    dispatch(Logout())
    localStorage.removeItem('userID')
    localStorage.removeItem('token')
    toast.dark("Succesfully Logout");
    navigate('/')
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
            className={`justify-content-end `}

          >
            <div className={style.menuSetting}>
              <div>
                <Nav className={` ${style.navmenu} activeNav `} >
                  <NavLink to={routes.home} >Home</NavLink>
                  {/* <NavLink to={routes.collectionList}>Features</NavLink>
                  <NavLink to={routes.collectionView}>Pricing</NavLink> */}
                  {user.isLoginIn ? <NavLink to={routes.info}>Profile</NavLink> : null}
                </Nav>
              </div>
              <div className={style.icons}>
                <div className='d-flex align-items-center position-relative'>
                  {show ? <><input placeholder='Search' style={{ position: show ? 'relative' : 'absolute', left: show ? '0px' : '105px' }} onChange={(e) => setInput(e.target.value)} value={input} />
                    {input.length > 0 ?
                      <ListGroup>
                        {data?.length > 0 ? data?.map((e, i) => <ListGroup.Item key={i} onClick={() => navigate(`${routes.collectionView}/${e.GUID}`)}>{e.StoreName}</ListGroup.Item>) : <ListGroup.Item>No Collections Found</ListGroup.Item>}
                      </ListGroup> : null

                    }
                  </> : null}

                  <FontAwesomeIcon icon={faSearch} onClick={() => setShow(!show)} />

                </div>
                <div className='d-flex align-items-center' style={{ gap: '10px', marginLeft: '24px' }}>


                  <Dropdown>
                    <Dropdown.Toggle >
                      <FontAwesomeIcon icon={faUser} className='me-1' />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {user.isLoginIn ? <Dropdown.Item href="#">{localStorage.getItem('userID')?.slice(0, 6)}</Dropdown.Item> : null}
                      {user.isLoginIn ? null : <Dropdown.Item onClick={routeToLogin}>Login</Dropdown.Item>}
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
