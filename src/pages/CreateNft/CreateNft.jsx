import React, { useState } from 'react';
import DropZone from '../../components/Smart/DropZone/DropZone';
import PAGE_HEADER from '../../images/PageHeader.png';
import RightArrow from '../../images/rightIcon.svg';

import './CreateNft.scss';
import CreateNftForm from './CreateNftForm';

const CreateNft = () => {
  const [addImage, setAddImage] = useState('');

  return (
    <>
      <div className='CreateNftWrapper'>
        <div className='CreateNftHeader'>
          <img src={PAGE_HEADER} alt={'PAGE_HEADER'} />
          <div className='CreateNftHeadingSection'>
            <span className='CreateNftText'>Become an NFT artist with NFTdepot</span>
            <span className='CreateNftHeading'>Create your NFT</span>
          </div>
        </div>

        <div>
          {/* <CreateNftForm/> */}
          <div className='MintNftContainer'>
            <div className='MintNftMainDiv'>
              <form className='MintNftFormDiv'>
                <div className='MintNftLeftForm'>
                  <DropZone
                    selectedImage={addImage}
                    setSelectedImage={setAddImage}
                    imageType='large'
                  />
                </div>
                <div className='MintNftRightForm'>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Name
                    </label>
                    <input type='text' placeholder='Enter Name' />
                  </div>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Description
                    </label>
                    <input type='text' placeholder='Enter Description' />
                  </div>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Price
                    </label>
                    <input type='number' placeholder='Enter Price' />
                  </div>
                  <div className='MintNftButtonDiv'>
                    <div className='MintNftButton'>
                      Create
                      <img src={RightArrow} alt={'RightArrow'} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNft;
