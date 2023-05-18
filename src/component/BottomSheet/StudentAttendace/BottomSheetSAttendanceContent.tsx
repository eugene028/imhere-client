import { Button } from "@ui/components";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { calculateDistance } from "@util/DistanceCalculator";
import { requestAttendance } from "@lib/api";
import { Input } from "@ui/components";
import { theme } from "@ui/theme";

interface BottomSheetButtonProps {
    lecture: Lecture | null;
    setBottomOpen: () => void;
}
export const BottomSheetSAttendanceContent = ({lecture, setBottomOpen}: BottomSheetButtonProps) => {
    const [attendanceNumber, setAttendanceNumber] = useState<number>();
    const [accuracy, setAccuracy] = useState(-1);
    const [distance, setDistance] = useState(-1);
    
    const getDistance = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude, accuracy} = position.coords;
                setAccuracy(accuracy);
                setDistance(calculateDistance(latitude, longitude));
            },
            error => {
                alert('위치 정보를 가져오는데 에러가 발생했습니다.')
            }
        );
    }

    useEffect(() => {
        getDistance();
    }, []);
    


    const requestCurrentLectureAttendance = () => {
        if (!lecture) throw "lecture = null"

        if (attendanceNumber && isNaN(attendanceNumber)) {
            alert('출석 번호가 숫자가 아닙니다.')
            return;
        }

        if (distance === -1) {
            alert('좌표 정보를 가져오는데 문제가 발생했습니다.\n 좌표 정보를 다시 수집하겠습니다. 다시 출석해주세요');
            getDistance();
            return;
        }

        const payload: AttendanceRequest = {
            attendanceNumber: attendanceNumber,
            distance: String(distance),
            accuracy: String(accuracy),
            milliseconds: (new Date()).getTime()
        }

        requestAttendance(lecture.lectureId, payload)
            .then(response => {
                if (response) {
                    alert('출석 성공');
                    setBottomOpen();
                } else {
                    alert('출석 실패');
                }
            });
    }

    const handleValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {value} = event.target;
        if (isNaN(Number(value))) {
            return;
        }
        if (value.length > 4){
            return;
        }
        setAttendanceNumber(Number(value));
    }

    if (!lecture) return null;
    return (
        <>
        <Wrapper>
            <Input 
                style ={{border: `1px solid ${theme.palette.black_100}`, height: '40px', borderRadius: '10px'}} 
                innershadow = {false} onChange={handleValue} 
                value={attendanceNumber} placeholder="출석번호를 입력해주세요!"/>
        </Wrapper>
        <ButtonWrapper>
                <Button varient={'regular'} 
                    fullWidth ={false}
                    style={{width: '350px'}}
                    onClick={() => {requestCurrentLectureAttendance(); setBottomOpen();}}>출석 체크하기</Button>
        </ButtonWrapper>
        </>
        
    )
}

const Wrapper = styled.div`
    padding-left: 10px;
    margin-top: 15px;
`

const ButtonWrapper = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    right: 0;
    top: 220px;
    z-index: 2500;
    width: 100%;
    box-sizing: border-box;
`