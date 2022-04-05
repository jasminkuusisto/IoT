import { useState, useEffect } from 'react'
import Record from './Alarm_record'

const RecTable = () => {
  const [records, setRecords] = useState([])

  useEffect (() => {
    (function fetchData() {
      fetch('http://localhost:3001/records/', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => res.json())
        .then(data => setRecords(data.reverse()))

      setTimeout(fetchData, 10000);
    })();

  }, []);

  let lastRecordToday = false;
  let hoursBetweenDates = 0;
  let minutesBetweenDates = 0;
  if (records.length > 0) {
    const lastRecordDt = new Date(Date.parse(records[0].date));
    const now = new Date();
    const minutesFromRecord = Math.floor(Math.abs(lastRecordDt.getTime() - now.getTime()) / (60 * 1000));
    hoursBetweenDates = Math.floor(minutesFromRecord / 60);
   
    if (hoursBetweenDates < 24) {
      lastRecordToday = true;
      minutesBetweenDates = minutesFromRecord - hoursBetweenDates*60;
    }
  }

  return (
    <div>
      {lastRecordToday ? (
        <p>The latest alarm was fired {hoursBetweenDates} hours and {minutesBetweenDates} minutes ago!</p>
      ) : ''}
      <table className="alarm-record-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => (
            <Record key={i} rec={rec}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
export default RecTable;