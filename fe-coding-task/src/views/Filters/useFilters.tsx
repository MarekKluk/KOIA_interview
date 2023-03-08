import { SubmitHandler, useFormContext } from 'react-hook-form';
import { FormValues } from '../types/FormValues';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function useFilters () {
  const { handleSubmit, setValue } = useFormContext<FormValues>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGraphDataLoading, setIsGraphDataLoading] = useState<boolean>(false)

  useEffect(() => {
    const savedQuarters = localStorage.getItem('quarters') ;
    const savedHouseType = localStorage.getItem('house-type');
    if (savedQuarters && savedHouseType ) {
      setValue('quarters', JSON.parse(savedQuarters));
      setValue('houseType', savedHouseType);
    }
  }, [setValue]);

  const getQuarterString = (quarter: number) => {
    const year = Math.floor(quarter / 4) + 2009;
    const quarterNumber = (quarter % 4) + 1;
    return `${year}K${quarterNumber}`;
  }

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const startQuarter = getQuarterString(data.quarters[0]);
    const endQuarter = getQuarterString(data.quarters[1]);
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
