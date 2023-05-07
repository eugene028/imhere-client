import React from "react";
import {useState} from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import {requestSignIn} from "../../api";
import {setAccessToken} from "../../util/AuthFunctions";
import { Button, StatusIcon, Text, Input } from '@ui/components';

const LoginArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-top: 10px;
  min-width: 60vw;
  position: relative;
`

const LoginAndSignUpBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 10px;
  margin-top: 10px;
  min-width: 60vw;
`

const ButtonCustom = styled.button`
  font-size: 10px;
  min-width: 49%;
`

const UnivIdInput = styled.input`
  box-sizing: border-box;
`

const DomainSelect = styled.select`
`

const EmailArea = styled.div`
  display: grid;
  grid-template-columns: 60% minmax(0px, auto);
`

const PasswordInputContainer = styled.div`
  position: relative;
  width: 100%;
  display: inline-block;
`;

const PasswordInput = styled.input`
  position: relative;
  width: 100%;
  box-sizing: border-box;
`

const ViewButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  border-radius: 5px;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 16px;
  
  display: flex;
  align-items: center;
`;

export const LoginPage = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [userData, setUserData] = useState({
        univId: '',
        password: '',
        domain: '',
    })

    const navigate = useNavigate();

    const handleValue: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const {value, name} = event.target;
        setUserData({...userData, [name]: value});
    }

    const signUp = () => {
        navigate(ROUTES.SIGN_UP);
    }

    const signIn = () => {
        const {univId, password} = userData;
        if (!univId || !password) {
            alert('모든 칸을 채워 주세요')
            return null;
        }

        requestSignIn(univId, password)
            .then(response => {
                if (response) {
                    setAccessToken(response);
                    navigate(ROUTES.MAIN_PAGE);
                }
            });
    }

    return (
        <>
            <LoginArea>
                <EmailArea>
                    <UnivIdInput type='text' className='input-univId' name='univId' placeholder='이메일'
                                 value={userData.univId} onChange={handleValue}/>
                    <DomainSelect className='select-domain' name='domain' placeholder='도메인 선택' value={userData.domain}
                                  onChange={handleValue}>
                        <option>@gmail.com</option>
                        <option>@g.hongik.ac.kr</option>
                    </DomainSelect>
                </EmailArea>
                <PasswordInputContainer>
                    <PasswordInput type={isPasswordHidden ? 'password' : 'text'} className='input-password' name='password' placeholder='비밀번호'
                                   value={userData.password} onChange={handleValue}/>
                    <ViewButton onClick={() => setIsPasswordHidden(prevState => !prevState)}>
                        {isPasswordHidden ? '👁️' : '🔒'}
                    </ViewButton>
                </PasswordInputContainer>
                <LoginAndSignUpBox>
                    <ButtonCustom type='button' className='signup-button' onClick={signUp}> 회원가입 </ButtonCustom>
                    <ButtonCustom type='button' className='signin-button' onClick={signIn}> 로그인 </ButtonCustom>
                    
                </LoginAndSignUpBox>
            </LoginArea>
        </>
    )
}


