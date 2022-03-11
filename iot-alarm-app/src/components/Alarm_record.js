const Record = ({ rec }) => {
    return (
        <tr>
            <td className="record">{rec.message}</td>
            <td className="record">{rec.time}</td>
        </tr>
    );
}
 
export default Record;