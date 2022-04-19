import { useState, useEffect } from 'react'
import Record from './Alarm_record'


const  RecTable = ({filterValues}) => {
  let [records, setRecords] = useState([])

  useEffect (() => {
    function fetchData () {
      fetch('http://localhost:3001/records/"' + filterValues.startDate + '"&"' + filterValues.endDate + '"', {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
        .then(res => res.json())
        .then(data => setRecords(data))

        // Update records table every 60 seconds
        const interval = setInterval(() => {
          fetchData();
        }, 60000);
        return () => clearInterval(interval);

    } fetchData() 
    }, [filterValues]);

  // Sort records so that the newest record is first
  records.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });

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
      <br></br>
      {lastRecordToday ? (
        <p>The latest alarm was fired {hoursBetweenDates} hours and {minutesBetweenDates} minutes ago!</p>
      ) : ''}
      <br></br>
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
