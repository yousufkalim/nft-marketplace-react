import React, { useRef } from "react";
import Flicking from "@egjs/react-flicking";
import FlickerCard from "../../components/presentational/FlickerCard/FlickerCard";
import LEFT_ARROW from "../../images/left_sign_arrow.svg";
import RIGHT_ARROW from "../../images/right_sign_arrow.svg";

import "@egjs/react-flicking/dist/flicking.css";
import './Flicker.scss'

const FlickerComp = () => {
  const flickinfRef = useRef();
  const arr=[1,2,3,4,5,6,7]

  const onClickLeft=()=>{
    flickinfRef.current.prev();
  }

  const onClickRight=()=>{
    flickinfRef.current.next();
  }

  return (
    <div className="flickerWrapper">
        <div onClick={onClickLeft} className="arrow leftArrow"><img src={LEFT_ARROW} alt={'LEFT_ARROW'} /></div>
      <Flicking horizontal bound viewportTag={"div"} defaultIndex={0} align={'prev'} circular ref={flickinfRef} >

    {
        arr.map((item,index)=>{
            return(
                <div key={index}>
                <FlickerCard/>
                </div>
            )
            })
    }

      </Flicking>
      <div onClick={onClickRight} className="arrow rightArrow"><img src={RIGHT_ARROW} alt={'RIGHT_ARROW'} /></div>


    </div>
  );
};

export default FlickerComp;
