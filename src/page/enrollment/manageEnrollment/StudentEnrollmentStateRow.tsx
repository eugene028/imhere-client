import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {getLectureEnrollmentInfo} from "../../../api";
import * as ROUTES from "../../../lib/routes";

const Student = styled.div`
  display: grid;
  grid-template-columns: 5% 20% 20% 15% 20% 20%;
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

const Button = styled.button`
  margin : 0px 10px;
`

interface StudentEnrollmentStateRowProps {
  index: number,
  student: StudentInfo,
  setStateChangeRequest: (studentId: number, enrollmentState: EnrollmentState) => void
}

// 버튼이 있어야 합니다
const StudentEnrollmentStateRow = ({index, student, setStateChangeRequest}: StudentEnrollmentStateRowProps) => {
    const [approveButtonColor, setApproveButtonColor] = useState('green');
    const [rejectButtonColor, setRejectButtonColor] = useState('green');

    const request = (enrollmentState: EnrollmentState) => {
        setStateChangeRequest(student.id, enrollmentState);
    }

    return (
        <StudentRowWrapper>
            <Student>
                <div>{student.id}</div>
                <div>{student.name}</div>
                <div>{student.univId}</div>
                <div>{student.enrollmentState}</div>
                <Button onClick={() => {
                    request('APPROVAL');
                    setApproveButtonColor('red');
                    setRejectButtonColor('green');
                }}
                style={{backgroundColor : approveButtonColor}}
                >승인</Button>

                <Button onClick={() => {
                    request('REJECTION');
                    setApproveButtonColor('green');
                    setRejectButtonColor('red');
                }}
                style={{backgroundColor : rejectButtonColor}}
                >거절</Button>

            </Student>
        </StudentRowWrapper>
    );
};

export default StudentEnrollmentStateRow;