import React from 'react';
import styled from "styled-components";

const LectureRow = styled.div`
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
const LectureForStudent = ({ index, lecture }) => {
    return (
        <LectureRow>
            <div className="lecture-index">{index + 1}</div>
            <div className="lecture-name">{lecture.lectureName}</div>
            <div className="lecturer-name">{lecture.lecturerName}</div>
            <div className="lecture-state">{lecture.lectureState}</div>
        </LectureRow>
    );
};

export default LectureForStudent;