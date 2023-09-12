import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import * as ROUTES from "@lib/routes";
import { requestSignIn } from "@lib/api";
import { setAccessToken } from "@util/AuthFunctions";
import { Button, ButtonSet, Input, Text } from "@ui/components";
import { theme } from "@ui/theme";
import { FlexBox} from "@ui/layout";


export const LoginPage = () => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [userData, setUserData] = useState({
        univId: '',
        password: '',
        domain: '@gmail.com',
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
        const {univId, password, domain} = userData;
        if (!univId || !password) {
            alert('모든 칸을 채워 주세요')
            return null;
        }
        const userEmail = univId + domain;

        requestSignIn(userEmail, password)
            .then(response => {
                if (response) {
                    setAccessToken(response);
                    navigate(ROUTES.MAIN_PAGE);
                }
            });
    }

    return (
        <>
            <FlexBox direction="column" align="unset" style ={{minWidth: '60vw'}}>
              <Text typo = {'Header_35'} style ={{marginBottom: '24px'}}>Imhere!</Text>
                <EmailArea>
                    <Input color={'background_200'} 
                      innershadow={false} 
                      height = {40}
                      placeholder="이메일"
                      value={userData.univId} onChange={handleValue}
                      name = 'univId'
                      big={false}
                    />
                    <DomainSelect className='select-domain' 
                      name='domain' 
                      placeholder='도메인 선택' 
                      value={userData.domain}
                      onChange={handleValue}>
                        <DomainOption value ="@gmail.com">@gmail.com</DomainOption>
                        <DomainOption value ="@g.hongik.ac.kr">@g.hongik.ac.kr</DomainOption>
                    </DomainSelect>
                </EmailArea>
                  <Input color={'background_200'} 
                        type={isPasswordHidden ? 'password' : 'text'}
                        innershadow={false} 
                        height = {40}
                        placeholder="비밀번호"
                        value={userData.password} onChange={handleValue}
                        name='password'
                        big={false}
                        rightImage = { <ViewButton onClick={() => setIsPasswordHidden(prevState => !prevState)}>
                                        {isPasswordHidden ? '👁️' : '🔒'}
                                        </ViewButton>}
                  />
                    <ButtonSet variant="horizontal" padding = {[10, 0]}>
                      <Button varient={'mini'} fullWidth = {true} onClick ={signUp}>회원가입</Button>
                      <Button varient="mini" fullWidth = {true} onClick ={signIn}>로그인</Button>
                    </ButtonSet>
              </FlexBox>
        </>
    )
}


const DomainSelect = styled.select`
  background-color: ${theme.palette.background_200};
  border: 1px solid transparent;
  color: ${theme.palette.main_black};
  border-radius: 0;
`
const DomainOption = styled.option`
  background-color: ${theme.palette.background_200};
  border: 1px solid transparent;
`

const EmailArea = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 60% minmax(0px, auto);
  grid-gap: 2px;
  margin-bottom : 2px;
`

const ViewButton = styled.button`
  width: 40px;
  height: 100%;
  border: none;
  background-color: transparent;
  font-size: 16px;
  justify-content: center;
  display: flex;
  align-items: center;
`;


