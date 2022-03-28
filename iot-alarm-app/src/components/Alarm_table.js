import { useState, useEffect } from 'react'
import Record from './Alarm_record'

const RecTable = () => {
  const [records, setRecords] = useState([])

  useEffect (() => {
    fetch('http://localhost:3001/records/', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => res.json())
      .then(data => setRecords(data))
  }, []);

  return (
    <table className="alarm-record-table">
      <thead>
        <tr>
          <th>Record Info</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {records.map((rec, i) => (
          <Record key={i} rec={rec}/>
        ))}
      </tbody>
    </table>
  );
}
 
export default RecTable;