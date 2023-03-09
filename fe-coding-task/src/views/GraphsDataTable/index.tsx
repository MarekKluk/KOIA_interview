import React from 'react';
import './index.css'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { StatisticsData } from '../types/StatisticsData';
import { useSearchParams } from 'react-router-dom';

interface Props {
  savedStatistics: StatisticsData[]
}
export function GraphsDataTable({ savedStatistics }: Props) {
  const [, setSearchParams] = useSearchParams();

  const handleDisplayGraph = (savedStatistics: StatisticsData) => {
    const startQuarter = savedStatistics.startQuarter;
    const endQuarter = savedStatistics.endQuarter;
    const queryParams = new URLSearchParams({
      startQuarter,
      endQuarter,
      houseType: savedStatistics.houseType,
    });
    setSearchParams(queryParams);
  }

  return (
    <div className='table-container'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Quarters</TableCell>
              <TableCell align='center'>House Type</TableCell>
              <TableCell align='center'>Comment</TableCell>
              <TableCell align='center'>Display data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedStatistics.map((row: StatisticsData, index: number) => (
              <TableRow key={index}>
                <TableCell align='center'>{row.startQuarter} - {row.endQuarter}</TableCell>
                <TableCell align='center'>{row.houseType}</TableCell>
                <TableCell align='center'>{row.comment}</TableCell>
                <TableCell align='center'>
                  <Button variant="contained" color="primary" onClick={() => handleDisplayGraph(row)}>
                    Display saved data
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
