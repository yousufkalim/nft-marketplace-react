import React from 'react';
import SliderHits from '../common/SliderHits';
import CustomCard from '../common/Card';

const Hits = () => {
  return (
    <>
      <SliderHits title='Top Hits'>
        <div>
          <CustomCard />
        </div>
        <div>
          <CustomCard />
        </div>
        <div>
          <CustomCard />
        </div>
        <div>
          <CustomCard />
        </div>
      </SliderHits>
    </>
  );
};

export default Hits;
