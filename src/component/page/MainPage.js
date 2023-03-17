import React, {useContext, useEffect} from "react";
import {useState} from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {AuthContext, checkUserHasRole, validateUserAuth} from "../../util/AuthFunctions";
import * as ROUTES from "../../constants/routes";

const LoginAndSignUpBox = styled.div`
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
    const [isSignIn, setSignIn] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        univId: '',
        domain: '',
        school: '홍익대학교',
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUserHasRole()) {
            navigate(ROUTES.LOGIN);
        }
    }, []);

    return (
        <>
            <LoginAndSignUpBox>
                <Button type='button' className='signin-button'> 내 강의 불러오기 </Button>
                <Button type='button' className='signup-button'> 출석하기 </Button>
            </LoginAndSignUpBox>
        </>
    )
}
