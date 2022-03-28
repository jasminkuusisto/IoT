import Record from './Alarm_record'

const RecTable = () => {
    let response = await fetch('http://localhost:3001/records/');
    const records = await response.json();

    console.log(records);
    return ( 
        <table className="alarm-record-table">
        <thead>
          <tr>
            <th>Info</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec, i) => (
            <Record key={i} rec={rec}/>
          ))}
        </tbody>
      </table>
    );
    
    /*
    const records = [
        {
        "message": 'This is how alarms will be shown', 
        "time": '19:00'
        },
        {
        "message": 'Example alarm 1', 
        "time": '18:50'
        }
    ];
    */
}
 
export default RecTable;