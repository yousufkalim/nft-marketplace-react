import React, { useEffect, useRef, useState } from "react";
import Flicking from "@egjs/react-flicking";
import LEFT_ARROW from "../../images/left_icon_gray.svg";
import RIGHT_ARROW from "../../images/right_icon_gray.svg";
import "@egjs/react-flicking/dist/flicking.css";
import "./CategoryFlicker.scss";
import { codesAPI } from "../../services/createCollectionServices";
import { openNotification } from "../../components/Smart/Notification";

const CategoryFlicker = ({category,setCategory}) => {
  const flickinfRef = useRef();
  const [categories, setCategories] = useState([]);

  const onClickLeft = () => {
    flickinfRef.current.prev();
  };

  const onClickRight = () => {
    flickinfRef.current.next();
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await codesAPI("categoryCode");
        setCategories(res?.data?.body);
      } catch (error) {
        openNotification("Oops", error?.response?.data?.message);
      }
    };

    getCategories();
  }, []);

  return (
    <>
    <div className="CategoryFlickerWrapper">
      <div onClick={onClickLeft} className="arrow leftArrow">
        <img src={LEFT_ARROW} alt={"LEFT_ARROW"} />
      </div>
      <Flicking
        horizontal
        bound
        viewportTag={"div"}
        defaultIndex={0}
        align={"prev"}
        circular
        ref={flickinfRef}
      >
        {categories?.map((item, index) => {
          return (
            <div key={index} onClick={()=>setCategory(item?.code)} className="changeCursor" >
              <div className={item?.code==category ?  'active' : 'notActive'}>{item?.code}</div>
            </div>
          );
        })
      
        }
      </Flicking>
      <div onClick={onClickRight} className="arrow rightArrow">
        <img src={RIGHT_ARROW} alt={"RIGHT_ARROW"} />
      </div>
    </div>
    <div className="resetWrapper">
    <div className="resetFilters" onClick={()=>setCategory('')}>Reset Filters</div>
  </div>
  </>
  );
};

export default CategoryFlicker;
