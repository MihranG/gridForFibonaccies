import React, {useEffect, useState} from 'react';
import {IGridElement, initialData, isFibonacciNumber} from './helpers';
import './App.css';
import SingleGrid from "./SingleGrid";

function App() {
    useEffect(()=>{
        console.log(44, initialData)
    },[])
    const [gridData, setGridData] = useState<IGridElement[][]>(initialData);
    const [fibonaccies, setFibonaccies] = useState({columns:{},rows: {}});

    // const [gridState, dispatch]  useRe
    const onGridClick = (rowIndex: number, columnIndex: number)=>{

        const newGridData = gridData.map((gridRow:IGridElement[], gridRowIndex:number) => {
           if(gridRowIndex === rowIndex){
               return gridRow.map(gridElement=> {
                   const newElementValue = gridElement.value + 1;
                   return {
                       value: newElementValue,
                       isFibonacci: isFibonacciNumber(newElementValue)
                   }
               })
           }else{
               return gridRow.map((gridElement:IGridElement, gridElementIndex: number)=>{
                   if(gridElementIndex === columnIndex){
                       const newElementValue = gridElement.value + 1;
                       return {
                           value: newElementValue,
                           isFibonacci: isFibonacciNumber(newElementValue)
                       }
                   }
                   return gridElement
               })
           }
        });

        setGridData(newGridData)
    }
    return (
        <div className="App">
          <header className="App-header">

            <div className='grid-wrapper'>
            {gridData.map((gridRow: IGridElement[], rowIndex:number) => {
                return gridRow.map(({value}: IGridElement, idx: number)=>{
                    // if((idx + 1) % 50 === 0){
                    //     return (
                    //         <React.Fragment key={`${rowIndex}x${idx}`}>
                    //             <SingleGrid
                    //                 count={singleGridValue}
                    //                 idx={idx}
                    //                 rowIndex={rowIndex}
                    //                 onGridClick={onGridClick}
                    //             />
                    //             <br/>
                    //         </React.Fragment>)
                    // }
                    return <SingleGrid
                        count={value}
                        idx={idx}
                        rowIndex={rowIndex}
                        key={`${rowIndex}x${idx}`}
                        onGridClick={onGridClick}/>
                })
            })}
            </div>
          </header>

        </div>
    );
}

export default App;
