import '../styles/DisplayComp.css';
const DisplayComp = (props) => {
    console.log(props);
    return (
        <div>
            <button onClick={()=>props.sort()}>Sort</button>
            <input type="search" onChange={(e) => props.filter(e.target.value)} placeholder="Search Records" />
            <br/>

        {
            props.savedData.length >= 1 ?
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Enrollment Id
                                    </th>
                                    <th>
                                        Student Name
                                    </th>
                                    <th>
                                        Maths
                                    </th>
                                    <th>
                                        English
                                    </th>
                                    <th>
                                        Science
                                    </th>
                                    <th>
                                        Total
                                    </th>
                                    <th>
                                        Percentage
                                    </th>
                                    <th>
                                        Result
                                    </th>
                                    <th>
                                        Edit
                                    </th>
                                    <th>
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.savedData.map((studentRecord, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                { studentRecord.enrollId}
                                            </td>
                                             <td>
                                                { studentRecord.studentName}
                                            </td> 
                                            <td>
                                                <span style={
                                                    studentRecord.maths >= 35 ?{ color:"green"} : {color:"red"}
                                                }> { studentRecord.maths}</span>
                                            </td> 
                                            <td>
                                                <span style={
                                                    studentRecord.english >= 35 ?{ color:"green"} : {color:"red"}
                                                }> { studentRecord.english}</span>
                                            </td> 
                                            <td>
                                                <span style={
                                                    studentRecord.science >= 35 ?{ color:"green"} : {color:"red"}
                                                }> { studentRecord.science}</span>
                                            </td> 
                                            <td>
                                                { studentRecord.total}
                                            </td> 
                                            <td>
                                             <span style={
                                                    studentRecord.percentage >= 35 ?{ color:"green"} : {color:"red"}
                                                }> { studentRecord.percentage}</span>
                                               
                                            </td> 
                                            <td>
                                                <span style={
                                                    studentRecord.result == "Pass" ?{ color:"green"} : {color:"red"}
                                                }>{studentRecord.result}</span>
                                            </td> 
                                            <td>
                                                <button className="edit" onClick={ ()=> props.edit(studentRecord.enrollId)}>Edit</button>
                                            </td>
                                             <td>
                                                <button className="delete" onClick={() => props.delete(studentRecord)}>Delete</button>
                                            </td>
                                        </tr>
                                    ); 
                                })}
                            </tbody>
                        </table>
                    
                </div>
                : "No Records Found !"
        }
        </div>
    );
};

export default DisplayComp;