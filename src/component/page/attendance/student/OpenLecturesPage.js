import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import * as ROUTES from "../../../../constants/routes"
import {useNavigate} from "react-router-dom";
import {getAllStudentsOPENLectures} from "../../../../api";
import {checkUserHasRole} from "../../../../util/AuthFunctions";
import LoadingSpinner from "../../../spinner/LoadingSpinner";
import LectureRow from "../../lecture/LectureRow";
import AttendanceModal from "./AttendanceModal";

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

export const OpenLecturesPage = () => {
    const [lectures, setLectures] = useState([]);
    const [currentLecture, setCurrentLecture] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUserHasRole()) {
            navigate(ROUTES.LOGIN);
            return;
        }

        getAllStudentsOPENLectures()
            .then(lectureList => {
                if (lectureList) {
                    setLectures((prevLectures) => {
                        if (prevLectures !== lectureList) {
                            return lectureList;
                        }
                        return prevLectures;
                    });
                } else {
                    alert('에러 발생! 관리자에게 문의하세요');
                    navigate(ROUTES.MAIN_PAGE);
                }
                setLoading(true);
            })
    }, []);

    return (
        loading ?
            lectures.length !== 0 ?
                <LecturesContainer>
                    <Title>출석 체크 가능 강좌 목록</Title>
                    <AttendanceModal isOpen={isModalOpen} close={setModalOpen}
                                     lecture={currentLecture ? currentLecture : null}/>
                    <LectureTable>
                        {
                            Object.values(lectures).map((lecture, index) => {
                                return (
                                    <LectureRow key={lecture.lectureId} index={index} lecture={lecture} onClick={() => {
                                        setCurrentLecture(lecture);
                                        setModalOpen(true);
                                    }}/>
                                )
                            })
                        }
                    </LectureTable>
                </LecturesContainer>
                :
                <LecturesContainer>
                    <Title>현재 출석 가능한 수업이 없습니다.</Title>
                </LecturesContainer>

            :

            <LoadingSpinner/>
    )
}