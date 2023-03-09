export function getQuarterWithPairedSquarePerMeterPrice (squarePerMeterPrices: number[], quartersArray: string[]) {
  const getQuarterWithPairedSquarePerMeterPriceArray = []
  for (let i = 0; i < squarePerMeterPrices.length ; i++) {
    getQuarterWithPairedSquarePerMeterPriceArray.push({
      name: quartersArray[i],
      price: squarePerMeterPrices[i]
    });
  }
  return getQuarterWithPairedSquarePerMeterPriceArray;
}
