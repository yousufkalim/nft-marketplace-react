import React, { useEffect } from 'react';

import SliderHits from '../common/SliderHits';
import FishCard from '../common/FishCard';

import { getCatagory } from '../../redux/Actions'
import { useDispatch, useSelector } from 'react-redux';

const TopCollection = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state?.api?.payload?.body?.collections)
  // const user = useSelector(state => console.log(state))
  useEffect(() => {
    dispatch(getCatagory())
  }, [])
  return (
    <>
      <SliderHits title='Top Collections'>
        {data && data.map((e, i) => (
          <div key={i}>
            <FishCard content={e} i={i + 1} />
          </div>
        ))}


      </SliderHits>
    </>
  );
};

export default TopCollection;
