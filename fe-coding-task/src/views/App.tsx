import React from 'react';
import './App.css';
import { Graph } from './Graph';
import { FiltersFormProvider } from './FiltersFormProvider';
import { Filters } from './Filters';
import { GraphsDataTable } from './GraphsDataTable';

export function App() {

  return (
    <FiltersFormProvider>
      <div className="app-container">
        <Filters />
        <Graph />
        <GraphsDataTable />
      </div>
    </FiltersFormProvider>
  );
}
