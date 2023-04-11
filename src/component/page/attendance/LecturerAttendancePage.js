import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useLocation, useNavigate} from 'react-router-dom';
import * as ROUTES from "../../../constants/routes";
import {checkUserHasRole} from "../../../util/AuthFunctions";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import {getTodayAttendance} from "../../../api";
import {StudentAttendanceInfoRow} from "./StudentAttendanceInfoRow";
import {DescriptionRow} from "./DescriptionRow";
import {convertJsonToXlsx} from "../../../util/xlsxConverter";

const AttendanceAreaWrapper = styled.div`
  min-width: 70vw;
  max-height: 70vh;
  border-radius: 10px;
  padding: 20px;
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;


  pointer-events: all;
  
  overflow: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }
`

const TimeSetArea = styled.div`
  position: relative;
  display: grid;
  width: 90%;
  grid-template-columns: 23% 23% 23% 16% 15%;
  margin: 20px 5%;
  height: 5vh;
  
  select {
    margin: 0 3px;
  }
  
  button {
    margin: 0 5px;
    font-size: 10px;
  }
`

const StudentsArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`

const YearSelect = styled.select``
const MonthSelect = styled.select``
const DaySelect = styled.select``

export const LecturerAttendancePage = () => {
    const [loading, setLoading] = useState(false);
    const [studentInfos, setStudentInfos] = useState([]);
    const [time, setTime] = useState({
        year: 2023,
        month: 1,
        day: 1,
    });

    const location = useLocation();
    const navigate = useNavigate();

    const yearList = Array.from({length: 10}, (_, i) => i + 2023).map(Number);
    const monthList = Array.from({length: 12}, (_, i) => i + 1).map(Number);
    const dayList = Array.from({length: 31}, (_, i) => i + 1).map(Number);

    useEffect(() => {
        if (!checkUserHasRole(['ROLE_ADMIN', 'ROLE_LECTURER'])) {
            navigate(ROUTES.LOGIN);
        }
        const today = new Date();
        const timeToday = ({
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        })
        setTime(timeToday)

        requestGetAttendance(timeToday);

        setLoading(true)
    }, []);

    const handleValue = (event) => {
        const {value, name} = event.target;
        setTime({...time, [name]: value});
    }

    const requestGetAttendance = (requestTime) => {
        const {year, month, day} = requestTime;
        const milliseconds = (new Date(year, month -1, day)).getTime();

        if (!milliseconds) {
            alert('정상적인 날짜를 입력하세요');
            return;
        }

        if (location && location.state && location.state.lectureId) {
            const lectureId = location.state.lectureId;
            getTodayAttendance(lectureId, milliseconds)
                .then(response => {
                    if (response && response.attendanceInfos) {
                        console.log(response.attendanceInfos)
                        setStudentInfos(response.attendanceInfos);
                    }
                })
        }
    }

    const requestConvertJsonToXlsx = () => {
        const lectureName = (location && location.state && location.state.lectureName)
            ? location.state.lectureName : null;
        convertJsonToXlsx(studentInfos, lectureName);
    }

    return (
        <>
            {
                loading ?
                    <AttendanceAreaWrapper>
                        <TimeSetArea>
                            <YearSelect id='yearSelected' name='year' value={time.year} onChange={handleValue}>
                                {
                                    yearList.map(value => {
                                        return (<option>{value}</option>)
                                    })
                                }
                            </YearSelect>
                            <MonthSelect id='monthSelected' name='month' value={time.month} onChange={handleValue}>
                                {
                                    monthList.map(value => {
                                        return (<option>{value}</option>)
                                    })
                                }
                            </MonthSelect>
                            <DaySelect id='daySelected' name='day' value={time.day} onChange={handleValue}>
                                {
                                    dayList.map(value => {
                                        return (<option>{value}</option>)
                                    })
                                }
                            </DaySelect>
                            <button type='button' onClick={() => requestGetAttendance(time)}>
                                search
                            </button>
                            <button type='button' onClick={() => requestConvertJsonToXlsx(time)}>
                                download
                            </button>
                        </TimeSetArea>
                        <StudentsArea>
                            <DescriptionRow/>
                            {studentInfos && Object.values(studentInfos).map((student, index) => {
                                return (
                                    <StudentAttendanceInfoRow key={student.id} index={index} student={student}/>
                                )
                            })}
                        </StudentsArea>
                    </AttendanceAreaWrapper>

                    :

                    <LoadingSpinner/>
            }
        </>
    )
}