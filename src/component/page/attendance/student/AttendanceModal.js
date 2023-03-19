import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion";
import {calculateDistance} from "../../../../util/DistanceCalculator";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  -webkit-box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.75);

  min-width: 30vw;
  pointer-events: all;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events: all;
`;

const ModalTitleRow = styled.div`
  font-weight: bold;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  pointer-events: all;
`;

const containerVariant = {
    initial: {top: "100%", transition: {type: "spring", damping: 10, stiffness: 500}},
    isOpen: {top: "50%"},
    exit: {top: "100%"},
};

const CloseButton = styled.button`
  position: absolute;
  right: 2%;
  top: 3%;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
  border: black 1px solid;
  color: black;
  z-index: 100;
  font-size: 15px;
`;

const AttendanceNumberArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
`
const AttendanceButton = styled.button`
  font-size: 20px;
  min-width: 9.8vw;
  min-height: 6vh;
  margin: 10px;
  border-radius: 10px;
`

const AttendanceNumberInput = styled.input`
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

function AttendanceModal({isOpen, close, lecture}) {
    const [attendanceNumber, setAttendanceNumber] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [accuracy, setAccuracy] = useState(-1);
    const [distance, setDistance] = useState(-1);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude, accuracy} = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
                setAccuracy(accuracy);
                setDistance(calculateDistance(latitude, longitude));
                console.log(latitude);
                console.log(longitude);
                console.log(accuracy);
                console.log(calculateDistance(latitude, longitude));
            },
            error => {
                console.log(error.message)
                alert('위치 정보를 가져오는데 에러가 발생했습니다.')
            }
        );
    }, []);

    const requestCurrentLectureAttendance = () => {
        if (!isNaN(attendanceNumber) || accuracy === -1 || distance === -1) {
            alert('좌표 정보를 가져오는데 문제가 발생했습니다.');
            return;
        }

        const payload = {
            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
            distance: distance,
        }
        // lectureId: lecture.lectureId,
        //     attendanceNumber: attendanceNumber,
        requestAttendance(payload)
            .then(response => {
                alert('출석 성공')
            });
    }

    const handleValue = (event) => {
        const {value} = event.target;
        setAttendanceNumber(value);
    }

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <Overlay initial="initial" animate="isOpen" exit="exit">
                        <ModalContainer variants={containerVariant}>
                            <ModalWrapper>
                                <CloseButton onClick={() => close(false)}>닫기</CloseButton>
                                <ModalTitleRow><p>{lecture.lectureName}</p></ModalTitleRow>
                                <AttendanceNumberArea>
                                    <AttendanceNumberInput type='number' className='input-attendance-number'
                                                           name='attendance-number' placeholder='출석 번호를 입력하세요'
                                                           value={attendanceNumber} onChange={handleValue}
                                                           inputMode='numeric'/>
                                    <AttendanceButton
                                        onClick={() => requestCurrentLectureAttendance()}>출석하기</AttendanceButton>
                                </AttendanceNumberArea>
                            </ModalWrapper>
                        </ModalContainer>
                    </Overlay>
                )
            }
        </AnimatePresence>
    );
}

export default AttendanceModal;