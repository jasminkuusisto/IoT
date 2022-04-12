import Header from './components/Header';
import RecTable from './components/Alarm_table';
import FilterButtons from './components/Filter_buttons';

import { useState } from 'react'


function App() {
  // Declare the state object so that the date values from user input
  // can be shared from FilterButtons to RecTable
  const [filterValues, setFilterValues] = useState({
    startDate: "2000-01-01 00:00:00.000000",
    endDate: "2100-01-01 00:00:00.000000"
  });

  return (
    <div className="container">
      <Header />
      <FilterButtons filterValues={filterValues} setFilterValues={setFilterValues} />
      <RecTable filterValues={filterValues} />
    </div>
  );
}

export default App;
