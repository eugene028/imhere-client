import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {getLecturersOwnedLectures} from "../../../lib/api";
import LoadingSpinner from "../../../component/LoadingSpinner";
import LectureRow from "../LectureRow";
import LectureModalWithStudents from "./LectureModalWithStudents";
import * as ROUTES from "../../../lib/routes";
import {useNavigate} from "react-router-dom";
import LecturerLectureRow from "./LecturerLectureRow";
import { media } from '@ui/theme';
import { FlexBox } from '@ui/layout';
import { LecturerLectures } from '@components/LecturerLectures';

const LecturesContainer = styled.div`
  min-width: 70vw;
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
  color : black;
`

export const LecturerLecturesPage = () => {
    const [lectures, setLectures] = useState<Lecture[]|null>(null);
    const [currentLecture, setCurrentLecture] = useState<Lecture|null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLecturersOwnedLectures()
            .then(lectureList => {
                if (lectureList) {
                    setLectures(lectureList);
                } else {
                    alert('에러 발생! 관리자에게 문의하세요');
                    navigate(ROUTES.MAIN_PAGE);
                }
                setLoading(true);
            })
    }, []);

    return (
          <Wrapper>
            <FlexBox direction ={'column'}>
              <LecturerLectures title = {"강사 개설 강의 목록"} 
                lecturelist = {lectures} load ={loading} 
              />
            </FlexBox>
          </Wrapper>
    );
}
const Wrapper = styled.div`
   width: 990px;
   ${media.mobile} {
        width: 90vw;
    }
`