import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router';
import MainLayout from '../mainlayout/MainLayout';
import DetailCard from './components/DetailCard';
import { getSingleNFT, removeNftpage } from '../redux/Actions'
import { Spinner } from 'react-bootstrap';

const CollectionList = () => {
  const data = useSelector(state => state?.singleNFT)
  const dispatch = useDispatch()
  const id = useParams().id


  useEffect(() => {
    dispatch(getSingleNFT(id))
    return () => {
      dispatch(removeNftpage())
    }
  }, [id])



  return (
    <>
      {!data ? <div className="spinnerClass">
        <Spinner animation="border" role="status" style={{ color: "white" }}>
        </Spinner>
      </div> :
        Object.keys(data)?.length === 0 ? <div className="spinnerClass text-white"> Page not found</div> :
          (<div>
            <DetailCard />
          </div>)

      }
    </>
  );
};

export default CollectionList;
