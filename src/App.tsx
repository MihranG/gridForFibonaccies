import React, { useEffect, useState } from "react";
import {
  IGridElement,
  initialData,
  isFibonacciNumber,
  rowColumnChanger,
  IFibonacciesQty,
  isThereSequence, returnArrayWithResettedFibonaccies,
} from "./helpers";
import "./App.css";
import SingleGrid from "./SingleGrid";

function App() {
  const [gridData, setGridData] = useState<IGridElement[][]>(initialData);
  const [fibonaccies, setFibonaccies] = useState<IFibonacciesQty>({// this array is keeping track of rows and columns fibonacci numbers existence
    rows: {},
    columns: {},
  });
  const onGridClick = (rowIndex: number, columnIndex: number) => {
    let newFibbonacies = { ...fibonaccies };
    const newGridData = gridData.map(
      (
        gridRow: IGridElement[],
        elementsRowIndex: number,
      ) => {
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
          const fibonacciObj: {
            exist: boolean;
            startIndex: number;
            endIndex: number;
          } = { exist: false, startIndex: -1, endIndex: -1 };
          const elementsRow: IGridElement[] = [];
          gridRow.forEach(
            (gridElement: IGridElement, elementsColumnIndex: number) => {
              if (elementsColumnIndex === columnIndex) {
                //the same column elements except same row & same column
                const newElementValue = gridElement.value + 1;
                if (isFibonacciNumber(newElementValue)) {
                  if (!gridElement.isFibonacci) {
                    newFibbonacies = rowColumnChanger(
                      columnIndex,
                      elementsRowIndex,
                      newFibbonacies,
                      true,
                      false
                    );
                  }
                  if(fibonaccies.rows[elementsRowIndex]?.qty > 4){
                    const {fibStart, fibEnd} = isThereSequence(
                        gridRow,
                        columnIndex,
                        newElementValue
                    );
                    if (fibStart !== -1) {
                      fibonacciObj.exist = true;
                      fibonacciObj.startIndex = fibStart;
                      fibonacciObj.endIndex = fibEnd;
                    }
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
              } else {
                elementsRow.push(gridElement);
              }
            }
          );
          if (fibonacciObj.exist) {
            const { startIndex, endIndex } = fibonacciObj;
            fibonacciObj.exist = false;
            return returnArrayWithResettedFibonaccies(elementsRow , startIndex, endIndex);
          } else {
            return elementsRow;
          }
        }
      }
    );
    setGridData(newGridData);
    setFibonaccies(newFibbonacies);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="grid-wrapper">
          {gridData.map((gridRow: IGridElement[], rowIndex: number) => {
            return gridRow.map(({ value, isReset}: IGridElement, idx: number) => {
              return (
                <SingleGrid
                  count={value}
                  isReset={isReset}
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
