import Record from './Alarm_record'

const RecTable = () => {
    let records = {}
    fetch('http://localhost:3001/records/')
      .then(response => response.json())
      .then(data => records = data);

    // Get data from SQL database
    //const records = useState(data)[0];
    //const records = [
        //{
        //"message": 'This is how alarms will be shown', 
        //"time": '19:00'
        //},
        //{
        //"message": 'Example alarm 1', 
        //"time": '18:50'
        //}
    //];

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
}
 
export default RecTable;