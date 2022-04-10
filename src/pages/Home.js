import React from 'react';
import MainLayout from '../mainlayout/MainLayout';
import Hero from './components/Hero';
import HitWeek from './components/HitWeek';
import TopHits from './components/TopHits';
import TopCollection from './components/topCollection';
import { ToastContainer, } from 'react-toastify';

const Home = () => {
  return (
    <>
      <Hero />
      <TopHits />
      <HitWeek />
      <TopCollection />

    </>
  );
};

export default Home;
