import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion";
import StudentEnrollmentStateRow from "./StudentEnrollmentStateRow";
import {useNavigate} from "react-router-dom";
import {changeEnrollmentState, getLecturersEnrollment} from "../../../../api";
import * as ROUTES from "../../../../constants/routes";

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

  width: 80vw;
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
  cursor: pointer;
  background-color: white;
  border: black 1px solid;
  color: black;
  z-index: 1000;
`;

const StudentsArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  div:hover {
    background-color: lightgrey;
  }

  button:hover {
    background-color: red;
    cursor: pointer;
  }
`

function EnrollmentManageModal({isOpen, close, lecture}) {
    const [enrollment, setEnrollment] = useState(null);
    const [toggle, setToggle] = useState(0);
    const navigate = useNavigate();
    const requestMap = new Map();

    useEffect(() => {
        if (lecture) {
            getLecturersEnrollment(lecture.lectureId)
                .then(response => {
                    if (response) {
                        setEnrollment(response);
                    } else {
                        alert('에러 발생! 관리자에게 문의하세요');
                        navigate(ROUTES.MAIN_PAGE);
                    }
                })
        }

    }, [lecture, toggle]);

    const setStateChangeRequest = (studentId, enrollmentState) => {
        requestMap.set(studentId, enrollmentState);
    }

    const requestStateChange = async () => {
        const lectureId = enrollment.lectureId;
        await requestMap.forEach((enrollmentState, studentId) => {
            changeEnrollmentState(lectureId, studentId, enrollmentState)
                .then(response => {
                    if (!response) {
                        alert('실패 인원 있음 ' + lectureId + "번 강좌 " + studentId + "번 학생 " + enrollmentState + "로 변화.")
                    }
                })
                .catch(error => {
                    console.log("change error " + lectureId + ', ' + studentId + ', ' + enrollmentState + ', ' + error);
                })
        })
    }

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <Overlay initial="initial" animate="isOpen" exit="exit">
                        <ModalContainer variants={containerVariant}>
                            <ModalWrapper>
                                <CloseButton onClick={() => {
                                    requestStateChange().then(r => {
                                            requestMap.clear();
                                            setToggle(1 - toggle);
                                            close(false);
                                        }
                                    );
                                }}>저장 (신중)</CloseButton>
                                <ModalDescriptionRow><p>{lecture.lectureName}</p></ModalDescriptionRow>
                                <ModalDescriptionRow><p>수강생 목록</p></ModalDescriptionRow>
                                <StudentsArea>
                                    {enrollment && enrollment.studentInfos && Object.values(enrollment.studentInfos).map((student, index) => {
                                        return (
                                            <StudentEnrollmentStateRow key={student.id} index={index} student={student}
                                                                       setStateChangeRequest={setStateChangeRequest}/>
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

export default EnrollmentManageModal;