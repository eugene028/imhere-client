import React, {useEffect} from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion";
import {requestEnrollment} from "../../../api";

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
  min-height: 30vh;
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
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  pointer-events: all;
`;

const ModalDescriptionRow = styled.div`
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  pointer-events: all;
  color: red;
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

const EnrollmentArea = styled.div`
  position: absolute;
  bottom: 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const EnrollmentButton = styled.button`
  font-size: 20px;
  min-width: 9.8vw;
  min-height: 6vh;
  margin: 10px;
  border-radius: 10px;
`

function LectureModal({isOpen, close, lecture}) {

    const requestCurrentLectureEnrollment = () => {
        console.log(lecture.lectureId)
        requestEnrollment(lecture.lectureId)
            .then(response => {
                console.log(response);
            });
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
                                <EnrollmentArea>
                                    <ModalDescriptionRow> 실제로 수강중인 강좌만 수강신청 해주세요 </ModalDescriptionRow>
                                    <EnrollmentButton onClick={() => requestCurrentLectureEnrollment()}>수강 신청하기</EnrollmentButton>
                                </EnrollmentArea>
                            </ModalWrapper>
                        </ModalContainer>
                    </Overlay>
                )
            }
        </AnimatePresence>
    );
}

export default LectureModal;