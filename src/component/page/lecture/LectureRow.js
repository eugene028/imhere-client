import React from 'react';
import styled from "styled-components";

const Lecture = styled.div`
  display: grid;
  grid-template-columns: 5% 60% 20% 15%;
  padding: 5px 20px;
  align-items: center;

  > div {
    border-right: 1px solid #ddd;
    text-align: center;

    &:last-child {
      border-right: none;
      text-align: center;
    }
  }
`

const LectureRowWrapper = styled.div`
  padding: 25px 10px;
  border-radius: 10px;
`

const LectureRow = ({index, lecture, onClick}) => {
    return (
        <LectureRowWrapper onClick={onClick}>
            <Lecture>
                <div className="lecture-index">{index + 1}</div>
                <div className="lecture-name">{lecture.lectureName}</div>
                <div className="lecturer-name">{lecture.lecturerName}</div>
                <div className="lecture-state">{lecture.lectureState}</div>
            </Lecture>
        </LectureRowWrapper>
    );
};

export default LectureRow;