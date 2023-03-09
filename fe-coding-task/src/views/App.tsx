import React from 'react';
import './App.css';
import { Graph } from './Graph';
import { FiltersFormProvider } from './FiltersFormProvider';
import { Filters } from './Filters';
import { GraphsDataTable } from './GraphsDataTable';
import { useGraphStatistics } from './utils/shared/useGraphStatistics';
import { useGraphData } from './Graph/useGraphData/useGraphData';

export function App() {
  const { savedStatistics, refreshStatistics } = useGraphStatistics();
  const { graphData } = useGraphData()

  return (
    <FiltersFormProvider>
      <div className="app-container">
        <Filters graphData={graphData} />
        <Graph refreshStatistics={refreshStatistics} graphData={graphData} />
        <GraphsDataTable savedStatistics={savedStatistics} />
      </div>
    </FiltersFormProvider>
  );
}
