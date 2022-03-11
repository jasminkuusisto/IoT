import Header from './components/Header'
import Record from './components/Alarm_record'

function App() {
  //const records = useState(data)[0];
  const records = [
    {
      "message": 'This is how alarms will be shown', 
      "time": '18:50'
    },
    {
      "message": 'Example alarm 1', 
      "time": '19:00'
    }
  ];

  return (
    <div className="container">
      <Header />

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

    </div>
  );
}

export default App;
