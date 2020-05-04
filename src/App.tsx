import React, { useEffect, useState } from "react";
import {
    IGridElement,
    initialData,
    isFibonacciNumber,
    initialFibonaccies,
    rowColumnChanger,
    IFibonacciesQty,
    isThereSequence,
} from "./helpers";
import "./App.css";
import SingleGrid from "./SingleGrid";
import {start} from "repl";
function App() {
  useEffect(() => {
    // console.log(44, initialData);
  }, []);
  const [gridData, setGridData] = useState<IGridElement[][]>(initialData);
  const [fibonaccies, setFibonaccies] = useState<IFibonacciesQty>({
    rows: {},
    columns: {},
  });

  // const [gridState, dispatch]  useRe
  const onGridClick = (rowIndex: number, columnIndex: number ) => {
    let newFibbonacies = { ...fibonaccies };
    const newGridData = gridData.map(
      (gridRow: IGridElement[], elementsRowIndex: number, thisGridArray: IGridElement[][])  => {
        if (elementsRowIndex === rowIndex) {
          //the whole same row
          return gridRow.map(
            (gridElement: IGridElement, elementsColumnIndex: number) => {
              //the same row elements
              const newElementValue = gridElement.value + 1;
              if (
                isFibonacciNumber(newElementValue) &&
                !gridElement.isFibonacci
              ) {
                newFibbonacies = rowColumnChanger(
                  elementsColumnIndex,
                  rowIndex,
                  newFibbonacies,
                  true,
                  true
                );
              } else if (
                gridElement.isFibonacci &&
                !isFibonacciNumber(newElementValue)
              ) {
                newFibbonacies = rowColumnChanger(
                  elementsColumnIndex,
                  rowIndex,
                  newFibbonacies,
                  false,
                  true
                );
              }
              return {
                value: newElementValue,
                isFibonacci: isFibonacciNumber(newElementValue),
              };
            }
          );
        } else {
            const fibonacciObj: {exist: boolean, startIndex: number, endIndex: number} = {exist: false, startIndex: -1, endIndex: -1};
            const elementsRow: IGridElement[] = [];
            gridRow.forEach((gridElement: IGridElement, elementsColumnIndex: number) => {

                  if (elementsColumnIndex === columnIndex) {
                    //the same column elements except same row & same column
                    const newElementValue = gridElement.value + 1;

                    if (
                      isFibonacciNumber(newElementValue)
                    ) {
                        if(!gridElement.isFibonacci){
                            newFibbonacies = rowColumnChanger(
                                columnIndex,
                                elementsRowIndex,
                                newFibbonacies,
                                true,
                                false
                            );
                        }
                      const {fibStart, fibEnd} = isThereSequence(gridRow,columnIndex, elementsRowIndex,newElementValue);
                      if(fibStart !== -1){
                          console.log('fs', fibStart, fibEnd, elementsRowIndex);
                          fibonacciObj.exist = true;
                          fibonacciObj.startIndex = fibStart;
                          fibonacciObj.endIndex = fibEnd;
                      }
                    } else if (
                      gridElement.isFibonacci &&
                      !isFibonacciNumber(newElementValue)
                    ) {
                      newFibbonacies = rowColumnChanger(
                        columnIndex,
                        elementsRowIndex,
                        newFibbonacies,
                        false,
                        false
                      );
                    }

                     elementsRow.push({
                      value: newElementValue,
                      isFibonacci: isFibonacciNumber(newElementValue),
                    });
                  }else{
                      elementsRow.push(gridElement);
                  }
                });
            if(fibonacciObj.exist){
                const{startIndex, endIndex} = fibonacciObj;
                const newChunk : IGridElement[] = new Array(endIndex-startIndex+1).fill({value: 0, isFibonacci: false});
                fibonacciObj.exist = false;
                return [
                    ...elementsRow.slice(0,startIndex),
                    ...newChunk,
                    ...elementsRow.slice(endIndex+1, elementsRow.length)
                ]
            }else{
                return elementsRow
            }
        }
      }
    );
    // console.log("fbn", newFibbonacies);
    setGridData(newGridData);
    setFibonaccies(newFibbonacies);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="grid-wrapper">
          {gridData.map((gridRow: IGridElement[], rowIndex: number) => {
            return gridRow.map(({ value }: IGridElement, idx: number) => {
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
              return (
                <SingleGrid
                  count={value}
                  idx={idx}
                  rowIndex={rowIndex}
                  key={`${rowIndex}x${idx}`}
                  onGridClick={onGridClick}
                />
              );
            });
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
