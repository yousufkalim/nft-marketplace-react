import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MainLayout from '../mainlayout/MainLayout';
import { getCollectionPage, removeNftpage } from '../redux/Actions';
import ViewCardList from './components/ViewCardList';
import ViewHead from './components/ViewHead';
import ViewList from './components/ViewlList';

const CollectionView = () => {
  const data = useSelector(state => state?.collection?.collectionpage)
  const dispatch = useDispatch()

  const id = useParams().id
  useEffect(() => {
    dispatch(getCollectionPage(id))
    return () => {
      dispatch(removeNftpage())
    }
  }, [id])


  return (
    <>
      {!data ? <><div className="spinnerClass">
        <Spinner animation="border" role="status" style={{ color: "white" }}>
        </Spinner>
      </div>
      </> :
        Object.keys(data)?.length === 0 ? <div className="spinnerClass text-white"> Page not found</div> :
          (
            <>
              <ViewHead id={id} />
              <ViewList />
              <ViewCardList id={id} />
            </>
          )}


    </>
  );
};

export default CollectionView;
