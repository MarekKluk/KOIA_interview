import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, NativeSelect, Slider, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { fetchGraphData } from "../API/fetchGraphData";

export function App() {
  const [quarters, setQuarters] = useState([0, 7]); // [0, 7] represents 2009K1 to 2010K4
  const [houseType, setHouseType] = useState('Boliger i alt');
  const [searchParams, setSearchParams] = useSearchParams();
  const [graphData, setGraphData] = useState({})
  const minSliderDistance = 1;
  const getQuarterString = (quarter: number) => {
    const year = Math.floor(quarter / 4) + 2009;
    const quarterNumber = (quarter % 4) + 1;
    return `${year}K${quarterNumber}`;
  }
  useEffect(() => {
    const startQuarter = searchParams.get("startQuarter") ?? ''
    const endQuarter = searchParams.get("endQuarter") ?? ''
    const houseType = searchParams.get("houseType") ?? ''

    const getGraphData = async () => {
      const quartersArray = getDesiredQuartersArray(startQuarter, endQuarter);
      const houseTypeApiValue = getHouseTypeApiValue(houseType);
      try {
        const graphDataResponse = await fetchGraphData(quartersArray, houseTypeApiValue)
        const graphRawData = await graphDataResponse.json()
        setGraphData({...graphData, graphRawData: graphRawData.value, quartersArray, houseType})
      } catch(error) {
        throw error
      }
    }
    if(startQuarter && endQuarter && houseType) {
      getGraphData();
    }
  },[searchParams])


  const getHouseTypeApiValue = (houseType: string): string | undefined => {
    switch (houseType) {
      case 'Boliger i alt':
        return '00';
      case 'Småhus':
        return '02';
      case 'Blokkleiligheter':
        return '03';
      default:
        return undefined;
    }
  }
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
      houseType
    });
    setSearchParams(queryParams)
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
