import React, {useContext, useEffect} from "react";
import {useState} from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {checkAndGetUserRole, checkUserHasRole} from "../util/AuthFunctions";
import * as ROUTES from "../lib/routes";
import LoadingSpinner from "../component/spinner/LoadingSpinner";
import {AttendancePage} from "./attendance";

const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  min-width: 30vw;
  max-width: 50vw;
`

const Button = styled.button`
  font-size: 20px;
  //min-width: 9.8vw;
  width: 100%;
  min-height: 6vh;
  margin: 10px;
  border-radius: 10px;
`

export const MainPage = () => {
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = checkAndGetUserRole();
        if (!role) {
            navigate(ROUTES.LOGIN);
        } else {
            setRole(role);
        }
    }, []);

    return (
        <>
            {
                role ?
                    role === 'ROLE_STUDENT'
                        ?
                        // 학생
                        <ButtonArea>
                            <Button type='button' className='lecture-button' onClick={() => navigate(ROUTES.LECTURES)}> 내 강의 </Button>
                            <Button type='button' className='attendance-button' onClick={() => navigate(ROUTES.ATTENDANCE)}> 출석하기 </Button>
                            <Button type='button' className='enrollment-button' onClick={() => navigate(ROUTES.ENROLLMENT)}> 강의 수강 신청 </Button>
                        </ButtonArea>
                        :

                        // 강사
                        <ButtonArea>
                            <Button type='button' className='lecture-button' onClick={() => navigate(ROUTES.LECTURES)}> 내 강의 </Button>
                            <Button type='button' className='lecture-create-button' onClick={() => navigate(ROUTES.LECTURE_CREATE)}> 새 강의 만들기 </Button>
                            <Button type='button' className='enrollment-approve-button' onClick={() => navigate(ROUTES.MANAGE_ENROLLMENT)}> 수강 학생 승인하기 </Button>
                        </ButtonArea>
                    :
                    <LoadingSpinner />
            }
        </>
    )
}
