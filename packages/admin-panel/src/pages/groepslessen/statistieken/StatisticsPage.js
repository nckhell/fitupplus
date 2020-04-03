import React from 'react'
import { MonthlyTotalsChart } from './charts/MonthlyTotalsChart'
import { MonthlyTotalByLessonsChart } from './charts/MonthlyTotalByLessonsChart'

export const StatisticsPage = () => {
  return (
    <div>
      <MonthlyTotalsChart />
      <br />
      <MonthlyTotalByLessonsChart />
    </div>
  )
}
