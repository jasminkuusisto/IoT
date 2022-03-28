const Record = ({ rec }) => {
    let time = rec.date.split('T')[0];
    const [year, month, day] = time.split('-');
    time = `${day}/${month}/${year}`;

    return (
        <tr>
            <td className="record">{rec.description}</td>
            <td className="record">{time}</td>
        </tr>
    );
}
 
export default Record;