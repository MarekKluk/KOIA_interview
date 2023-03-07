import './index.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import React, {useEffect, useState} from 'react';
import { GraphData } from '../types/GraphData';
import {Button, TextField} from "@mui/material";

interface Props {
  graphData: GraphData,

  searchParams: URLSearchParams
}
export function Graph ({ graphData, searchParams }: Props) {
  const [inputValue, setInputValue] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    const startQuarter = searchParams.get('startQuarter');
    const endQuarter = searchParams.get('endQuarter');
    const houseType = searchParams.get('houseType');

    // save comment to localStorage based on URL params
    const commentKey = `${startQuarter}-${endQuarter}-${houseType}`;
    const storedComment = localStorage.getItem(commentKey);
    if (storedComment) {
      setComment(storedComment);
    } else {
      setComment('');
    }
  }, [searchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleAddComment = () => {
    const startQuarter = searchParams.get('startQuarter');
    const endQuarter = searchParams.get('endQuarter');
    const houseType = searchParams.get('houseType');

    const commentKey = `${startQuarter}-${endQuarter}-${houseType}`;
    setComment(inputValue)
    localStorage.setItem(commentKey, inputValue);
  };

  return(
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
      </div>
      <p>{comment}</p>
    </div>
  )
}
