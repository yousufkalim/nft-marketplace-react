import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import MainLayout from '../mainlayout/MainLayout';
import DetailCard from './components/DetailCard';
import { getSingleNFT, removeNftpage } from '../redux/Actions'

const CollectionList = () => {
  const dispatch = useDispatch()
  const id = useParams().id

  useEffect(() => {
    dispatch(getSingleNFT(id))
    return () => {
      dispatch(removeNftpage())
    }

  }, [id])


  return (
    <div>
      <DetailCard />
    </div>
  );
};

export default CollectionList;
