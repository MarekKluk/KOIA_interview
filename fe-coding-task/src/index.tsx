import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './views/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export function KoiaCodingTask () {
  return(
    <Router>
      <Routes>
        <Route path = '/' element = {<App />}> </Route>
      </Routes>
    </Router>
  )
}

root.render(<KoiaCodingTask />)
reportWebVitals();
