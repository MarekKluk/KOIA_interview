import './index.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { GraphData } from '../types/GraphData';
import { StatisticsData } from '../types/StatisticsData';

interface Props {
  graphData: GraphData | null

  refreshStatistics: () => void

}

export function Graph ({ graphData, refreshStatistics }: Props) {
  const [inputValue, setInputValue] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [searchParams, ] = useSearchParams();
  const startQuarter = searchParams.get('startQuarter');
  const endQuarter = searchParams.get('endQuarter');
  const houseType = searchParams.get('houseType');
  const commentKey = `${startQuarter}-${endQuarter}-${houseType}`;

  useEffect(() => {
    const storedComment = localStorage.getItem(commentKey);
    if (storedComment) {
      setComment(storedComment);
    } else {
      setComment('');
    }
  }, [searchParams, commentKey]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleAddComment = () => {
    setComment(inputValue)
    localStorage.setItem(commentKey, inputValue);
  };

  const handleSaveGraphData = () => {
    const statisticsStorage = JSON.parse(localStorage.getItem('statistics') || '[]');
    const savedGraphData = statisticsStorage?.find((storageElement: StatisticsData) =>
      storageElement.startQuarter === startQuarter &&
      storageElement.endQuarter === endQuarter &&
      storageElement.houseType === houseType
    );
    if(savedGraphData) {
      statisticsStorage.splice(statisticsStorage.indexOf(savedGraphData), 1)
    }
    const statisticsToSave = {
      startQuarter,
      endQuarter,
      chartPoints: graphData?.chartPoints,
      houseType: graphData?.houseType,
      comment
    }
    statisticsStorage.unshift(statisticsToSave)
    localStorage.setItem('statistics', JSON.stringify(statisticsStorage))
    refreshStatistics()
  }

  return  (
    graphData &&
    <div className="graph-container">
      <h2>Chart for {graphData.houseType} house type</h2>
      <LineChart width={900} height={300} data={graphData.chartPoints} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
      </LineChart>
      <div className="graph-comments">
        <TextField id="outlined-basic" variant="outlined" value={inputValue} onChange={handleInputChange} />
        <Button variant="outlined" onClick={handleAddComment}>Add Comment</Button>
				<Button variant="outlined" onClick={handleSaveGraphData}>Save Graph Data</Button>
      </div>
      <p>{comment}</p>
    </div>
  )
}
