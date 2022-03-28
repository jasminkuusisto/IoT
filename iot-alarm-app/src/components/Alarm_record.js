const Record = ({ rec }) => {
    return (
        <tr>
            <td className="record">{rec.description}</td>
            <td className="record">{rec.date}</td>
        </tr>
    );
}
 
export default Record;