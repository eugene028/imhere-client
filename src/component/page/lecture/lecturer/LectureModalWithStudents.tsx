import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion";
import StudentRow from "./StudentRow";
import {changeLectureState, getLecturersOwnedLectures} from "../../../../api";
import {useNavigate} from "react-router-dom";
import * as ROUTES from "../../../../constants/routes";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
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

  min-width: 60vw;
  min-height: 40vh;
  max-height: 70vh;

  pointer-events: all;

  overflow: visible;

  overflow-y: scroll;

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

  button:hover {
    cursor: pointer;

  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events: all;
`;

const ModalTitleRow = styled.div`
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  pointer-events: all;
`;

const ModalDescriptionRow = styled.div`
  padding: 5px;
  font-weight: bold;
  font-size: 15px;
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
  background-color: white;
  border: black 1px solid;
  color: black;
  z-index: 10;
`;

const SaveButton = styled.button`
  position: absolute;
  left: 2%;
  top: 3%;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
  border: black 1px solid;
  color: black;
  z-index: 1000;
`;

const StudentsArea = styled.div`
  //position: absolute;
  //bottom: 8%;
  width: 100%;
  display: flex;
  flex-direction: column;
  //justify-content: center;
`

const Button = styled.button`
  margin: 0px 10px;
`

const AttendancePageButton = styled.button`
  position: absolute;
  left: 2%;
  top: 3%;
  border-radius: 10px;
  background-color: white;
  border: black 1px solid;
  color: black;
  z-index: 10;
`

function LectureModalWithStudents({isOpen, close, lecture}) {
    const [openButtonColor, setOpenButtonColor] = useState(green);
    const [closeButtonColor, setCloseButtonColor] = useState(green);
    const [lectureStateRequest, setLectureStateRequest] = useState(null);
    const navigate = useNavigate();

    const open = 'OPEN';
    const closed = 'CLOSED';
    const red = 'red';
    const green = 'green';

    const requestLectureStateChange = async () => {
        if (lectureStateRequest && lectureStateRequest !== lecture.lectureState) {
            await changeLectureState(lecture.lectureId, lectureStateRequest)
                .then(response => {
                    if (response) {
                        alert('강의 출석 번호는 ' + response + '입니다! 잊지 마세요!!\n' +
                            '출석 번호는 5분간 유효합니다!');
                    }
                })
                .catch(erorr => {
                    alert('에러가 발생했습니다 관리자에게 문의하세요 ' + erorr);
                })
        }
    }

    const handleButtonClick = (button) => {
        if (button === open) {
            if (lectureStateRequest === open) {
                setOpenButtonColor(green);
                setLectureStateRequest(null);
            } else {
                setOpenButtonColor(red);
                setLectureStateRequest(open);
            }
            setCloseButtonColor(green);
        } else {
            if (lectureStateRequest === closed) {
                setCloseButtonColor(green);
                setLectureStateRequest(null);
            } else {
                setCloseButtonColor(red);
                setLectureStateRequest(closed);
            }
            setOpenButtonColor(green)
        }
    }

    const navigateAttendancePage = () => {
        navigate(ROUTES.ATTENDANCE, { state : { lectureId : lecture.lectureId, lectureName : lecture.lectureName } });
    }

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <Overlay initial="initial" animate="isOpen" exit="exit">
                        <ModalContainer variants={containerVariant}>
                            <ModalWrapper>
                                <CloseButton onClick={() => {
                                    requestLectureStateChange()
                                        .finally(() => {
                                                setOpenButtonColor(green);
                                                setCloseButtonColor(green);
                                                setLectureStateRequest(null);
                                                close(false);
                                            }
                                        )
                                    ;
                                }}>닫기 (강의 상태 변경)</CloseButton>
                                <AttendancePageButton onClick={() => navigateAttendancePage()}>출석 페이지 이동</AttendancePageButton>
                                <ModalDescriptionRow><p>{lecture.lectureName}</p></ModalDescriptionRow>
                                <ModalDescriptionRow>
                                    <Button onClick={() => handleButtonClick(open)}
                                            style={{backgroundColor: openButtonColor}}
                                    >강의 열기</Button>

                                    <Button onClick={() => handleButtonClick(closed)}
                                            style={{backgroundColor: closeButtonColor}}
                                    >강의 닫기</Button>
                                </ModalDescriptionRow>
                                <ModalDescriptionRow><p>수강생 목록</p></ModalDescriptionRow>

                                <StudentsArea>
                                    {lecture && lecture.studentInfos && Object.values(lecture.studentInfos).map((student, index) => {
                                        return (
                                            <StudentRow key={student.id} index={index} student={student}/>
                                        )
                                    })}
                                </StudentsArea>
                            </ModalWrapper>
                        </ModalContainer>
                    </Overlay>
                )
            }
        </AnimatePresence>
    );
}

export default LectureModalWithStudents;