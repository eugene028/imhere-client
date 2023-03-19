import React from 'react';
import styled from "styled-components";

const Student = styled.div`
  display: grid;
  grid-template-columns: 5% 20% 20% 15% 15% 10% 10%;
  padding: 5px 10px;
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
  padding: 15px 10px;
  border-radius: 10px;
`

export const StudentAttendanceInfoRow = ({index, student}) => {
    const {name, univId, timestamp, distance, accuracy} = student;
    const date = new Date(timestamp);
    const dateString = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    const timeString = date.getHours() + ':' + date.getMinutes();
    return (
        <StudentRowWrapper>
            <Student>
                <div className="lecture-index">{index + 1}</div>
                <div className="lecture-name">{name}</div>
                <div className="lecture-name">{univId}</div>
                <div className="lecture-name">{dateString}</div>
                <div className="lecture-name">{timeString}</div>
                <div className="lecture-name">{distance}</div>
                <div className="lecture-name">{accuracy}</div>
            </Student>
        </StudentRowWrapper>
    );
};