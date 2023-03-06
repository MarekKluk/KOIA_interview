import React, { useState } from 'react';
import './App.css';
import { Button, NativeSelect, Slider, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

export function App() {
  const [quarters, setQuarters] = useState([0, 7]); // [0, 7] represents 2009K1 to 2010K4
  const [houseType, setHouseType] = useState('Boliger i alt');
  const [searchParams, setSearchParams] = useSearchParams();
  const minSliderDistance = 1;
  const getQuarterString = (quarter: number) => {
    const year = Math.floor(quarter / 4) + 2009;
    const quarterNumber = (quarter % 4) + 1;
    return `${year}K${quarterNumber}`;
  }

  const startQuarter = getQuarterString(quarters[0]);
  const endQuarter = getQuarterString(quarters[1]);

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
  const handleHouseTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHouseType(event.target.value);
  };

  const handleGenerateGraph = () => {
    const queryParams = new URLSearchParams({
      startQuarter,
      endQuarter,
      houseType: houseType.toString(),
    });
    setSearchParams(`/?${queryParams}`)
  };

  return (
    <div className="app-container">
      <h1>Norway Real Estate Price Square per meter graphs generator</h1>
      <div className="inputs-container">
        <div className="slider-with-typography">
          <p>Select desired quarters range</p>
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
          <Typography variant="body1">
            Selected range: {startQuarter} - {endQuarter}
          </Typography>
        </div>
        <div className="house-type-dropdown">
          <p>Select desired house type</p>
          <NativeSelect
            defaultValue={'Boliger i alt'}
            onChange={handleHouseTypeChange}
          >
            <option value={'Boliger i alt'}>Boliger i alt</option>
            <option value={'Småhus'}>Småhus</option>
            <option value={'Blokkleiligheter'}>Blokkleiligheter</option>
          </NativeSelect>
        </div>
      </div>
      <Button variant="outlined" sx={{marginTop: 5}} onClick={handleGenerateGraph}>Generate graph</Button>
    </div>
  );
}
