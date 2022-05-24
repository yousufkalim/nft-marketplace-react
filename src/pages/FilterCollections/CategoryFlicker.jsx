import React, { useRef } from "react";
import Flicking, { MoveEvent, WillChangeEvent } from "@egjs/react-flicking";
import FlickerCard from "../../components/presentational/FlickerCard/FlickerCard";
import LEFT_ARROW from "../../images/left_icon_gray.svg";
import RIGHT_ARROW from "../../images/right_icon_gray.svg";
import "@egjs/react-flicking/dist/flicking.css";
import './CategoryFlicker.scss'

const CategoryFlicker = () => {
  const flickinfRef = useRef();
  const arr=[1,2,3,4,5,6,7]

  const onClickLeft=()=>{
    flickinfRef.current.prev();
  }

  const onClickRight=()=>{
    flickinfRef.current.next();
  }

  return (
    <div className="CategoryFlickerWrapper">
        <div onClick={onClickLeft} className="arrow leftArrow"><img src={LEFT_ARROW} alt={'LEFT_ARROW'} /></div>
      <Flicking horizontal bound viewportTag={"div"} defaultIndex={0} align={'prev'} circular ref={flickinfRef} >

    {
        arr.map((item,index)=>{
            return(
                <div key={index}>
                <div className="selected">Category</div>
                </div>
            )
            })
    }

      </Flicking>
      <div onClick={onClickRight} className="arrow rightArrow"><img src={RIGHT_ARROW} alt={'RIGHT_ARROW'} /></div>


    </div>
  );
};

export default CategoryFlicker;
