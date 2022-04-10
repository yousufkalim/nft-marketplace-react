import React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import Home from './pages/Home';
import CollectionList from './pages/CollectionList';
import CollectionDetail from './pages/CollectionDetail';
import CollectionView from './pages/CollectionView';
import Login from './pages/Login';
import ForgetPass from './pages/ForgetPass';
import InfoPage from './pages/InfoPage';
import Signup from './pages/Singup';
import { ToastContainer } from 'react-toastify';
import Header from './pages/components/Header';
import { useDispatch, useSelector } from 'react-redux';
import Scroll from './hooks/Scroll';
import { getCatagory } from './redux/Actions';
import CreateNFT from './pages/components/CreateNft';



function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state?.authReducer)

  useEffect(() => {
    dispatch(getCatagory('Art'))
  }, [])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}

      />
      <Header />
      <Scroll>
        <Routes>
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.forgetpass} element={<ForgetPass />} />
          <Route path={routes.home} element={<Home />} />
          {user?.isLoginIn && <Route path={routes.info} element={<InfoPage />} />}
          <Route path={routes.collectionList} element={<CollectionList />} />
          <Route path={`${routes.collectionDetail}/:id`} element={<CollectionDetail />} />
          <Route path={`${routes.collectionView}/:id`} element={<CollectionView />} />
          <Route path={`${routes.createCollection}`} element={<CreateNFT />} />

          <Route path={'*'} element={<Navigate replace to="/" />} />
        </Routes>
      </Scroll>
    </>
  );
}

export default App;
