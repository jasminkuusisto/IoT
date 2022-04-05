const Record = ({ rec }) => {
    let d = new Date(Date.parse(rec.date))

    return (
        <tr>
            <td className="record">{rec.description}</td>
            <td className="record">{d.toString().split('G')[0]}</td>
        </tr>
    );
}
 
export default Record;