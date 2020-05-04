import {start} from "repl";

export interface IGridElement {
  value: number;
  isFibonacci: boolean;
}

export interface IFibonacciesQty {
  rows: { [x: number]: { qty: number } };
  columns: { [x: number]: { qty: number } };
}

export const initialData: IGridElement[][] = new Array(50)
  .fill(null)
  .map((arrRow) => {
    return new Array(50).fill({ value: 0, isFibonacci: false });
  });

export const initialFibonaccies = (): IFibonacciesQty => {
  const indexedObj: { [x: number]: { qty: number } } = new Array(50)
    .fill(0)
    .reduce((acc, el, i) => {
      acc[i] = { qty: el };
      return acc;
    }, {});
  return {
    rows: indexedObj,
    columns: { ...indexedObj },
  };
};

export const rowColumnChanger = (
  columnIndex: number,
  rowIndex: number,
  obj: IFibonacciesQty,
  isAdd: boolean,
  isRow: boolean
): IFibonacciesQty => {
  const rows = { ...obj.rows };
  const columns = { ...obj.columns };
  const addableCorection = isAdd ? 0 : -2;
  const certainRow = rows[rowIndex];
  const certainColumn = columns[columnIndex];
  // console.log(
  //   "rowColumnChanger",
  //   columnIndex,
  //   rowIndex,
  //   obj,
  //   rows[rowIndex],
  //   columns[columnIndex]
  // );
  certainRow
    ? (certainRow.qty = (certainRow.qty || 0) + 1 + addableCorection)
    : (rows[rowIndex] = { qty: 1 });
  certainColumn
    ? (certainColumn.qty = (certainColumn.qty || 0) + 1 + addableCorection)
    : (columns[columnIndex] = { qty: 1 });
  // rows[rowIndex].qty = rows[rowIndex]
  //     ? rows[rowIndex].qty + 1 + addableCorection
  //     : 1
  // columns[columnIndex].qty = columns[columnIndex]
  //     ? columns[columnIndex].qty + 1 + addableCorection
  //     : 1

  return { rows, columns };
};

export const isSquare = (num: number): boolean =>
  num > 0 && Math.sqrt(num) % 1 === 0;

export const isFibonacciNumber = (num: number): boolean =>
  isSquare(5 * Math.pow(num, 2) + 4) || isSquare(5 * Math.pow(num, 2) - 4);


export const isThereSequence = (gridRowArray: IGridElement[], elementsIndex: number, row:number = 9, newElementValue: number):{fibStart:number, fibEnd:number}=>{
    let qty: number = 0;
    let startIndex: number = -1;
    let endIndex: number = -1;
    let j=0;
    const startingIndex:number= -Math.min(4, elementsIndex);
    const endingIndex:number = Math.min(4, 49 - elementsIndex);
    const changedGridRowArray = [
        ...gridRowArray.slice(0,elementsIndex),
        {value: newElementValue, isFibonacci: true},
        ...gridRowArray.slice(elementsIndex+1, gridRowArray.length)
        ]
    if(row===2){

    console.log('isThereSequence', startingIndex, endingIndex)
    }
    for(let i = startingIndex;
        i <= endingIndex - 2;
        i++
    ){
        j++;
            const certainIndex = elementsIndex + i;
            const currentElement: IGridElement = changedGridRowArray[certainIndex];
            const nextElement: IGridElement = changedGridRowArray[certainIndex+1];
            const nextOfNextElement: IGridElement = changedGridRowArray[certainIndex+2];
            const areAllElementsFibonacci =  nextElement.isFibonacci && nextOfNextElement.isFibonacci;
            const isThereFibonacciCondition = nextOfNextElement.value === nextElement.value + currentElement.value
            //
        if(row === 2){
            console.log('row === 2',
                i,
                areAllElementsFibonacci,
                isThereFibonacciCondition,
                currentElement.value,
                nextElement.value,
                nextOfNextElement.value,

                elementsIndex)
        }
            if(
                i < endingIndex - 3 &&
                areAllElementsFibonacci &&
                isThereFibonacciCondition
            ){
                if(startIndex === -1){
                    startIndex = certainIndex;
                }
                qty++;
                endIndex = certainIndex + 2;
            }else if( qty < 3 && qty){
                qty = 0;
                startIndex = -1;
                endIndex = -1;
            }else if(qty){
                console.log('qty')
                return {fibStart:startIndex, fibEnd:endIndex}
            }else{
                console.log('else');
            }
    }
    // console.log(j)
    return {fibStart:-1,fibEnd:-1}
}

// export const isThereFibonacciesInArray = (givenArray:IGridElement[]): number | null=>{
//    const fibObj = {};
//    let qty: number = 0;
//    let startIndex : null | number = null;
//    let isSequence : boolean = false;
//     console.log('isThereFibonacciesInArray');
//
//    givenArray.forEach((singleElement:IGridElement, index:number, thisArray: IGridElement[])=>{
//
//      if(index < thisArray.length - 2){
//        const nextElement : IGridElement= thisArray[index + 1];
//        const nextOfNextElement : IGridElement = thisArray[index + 2];
//        if(singleElement.isFibonacci &&
//            nextOfNextElement.isFibonacci &&
//            nextOfNextElement.isFibonacci &&
//            nextOfNextElement.value === nextElement.value + singleElement.value){
//          isSequence = true;
//          qty+= +singleElement.isFibonacci;
//          startIndex = index
//        }else if(qty < 5) {
//          qty = 0;
//          startIndex = null;
//        }else{
//
//        }
//      }
//    })
//   return startIndex
// }

//
// isThereFibonacciesInArray([
//     {value:4, isFibonacci: false},
//     {value:5, isFibonacci: true},
//     {value:2, isFibonacci: true},
//     {value:1, isFibonacci: true},
//     {value:8, isFibonacci: true},
//     {value:13, isFibonacci: true},
//     {value:21, isFibonacci: true},
//     {value:34, isFibonacci: true},
//     {value:55, isFibonacci: true},
//     {value:60, isFibonacci: false}]
//  )
