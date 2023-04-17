import "./index.css";
import { Chart } from "./Chart";
import { Filters } from "./Selectors";
import { SavedDataTable } from "./SavedDataTable";
import { useChartData } from "./Chart/useChartData";
import { ContentProvider } from "./ContentProvider";

import { useState } from "react";
import { ParametersData } from "./types/ParametersData";

const useChartParameters = () => {
  const getParametersFromStorage = () =>
    JSON.parse(localStorage.getItem("parameters") || "[]");

  const [savedParameters, setSavedParameters] = useState<ParametersData[] | []>(
    getParametersFromStorage()
  );

  const updateParameters = () => {
    const parameters = getParametersFromStorage();
    setSavedParameters(parameters);
  };

  return {
    savedParameters,
    updateParameters,
  };
};
