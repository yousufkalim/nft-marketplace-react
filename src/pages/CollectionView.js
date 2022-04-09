import React from 'react';
import MainLayout from '../mainlayout/MainLayout';
import ViewCardList from './components/ViewCardList';
import ViewHead from './components/ViewHead';
import ViewList from './components/ViewlList';

const CollectionView = () => {
  return (
    <>

      <ViewHead />
      <ViewList />
      <ViewCardList />

    </>
  );
};

export default CollectionView;
