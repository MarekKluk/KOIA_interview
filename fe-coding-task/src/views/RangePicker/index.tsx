import {Slider} from '@mui/material';
import React from 'react';

type RangePickerProps = {
  quarters: number[]
  handleQuartersChange: (event: Event, newValue: number | number[], activeThumb: number) => void
  getQuarterString: (value: number) => string
}
export function RangePicker ({quarters, handleQuartersChange, getQuarterString }: RangePickerProps) {
  return (
    <Slider
      value={quarters}
      onChange={handleQuartersChange}
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
      valueLabelFormat={value => <div>{getQuarterString(value)}</div>}
      valueLabelDisplay="auto"
    />
  )
}
