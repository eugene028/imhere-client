import React, {useContext, useEffect} from "react";
import {useState} from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {AuthContext, checkAndGetUserRole, validateUserAuth} from "../../util/AuthFunctions";
import * as ROUTES from "../../constants/routes";
import LoadingSpinner from "../spinner/LoadingSpinner";

const BottonArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 10px;
  margin-top: 10px;
  width: 20vw;
`

const Button = styled.button`
  font-size: 10px;
  min-width: 9.8vw;
`

export const MainPage = () => {
    const [role, setRole] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!checkAndGetUserRole()) {
            navigate(ROUTES.LOGIN);
        }
    }, []);

    return (
        <>
            {
                role ?
                    role === 'ROLE_STUDENT'
                        ?
                        <BottonArea>
                            <Button type='button' className='lecture-button'> 내 강의 불러오기 </Button>
                            <Button type='button' className='attendance-button'> 출석하기 </Button>
                            <Button type='button' className='enrollment-button'> 강의 수강 신청 </Button>
                        </BottonArea>
                        :
                        <BottonArea>
                            <Button type='button' className='own-lecture-button'> 내가 만든 강의 불러오기 </Button>
                            <Button type='button' className='enrollment-approve-button'> 수강 학생 승인하기 </Button>
                            <Button type='button' className='lecture-create-button'> 새 강의 만들기 </Button>
                        </BottonArea>
                    :
                    <LoadingSpinner />
            }
        </>
    )
}
