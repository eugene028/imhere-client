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

export const DescriptionRow = () => {
    return (
        <StudentRowWrapper>
            <Student>
                <div className="lecture-index">index</div>
                <div className="lecture-name">이름</div>
                <div className="lecture-name">아이디</div>
                <div className="lecture-name">날짜</div>
                <div className="lecture-name">시간</div>
                <div className="lecture-name">거리(m)</div>
                <div className="lecture-name">정확도(m)</div>
            </Student>
        </StudentRowWrapper>
    );
};