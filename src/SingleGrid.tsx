import * as React from "react";
import "./SingleGrid.css";
import { useEffect, useState } from "react";

interface ISingleFrid {
  isReset?: boolean;
  count?: number;
  idx: number;
  rowIndex: number;
  onGridClick: (x: number, y: number) => void;
}

const SingleGrid: React.FC<ISingleFrid> = ({
  count,
  isReset,
  idx,
  rowIndex,
  onGridClick,
}) => {
  const [isColored, setIsColored] = useState('');
  useEffect(() => {
    if(count !== 0){
      setIsColored('yellow');
    }else if(isReset){
      setIsColored('green')
    }

    const timerId = setTimeout(() => {
      setIsColored('')
    }, 500);
    return ()=>{
      clearTimeout(timerId)
    }
  }, [ count, isReset]);
  const clickHandler = () => {
    onGridClick(rowIndex, idx);
  };
  return (
    <div
      className="single-grid"
      style={isColored ? { backgroundColor: isColored, color: 'black' } : {}}
      onClick={clickHandler}
    >
      {count}
    </div>
  );
};

export default SingleGrid;
