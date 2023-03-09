import React from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { HouseSelector } from './HouseSelector';
import { RangePicker } from './RangePicker';
import { useFilters } from './useFilters';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../types/FormValues';
import { GraphData } from '../types/GraphData';

interface Props {
  graphData: GraphData | null
}
export function Filters ({ graphData } : Props) {
  const {
    getQuarterString,
    onSubmit,
    handleSubmit,
    isGraphDataLoading
  } = useFilters()
  const { watch } = useFormContext<FormValues>()
  const quarterValues = watch('quarters')

  return (
    <>
      <h1>Norway Real-Estate Price per Square Meter Chart Generator</h1>
        <div className="inputs-container">
          <div className="slider-with-typography">
            <p>Select desired quarters range</p>
            <RangePicker
              getQuarterString={getQuarterString}
            />
            <Typography variant="body1">
              Selected range: {getQuarterString(quarterValues[0])} - {getQuarterString(quarterValues[1])}
            </Typography>
          </div>
          <div className="house-type-dropdown">
            <p>Select house type</p>
            <HouseSelector />
          </div>
        </div>
      <Button variant="outlined" sx={{marginTop: 5}} onClick={handleSubmit(onSubmit)}>Generate graph</Button>
      { isGraphDataLoading && !graphData && <CircularProgress /> }
    </>
  )
}
