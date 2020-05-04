
export interface IGridElement {
  value: number;
  isFibonacci: boolean;
  isReset?: boolean
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
  certainRow
    ? (certainRow.qty = (certainRow.qty || 0) + 1 + addableCorection)
    : (rows[rowIndex] = { qty: 1 });
  certainColumn
    ? (certainColumn.qty = (certainColumn.qty || 0) + 1 + addableCorection)
    : (columns[columnIndex] = { qty: 1 });

  return { rows, columns };
};

export const isSquare = (num: number): boolean =>
  num > 0 && Math.sqrt(num) % 1 === 0;

export const isFibonacciNumber = (num: number): boolean =>
  isSquare(5 * Math.pow(num, 2) + 4) || isSquare(5 * Math.pow(num, 2) - 4);

export const isThereSequence = (
  gridRowArray: IGridElement[],
  elementsIndex: number,
  newElementValue: number
): { fibStart: number; fibEnd: number } => {
  let qty: number = 0;
  let startIndex: number = -1;
  let endIndex: number = -1;
  const startingIndex: number = -Math.min(4, elementsIndex);
  const endingIndex: number = Math.min(4, 49 - elementsIndex);
  const changedGridRowArray = [
    ...gridRowArray.slice(0, elementsIndex),
    { value: newElementValue, isFibonacci: true },
    ...gridRowArray.slice(elementsIndex + 1, gridRowArray.length),
  ];
  for (let i = startingIndex; i <= endingIndex - 2; i++) {
    const certainIndex = elementsIndex + i;
    const currentElement: IGridElement = changedGridRowArray[certainIndex];
    const nextElement: IGridElement = changedGridRowArray[certainIndex + 1];
    const nextOfNextElement: IGridElement =
      changedGridRowArray[certainIndex + 2];
    const areAllElementsFibonacci =
      nextElement.isFibonacci && nextOfNextElement.isFibonacci;
    const isThereFibonacciCondition =
      nextOfNextElement.value === nextElement.value + currentElement.value;

    if (
      i < endingIndex - 3 &&
      areAllElementsFibonacci &&
      isThereFibonacciCondition
    ) {
      if (startIndex === -1) {
        startIndex = certainIndex;
      }
      qty++;
      endIndex = certainIndex + 2;
    } else if (qty < 3 && qty) {
      qty = 0;
      startIndex = -1;
      endIndex = -1;
    } else if (qty) {
      return { fibStart: startIndex, fibEnd: endIndex };
    }
  }
  return { fibStart: -1, fibEnd: -1 };
};

export const returnArrayWithResettedFibonaccies =
    (elementsArray: IGridElement[], startIndex: number, endIndex:number): IGridElement[]=>{
      const newChunk: IGridElement[] = new Array(
          endIndex - startIndex + 1
      ).fill({ value: 0, isFibonacci: false, isReset: true });
      return [
        ...elementsArray.slice(0, startIndex),
        ...newChunk,
        ...elementsArray.slice(endIndex + 1, elementsArray.length),
      ];
    }
