import { Slider } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../types/FormValues';

type RangePickerProps = {
  getQuarterString: (value: number) => string
}
export function RangePicker ({ getQuarterString }: RangePickerProps) {
  const { setValue, watch } = useFormContext<FormValues>();
  const quarters = watch('quarters');
  const handleQuartersChange = (event: Event, newValue: number | number[]) =>  {
    setValue('quarters', newValue as number[] )
  };
  return (
    <Slider
      onChange={handleQuartersChange}
      value={quarters}
      min={0}
      max={55}
      step={1}
      marks={[
        { value: 0, label: '2009K1' },
        { value: 12, label: '2012K1' },
        { value: 27, label: '2015K4' },
        { value: 43, label: '2019K4' },
        { value: 55, label: '2022K4' },
      ]}
      disableSwap
      valueLabelFormat={(value) => <div>{getQuarterString(value)}</div>}
      valueLabelDisplay="auto"
    />
  );
}
