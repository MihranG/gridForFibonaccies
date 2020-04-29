import * as React from 'react';
import './SingleGrid.css';
import {useEffect, useState} from "react";


interface ISingleFrid {
    //color?: string,
    isFibonacci?: boolean
    count?: number,
    idx: number,
    rowIndex: number,
    onGridClick: (x: number, y: number)=>void
}

const SingleGrid : React.FC<ISingleFrid> = ({count,
                                                //color,
                                                idx,
                                                rowIndex,
                                                onGridClick,
                                            })=>{
    const[isYellow, setIsYellow] = useState(false);
    useEffect(()=>{
        setIsYellow(true);
        setTimeout(()=>setIsYellow(false),2000)
    },[count])
    const clickHandler = ()=>{
        console.log('clickHandler', rowIndex, idx);
        onGridClick(rowIndex, idx)
    }
    return(
        <div className='single-grid' style={isYellow ? {backgroundColor: 'yellow'}: {}} onClick={clickHandler}>
            {count}
        </div>
    )
}

export default SingleGrid
