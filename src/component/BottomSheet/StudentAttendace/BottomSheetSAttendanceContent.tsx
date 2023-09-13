import { Button } from "@ui/components";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { calculateDistance } from "@util/DistanceCalculator";
import { requestAttendance } from "@lib/api";
import { Input } from "@ui/components";
import { theme } from "@ui/theme";
import { getSeoulDateNow } from "@util/getSeoulTime";
import useToastify from "@lib/hooks/useToastify";

interface BottomSheetButtonProps {
    lecture: Lecture | null;
    setBottomOpen: () => void;
}
export const BottomSheetSAttendanceContent = ({lecture, setBottomOpen}: BottomSheetButtonProps) => {
    const [attendanceNumber, setAttendanceNumber] = useState<number | string>('');
    const [accuracy, setAccuracy] = useState(-1);
    const [distance, setDistance] = useState(-1);
    const { setToast } = useToastify()
    const getDistance = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude, accuracy} = position.coords;
                setAccuracy(accuracy);
                setDistance(calculateDistance(latitude, longitude));
            },
            error => {
                setToast({comment:'위치 정보를 가져오지 못했습니다. 위치 허용을 켜주세요.', type:'error'})
            }
        );
    }

    useEffect(() => {
        getDistance();
        if(!attendanceNumber){
            setAttendanceNumber('')
        }
    }, []);
    
    const requestCurrentLectureAttendance = () => {
        if (!lecture) throw "lecture = null"

        if (typeof attendanceNumber !== 'number') {
            setToast({comment:'출석번호는 숫자만 입력 가능합니다.', type:'warning'})
            return;
        }
        console.log(distance)

        if (distance === -1) {
            setToast({comment:'위치 정보를 가져오지 못했습니다.', type:'error'})
            getDistance();
            return;
        }

        const payload: AttendanceRequest = {
            attendanceNumber: attendanceNumber,
            distance: String(distance),
            accuracy: String(accuracy),
            milliseconds: (getSeoulDateNow()).getTime()
        }

        requestAttendance(lecture.lectureId, payload)
            .then(response => {
                if (response) {
                    setToast({comment:'출석 성공!', type:'success'})
                    setBottomOpen();
                } else {
                    setToast({comment:'출석 실패! 출석번호를 확인해주세요.', type:'error'})
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
            {distance === -1 ? (<div>위치 정보 불러오는 중.. </div>): (<Button varient={'regular'} 
                    fullWidth ={false}
                    style={{width: '350px'}}
                    onClick={() => {requestCurrentLectureAttendance(); setBottomOpen();}}>출석 체크하기</Button>)}
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