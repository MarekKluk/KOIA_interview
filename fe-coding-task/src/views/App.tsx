import React from 'react';
import './App.css';
import {Button, CircularProgress, Typography} from '@mui/material';
import { Graph } from './Graph';
import { UseApp } from './customHooks/UseApp';
import { RangePicker } from './RangePicker';
import { HouseSelector } from './HouseSelector';
import { UseGraphData } from './customHooks/UseGraphData';

export function App() {

  const {
    getQuarterString,
    quarters,
    handleQuartersChange,
    onSubmit,
    register,
    handleSubmit,
    houseType,
    searchParams,
    isGraphDataLoading
  } = UseApp();

  const {
    graphData
  } = UseGraphData()

  return (
    <div className="app-container">
      <h1>Norway Real-Estate Price per Square Meter Chart Generator</h1>
      <div className="inputs-container">
        <div className="slider-with-typography">
          <p>Select desired quarters range</p>
          <RangePicker
            handleQuartersChange={handleQuartersChange}
            quarters={quarters}
            getQuarterString={getQuarterString}
          />
          <Typography variant="body1">
            Selected range: {getQuarterString(quarters[0])} - {getQuarterString(quarters[1])}
          </Typography>
        </div>
        <div className="house-type-dropdown">
          <p>Select house type</p>
          <HouseSelector register={register} defaultValue={houseType} />
        </div>
      </div>
      <Button variant="outlined" sx={{marginTop: 5}} onClick={handleSubmit(onSubmit)}>Generate graph</Button>
      { isGraphDataLoading && !graphData && <CircularProgress /> }
      { graphData && <Graph graphData={graphData} searchParams={searchParams} /> }
    </div>
  );
}
