import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useLocation, useNavigate} from 'react-router-dom';
import * as ROUTES from "../../../constants/routes";
import {checkUserHasRole} from "../../../util/AuthFunctions";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import {getTodayAttendance} from "../../../api";
import StudentRow from "../lecture/lecturer/StudentRow";
import {StudentAttendanceInfoRow} from "./StudentAttendanceInfoRow";

const AttendanceAreaWrapper = styled.div`
  //position: absolute;
  min-width: 70vw;
  max-height: 70vh;
  border-radius: 10px;
  //margin: 0 auto;
  background-color: whitesmoke;
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TimeSetArea = styled.div`
  position: relative;
  display: grid;
  width: 70%;
  grid-template-columns: 25% 25% 25% 25%;
  margin: 20px 15%;
  height: 5vh;
`

const StudentsArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const YearSelect = styled.select``
const MonthSelect = styled.select``
const DaySelect = styled.select``

export const AttendancePage = () => {
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
        setLoading(true)
    }, []);

    const handleValue = (event) => {
        const {value, name} = event.target;
        setTime({...time, [name]: value});
    }

    const requestGetAttendance = () => {
        const {year, month, day} = time;
        const milliseconds = (new Date(year, month -1, day)).getTime();

        if (!milliseconds) {
            alert('정상적인 날짜를 입력하세요');
            return;
        }

        if (location && location.state && location.state.lectureId) {
            const lectureId = location.state.lectureId;
            getTodayAttendance(lectureId, milliseconds)
                .then(response => {
                    if (response) {
                        // console.log(response);

                        setStudentInfos(response.attendanceInfos);
                    }
                })
        }
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
                            <button type='button' onClick={() => requestGetAttendance()}>
                                search
                            </button>
                        </TimeSetArea>
                        <StudentsArea>
                            {Object.values(studentInfos).map((student, index) => {
                                console.log(student);
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