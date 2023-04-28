import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {getLectureEnrollmentInfo, getLecturersOwnedLectures} from "../../../../api";
import LoadingSpinner from "../../../spinner/LoadingSpinner";
import EnrollmentManageModal from "./EnrollmentManageModal";
import LectureRow from "../../lecture/LectureRow";
import * as ROUTES from "../../../../constants/routes";
import {useNavigate} from "react-router-dom";
import {checkUserHasRole} from "../../../../util/AuthFunctions";

const LecturesContainer = styled.div`
  min-width: 40vw;
  max-height: 70vh;
  border-radius: 10px;
  margin: 0 auto;
  background-color: whitesmoke;
  overflow: visible;
  display: flex;
  flex-direction: column;

`;

const LectureTable = styled.div`
  width: 100%;
  user-select: none;
  overflow: visible;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
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

  div:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`;

const Title = styled.button`
  font-size: 20px;
  min-height: 4vh;
  margin: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  color: black;
`

export const EnrollmentManagePage = () => {
    const [lectures, setLectures] = useState(null);
    const [currentLecture, setCurrentLecture] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUserHasRole(['ROLE_ADMIN', 'ROLE_LECTURER'])) {
            navigate(ROUTES.LOGIN);
            return;
        }

        getLecturersOwnedLectures()
            .then(lectureList => {
                if (lectureList) {
                    setLectures(lectureList);
                } else {
                    alert('에러 발생! 관리자에게 문의하세요');
                    navigate(ROUTES.MAIN_PAGE);
                }
            })
    }, []);

    return (
        lectures ?
            <LecturesContainer>
                <Title>강사 개설 강의 목록</Title>
                <EnrollmentManageModal isOpen={isModalOpen} close={setModalOpen}
                                       lecture={currentLecture ? currentLecture : null}/>
                <LectureTable>
                    {
                        Object.values(lectures).map((lecture, index) => {
                            return (
                                <LectureRow key={lecture.lectureId} index={index} lecture={lecture}
                                    onClick={() => {
                                        setCurrentLecture(lecture);
                                        setModalOpen(true);
                                    }}/>
                            )
                        })
                    }
                </LectureTable>
            </LecturesContainer>
            :
            <LoadingSpinner/>
    );
}