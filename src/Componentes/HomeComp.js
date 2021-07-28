import React, { useEffect, useState } from 'react';
import DisplayComp from './DisplayComp';
import FormComp from './FormComp';
const HomeComp = () => {

    /// all the hooks are declared to manage student data and events.
    const [enrollId, setEnrollId] = useState(0);
    const [studentName, setStudentName] = useState('');
    const [maths, setMaths] = useState(0);
    const [english, setEnglish] = useState(0);
    const [science, setScience] = useState(0);
    const [total, setTotal] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [result, setResult] = useState(0);
    const [savedData, setSavedData] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [storedMainData, setStoredMainData] = useState([]);
    const [searchString, setSearchString] = useState("");
    
    /// calculate sum of marks in each subjects and return total.
    const getTotal = (fMaths, fEnglish, fScience, doSet = true) => {
        const _totalMarks = parseInt(fMaths) + parseInt(fEnglish) + parseInt(fScience);
        if(doSet)
            setTotal(_totalMarks);
        return _totalMarks;
    };

    /// calculate percentage of the student from marks and return percentage.
    const getPercentage = (fMaths, fEnglish, fScience, doSet = true) => {
        const _totalMarks = getTotal(fMaths, fEnglish, fScience, false);
        const _percentage = _totalMarks * 100 / 300;
        if(doSet)
            setPercentage(_percentage);
        return _percentage;
    };

    /// check records of the student and make pass or fail decission and return result.
    const getResult = (fMaths, fEnglish, fScience, doSet = true) => {
        var _result = "Pass";
        const _percentage = getPercentage(fMaths, fEnglish, fScience, false);
        if (parseInt(fMaths) < 35 || parseInt(fEnglish) < 35 || parseInt(fScience) < 35 || _percentage < 35) {
            _result = "Fail";
        }
        if(doSet)
            setResult(_result);
        return _result;
    };
    

    /// set validation to all the fields..
    const validateFields = () => {
        var _validationText = "";

        if (enrollId === 0 || enrollId === "") {
            _validationText = "Please enter your valid enrollment Id.";
        } else if (studentName === "") {
            _validationText = "Please enter your valid name.";
        }else if (maths === 0 || maths === "" || parseInt(maths) < 0 || parseInt(maths) > 100) {
            _validationText = "Please enter your valid marks of maths.";
        }else if (english === 0 || english === ""|| parseInt(english) < 0 || parseInt(english) > 100) {
            _validationText = "Please enter your valid marks of english.";
        }else if (science === 0 || science === ""|| parseInt(science) < 0 || parseInt(science) > 100) {
            _validationText = "Please enter your valid marks of science.";
        }

        return _validationText;
    };
    

    /// save record in array
    const saveResult = () => {
        const _validationText = validateFields();
        if (_validationText === "") {
            const _isRecordsExist = savedData.some((e) => e.enrollId === enrollId);
            if (isEditing) {
                if (_isRecordsExist) {
                const _kTotal = getTotal(maths, english, science);
                const _kPercentage = getPercentage(maths, english, science);
                const _kResult = getResult(maths, english, science);
                  
                    var index = 0;
                        console.log(storedMainData);

                    for (const record of storedMainData) {
                        console.log(record.enrollId);
                        if (record.enrollId === enrollId) {

                            const _obj = storedMainData;
                            _obj.splice(index, 1, {
                                enrollId: enrollId,
                                studentName: studentName,
                                maths: maths,
                                english: english,
                                science: science,
                                total: _kTotal,
                                percentage: _kPercentage,
                                result: _kResult,
                            });
                            
                            setStoredMainData(_obj);
                            setSavedData(_obj);
                            break;
                        }
                        index++;
                    }
                    
                    
                    // console.log(_obj);

                } else {
                alert("Record not exists !");
                }
                setIsEditing(false);
            }
            else {
                if (!_isRecordsExist) {
                const _kTotal = getTotal(maths, english, science);
                const _kPercentage = getPercentage(maths, english, science);
                const _kResult = getResult(maths, english, science);

                setStoredMainData([...storedMainData, {
                    enrollId: enrollId,
                    studentName: studentName,
                    maths: maths,
                    english: english,
                    science: science,
                    total: _kTotal,
                    percentage: _kPercentage,
                    result: _kResult,
                    rIndex: storedMainData.length,
                }]);
                setSavedData([...savedData, {
                    enrollId: enrollId,
                    studentName: studentName,
                    maths: maths,
                    english: english,
                    science: science,
                    total: _kTotal,
                    percentage: _kPercentage,
                    result: _kResult,
                    rIndex: savedData.length,
                }]);
                console.log(savedData);
                } else {
                alert("Record alreadt exists with the Enrollment Id");
                }
             }
            
        } else {
            alert(_validationText);
        }
    };

    /// delete selected student from array
    const deleteStudent = (fRecord) => {
        const smdIndex = storedMainData.indexOf(fRecord);
        storedMainData.splice(smdIndex, 1);
        setStoredMainData([...storedMainData]);
        // const sdIndex = savedData.indexOf(fRecord);
        // savedData.splice(sdIndex, 1);
        // setSavedData([...savedData]);
        //  storedMainData.forEach((student, sIndex)=>{
        //     if (student.enrollId == fEnrollId) {
                
        //     }
        // });
        // setSavedData(savedData.filter((record) => record.enrollId != fEnrollId ));
        // setStoredMainData(storedMainData.filter((record) => record.enrollId != fEnrollId ));
    };

    const editStudent = (fEnrollId) => {
        setIsEditing(true);
        var studentObj = {};
        storedMainData.forEach((student)=>{
            if (student.enrollId === fEnrollId) {
                studentObj = student;
            }
        });
        setEnrollId(studentObj.enrollId);
        setStudentName(studentObj.studentName);
        setMaths(studentObj.maths);
        setEnglish(studentObj.english);
        setScience(studentObj.science);
        setTotal(studentObj.total);
        setPercentage(studentObj.percentage);
        setResult(studentObj.result);
    }

    /// filter data
    // const filterStudent = (fName) => {
    //     setIsSearching(true);
    //     var searchString = new RegExp(fName + '', 'i');
    //     const data = storedMainData.filter((record) => record.studentName.search(searchString) != -1);

    //     if (data.length <= 0) {
    //         setIsSearching(false);
    //     }
    //     setSavedData(data);
    // };

    useEffect(() => {
        setIsSearching(true);
        var _searchString = new RegExp(searchString + '', 'i');
        const data = storedMainData.filter((record) => record.studentName.search(_searchString) !== -1);

        if (data.length <= 0) {
            setIsSearching(false);
        }
        setSavedData(data);
    }, [searchString, storedMainData]);
    
    const sortStudent = () => {
        const data = storedMainData.sort((a,b)=>b-a);
        setSavedData(data);
    };

    return (
        <>
            <FormComp
                setEnrollId={setEnrollId}
                setStudentName={setStudentName}
                setMaths={setMaths}
                setEnglish={setEnglish}
                setScience={setScience}
                saveResult={saveResult}
                enrollId={enrollId}
                studentName={studentName}
                maths={maths}
                english={english}
                science={science}
                isEditing={ isEditing}
            />
            <br /><hr/><br />
            <DisplayComp savedData={savedData} delete={deleteStudent} filter={setSearchString} edit={editStudent} sort={sortStudent}/>
        </>
    );
 };

export default HomeComp;