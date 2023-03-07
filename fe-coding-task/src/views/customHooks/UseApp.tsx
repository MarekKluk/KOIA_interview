import React, {useEffect, useState} from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HouseType } from "../types/HouseType";

interface FormValues {
  houseType: string;
}

export function UseApp() {
  const [quarters, setQuarters] = useState<[number, number]>([0, 7]); // [0, 7] represents 2009K1 to 2010K4
  const [houseType, setHouseType] = useState<string>(HouseType.All);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGraphDataLoading, setIsGraphDataLoading] = useState<Boolean>(false)
  const minSliderDistance = 1;

  useEffect(() => {
    const savedQuarters = localStorage.getItem('quarters');
    const savedHouseType = localStorage.getItem('house-type');
    if (savedQuarters && savedHouseType ) {
      setQuarters(JSON.parse(savedQuarters));
      setHouseType(savedHouseType)
    }
  }, []);

  const getQuarterString = (quarter: number) => {
    const year = Math.floor(quarter / 4) + 2009;
    const quarterNumber = (quarter % 4) + 1;
    return `${year}K${quarterNumber}`;
  }

  const { register, handleSubmit } = useForm({
    defaultValues: { houseType },
  });

  const onSubmit = (data: FormValues) => {
    const startQuarter = getQuarterString(quarters[0]);
    const endQuarter = getQuarterString(quarters[1]);

    const queryParams = new URLSearchParams({
      startQuarter,
      endQuarter,
      houseType: data.houseType,
    });

    setSearchParams(queryParams);
    setIsGraphDataLoading(true)
    localStorage.setItem('quarters', JSON.stringify(quarters));
    localStorage.setItem('house-type', data.houseType);
  };

  const handleQuartersChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setQuarters([Math.min(newValue[0], quarters[1] - minSliderDistance), quarters[1]]);
    } else {
      setQuarters([quarters[0], Math.max(newValue[1], quarters[0] + minSliderDistance)]);
    }
  };

  return {
    getQuarterString,
    setQuarters,
    quarters,
    setHouseType,
    houseType,
    handleQuartersChange,
    onSubmit,
    register,
    handleSubmit,
    searchParams,
    isGraphDataLoading,
    setIsGraphDataLoading
  };
}
