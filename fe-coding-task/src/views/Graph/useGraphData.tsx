import { useEffect, useState } from 'react';
import { fetchGraphData } from '../../API/fetchGraphData';
import { HouseType } from '../types/HouseType';
import { GraphData } from '../types/GraphData';
import { StatisticsData } from '../types/StatisticsData';
import { useSearchParams } from 'react-router-dom';

export function useGraphData () {
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [searchParams,] = useSearchParams()

  useEffect(() => {
    const startQuarter = searchParams.get('startQuarter') ?? ''
    const endQuarter = searchParams.get('endQuarter') ?? ''
    const houseType = searchParams.get('houseType') ?? ''
    const statisticsStorage: StatisticsData[] = JSON.parse(localStorage.getItem('statistics') || 'null');
    const savedGraphData = statisticsStorage?.find(storageElement =>
      storageElement.startQuarter === startQuarter &&
      storageElement.endQuarter === endQuarter &&
      storageElement.houseType === houseType
    );
    if(savedGraphData) {
      setGraphData({ chartPoints: savedGraphData.chartPoints, houseType: savedGraphData.houseType })
      return;
    }
    const getGraphData = async () => {
      const quartersArray = getDesiredQuartersArray(startQuarter, endQuarter);
      const houseTypeApiValue = getHouseTypeApiValue(houseType);
      try {
        const graphRawData = await fetchGraphData(quartersArray, houseTypeApiValue)
        const quarterWithPairedSquarePerMeterPrice = getQuarterWithPairedSquarePerMeterPrice(graphRawData.value, quartersArray)
        setGraphData({ chartPoints: quarterWithPairedSquarePerMeterPrice, houseType })
      } catch (error) {
        console.log(error)
      }
    }
    if (startQuarter && endQuarter && houseType) {
      getGraphData();
    }
  }, [searchParams])
  const getDesiredQuartersArray = (startQuarter: string, endQuarter: string) => {
    const quarters: string[] = [];
    const startYear = parseInt(startQuarter.slice(0, 4));
    const endYear = parseInt(endQuarter.slice(0, 4));
    const startQuarterNumber = parseInt(startQuarter.slice(5));
    const endQuarterNumber = parseInt(endQuarter.slice(5));

    for (let year = startYear; year <= endYear; year++) {
      const start = year === startYear ? startQuarterNumber : 1;
      const end = year === endYear ? endQuarterNumber : 4;
      for (let quarter = start; quarter <= end; quarter++) {
        quarters.push(`${year}K${quarter}`);
      }
    }
    return quarters;
  }
  const getHouseTypeApiValue = (houseType: string): string | undefined => {
    switch (houseType) {
      case HouseType.All:
        return '00';
      case HouseType.SmallHouses:
        return '02';
      case HouseType.ApartmentBlocks:
        return '03';
      default:
        return undefined;
    }
  }
  const getQuarterWithPairedSquarePerMeterPrice = (squarePerMeterPrices: number[], quartersArray: string[]) => {
    const getQuarterWithPairedSquarePerMeterPriceArray = []
    for (let i = 0; i < squarePerMeterPrices.length ; i++) {
      getQuarterWithPairedSquarePerMeterPriceArray.push({
        name: quartersArray[i],
        price: squarePerMeterPrices[i]
      });
    }
    return getQuarterWithPairedSquarePerMeterPriceArray;
  }

  return {
    graphData
  }
}