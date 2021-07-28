const FormComp = (props) => {
    return (
        <div className="FormSheet">  
            <div className="field">
                <lable> Enrollment Id : </lable>
                <input
                    type="number"
                    disabled={ props.isEditing}
                    className="textfield" value={props.enrollId}
                    onChange={(e) => props.setEnrollId(e.target.value)} />
            </div>
            <div className="field">
                <lable> Student Name : </lable>
                <input 
                    type="text" 
                    className="textfield"  value={props.studentName}
                    onChange={(e) => props.setStudentName(e.target.value)} />
            </div>
            <div className="field">
                <lable> Maths : </lable>
                <input 
                    type="number" 
                    className="textfield"  value={props.maths}
                    onChange={(e) => props.setMaths(e.target.value)} />
            </div>
            <div className="field">
                <lable> English : </lable>
                <input 
                    type="number" 
                    className="textfield"  value={props.english}
                    onChange={(e) => props.setEnglish(e.target.value)} />
            </div>
            <div className="field">
                <lable> Science : </lable>
                <input
                    type="number"
                    className="textfield" value={props.science}
                    onChange={(e) => props.setScience(e.target.value)} />
            </div>
            <button onClick={ ()=>props.saveResult()}> Save Result </button>
        </div>
    );
};

export default FormComp;