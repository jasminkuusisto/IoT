import { useState, useEffect } from 'react'
import Record from './Alarm_record'

const RecTable = () => {
  const [records, setRecords] = useState([])

  useEffect (() => {
    (function fetchData() {
      console.log('interval fired')
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
  if (records.length > 0) {
    const lastRecordDt = new Date(Date.parse(records[0].date));
    const now = new Date();
    const msBetweenDates = Math.abs(lastRecordDt.getTime() - now.getTime());
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    if (hoursBetweenDates < 24) {
      lastRecordToday = true;
    }
  }

  return (
    <div>
      {lastRecordToday ? <p>An alarm was fired within 24 hours!</p> : ''}
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