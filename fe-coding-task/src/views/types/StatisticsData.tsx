export interface StatisticsData {
  startQuarter: string,
  endQuarter: string,
  chartPoints: {
    name: string,
    price: number
  }[],
  houseType: string,
  comment: string
}
