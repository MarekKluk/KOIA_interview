import { SubmitHandler, useFormContext } from 'react-hook-form';
import { FormValues } from '../types/FormValues';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StatisticsData } from '../types/StatisticsData';

export function useFilters () {
  const { handleSubmit, setValue } = useFormContext<FormValues>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGraphDataLoading, setIsGraphDataLoading] = useState<boolean>(false)
  const savedQuarters = localStorage.getItem('quarters') ;
  const savedHouseType = localStorage.getItem('house-type');

  useEffect(() => {
    if (savedQuarters && savedHouseType ) {
      setValue('quarters', JSON.parse(savedQuarters));
      setValue('houseType', savedHouseType);
    }
  }, [setValue, savedQuarters, savedHouseType]);

  const getQuarterString = (quarter: number) => {
    const year = Math.floor(quarter / 4) + 2009;
    const quarterNumber = (quarter % 4) + 1;
    return `${year}K${quarterNumber}`;
  }

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const startQuarter = getQuarterString(data.quarters[0]);
    const endQuarter = getQuarterString(data.quarters[1]);
    const statisticsStorage: StatisticsData[] = JSON.parse(localStorage.getItem('statistics') || 'null');
    const savedGraphData = statisticsStorage?.find(storageElement =>
      storageElement.startQuarter === startQuarter &&
      storageElement.endQuarter === endQuarter &&
      storageElement.houseType === data.houseType
    );
    if(savedGraphData) {
      statisticsStorage.splice(statisticsStorage.indexOf(savedGraphData), 1)
      localStorage.setItem('statistics', JSON.stringify(statisticsStorage));
    }
    const queryParams = new URLSearchParams({
      startQuarter,
      endQuarter,
      houseType: data.houseType,
    });

    setSearchParams(queryParams);
    setIsGraphDataLoading(true)
    localStorage.setItem('quarters', JSON.stringify(data.quarters));
    localStorage.setItem('house-type', data.houseType);
  };

  return {
    getQuarterString,
    onSubmit,
    handleSubmit,
    searchParams,
    isGraphDataLoading
  };
}
