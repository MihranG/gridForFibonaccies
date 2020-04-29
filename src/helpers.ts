export interface IGridElement {
    value: number
    isFibonacci: boolean
}

export const initialData : IGridElement[][] = new Array(50).fill(null).map((arrRow) => {
    return  new Array(50).fill({value: 0, isFibonacci:false})
})

export const initialFibonacciRows = new Array(50).fill(0).reduce((acc, el, index)=>{
    acc.rows[index] = {};
    acc.columns[index] = {};
    return acc
},{rows:{}, columns: {}})

export const isSquare = (num:number):boolean => num > 0 &&  Math.sqrt(num) % 1 === 0;

export const isFibonacciNumber = (num: number): boolean =>
    isSquare(5 * Math.pow(num,2) + 4) ||
    isSquare(5 * Math.pow(num,2) - 4)
