import { useState, useEffect } from "react";
import styled from "styled-components";
import {useLocation, useNavigate} from 'react-router-dom';
import * as ROUTES from "@lib/routes";
import { theme } from "@ui/theme";
import {checkUserHasRole} from "@util/AuthFunctions";
import LoadingSpinner from "../../component/LoadingSpinner";
import {getTodayAttendance} from "@lib/api";
import { Text } from "@ui/index";
import {StudentAttendanceInfoRow} from  "@page/attendance";
import {DescriptionRow} from "@page/attendance";
import {convertJsonToXlsx} from "@util/xlsxConverter";
import { getSeoulDateNow } from "@util/getSeoulTime";

interface Time {
    year: number,
    month: number,
    day: number,
}

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

const YearSelect = styled.select`
    background-color: ${theme.palette.background_200};
    border: 1px solid transparent;
    padding: 5px;
`
const MonthSelect = styled.select`
    background-color: ${theme.palette.background_200};
    border: 1px solid transparent;
    padding: 5px;
`
const DaySelect = styled.select`
    background-color: ${theme.palette.background_200};
    border: 1px solid transparent;
    padding: 5px;
`

export const LecturerAttendancePage = () => {
    const [loading, setLoading] = useState(false);
    const [studentInfos, setStudentInfos] = useState<AttendanceInfo[]>([]);
    const [time, setTime] = useState<Time>({
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
        const today = getSeoulDateNow();
        const timeToday = ({
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
        })
        setTime(timeToday)

        requestGetAttendance(timeToday);

        setLoading(true)
    }, []);

    const handleValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {value, name} = event.target;
        setTime({...time, [name]: value});
    }

    const requestGetAttendance = (requestTime: Time) => {
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
                        setStudentInfos(response.attendanceInfos);
                    }
                })
        }
    }

    const requestConvertJsonToXlsx = () => {
        const lectureName = (location && location.state && location.state.lectureName)
            ? location.state.lectureName as string : null;
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
                                    yearList.map((value,index) => {
                                        return (<option key={index}>{value}</option>)
                                    })
                                }
                            </YearSelect>
                            <MonthSelect id='monthSelected' name='month' value={time.month} onChange={handleValue}>
                                {
                                    monthList.map((value,index)=> {
                                        return (<option key={index}>{value}</option>)
                                    })
                                }
                            </MonthSelect>
                            <DaySelect id='daySelected' name='day' value={time.day} onChange={handleValue}>
                                {
                                    dayList.map((value,index) => {
                                        return (<option key={index}>{value}</option>)
                                    })
                                }
                            </DaySelect>
                            <button type='button' onClick={() => requestGetAttendance(time)}>
                                <Text typo='Text_15'>search</Text>
                            </button>
                            <button type='button' onClick={() => requestConvertJsonToXlsx()}>
                                <Text typo='Text_15'>download</Text>
                            </button>
                        </TimeSetArea>
                        <StudentsArea>
                            <DescriptionRow/>
                            {studentInfos && Object.values(studentInfos).map((student, index) => {
                                return (
                                    <StudentAttendanceInfoRow key={index} index={index} student={student}/>
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