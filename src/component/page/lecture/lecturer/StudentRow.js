import React from 'react';
import styled from "styled-components";

const Student = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 30%;
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

const StudentRowWrapper = styled.div`
  padding: 25px 10px;
  border-radius: 10px;
`

const StudentRow = ({index, student}) => {
    return (
        <StudentRowWrapper>
            <Student>
                <div className="lecture-index">{index + 1}</div>
                <div className="lecture-name">{student.name}</div>
                <div className="lecture-name">{student.univId}</div>
            </Student>
        </StudentRowWrapper>
    );
};

export default StudentRow;