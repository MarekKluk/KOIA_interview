import { useState } from 'react';
import { StatisticsData } from '../../types/StatisticsData';

export function useGraphStatistics() {
  const getStatisticsFromStorage = () => (JSON.parse(localStorage.getItem('statistics') || '[]'))

  const [savedStatistics, setSavedStatistics] = useState<StatisticsData[] | []>(
    getStatisticsFromStorage()
  )

  const refreshStatistics = () => {
    const statistics = getStatisticsFromStorage();
    setSavedStatistics(statistics);
  }

  return {
    savedStatistics,
    refreshStatistics
  }
}
