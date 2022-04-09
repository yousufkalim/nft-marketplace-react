import React from 'react';

import style from '../styles/Button.module.scss';

const CustomButton = ({ onClick, text, customClass, disable, children }) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={`${style.customButton} ${customClass ? customClass : null}`}
      disabled={disable ? true : false}
    >
      {text}
      {children}
    </button>
  );
};

export default CustomButton;
