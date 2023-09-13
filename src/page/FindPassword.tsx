import { useState, useEffect } from "react";
import styled from "styled-components";
import {changePassword, generateVerificationNumberPassWord, verifyValidateNumber} from "../lib/api";
import {useNavigate} from 'react-router-dom';
import useToastify from "@lib/hooks/useToastify";
import * as ROUTES from "@lib/routes";
import { FlexBox, Padding } from "@ui/layout";
import { Input, Text, Button, Spacing  } from "@ui/components";
import { theme } from "@ui/theme";
import LoadingSpinner from "@components/LoadingSpinner";

export const FindPassword = () => {
    const [loading, setLoading] = useState(false)
    const [isInputValidate, setInputValidate] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [passwordData, setPasswordInputData] = useState({
        univId: '',
        password: '',
        passwordCheck: '',
        validateCode: '',
        domain: '@gmail.com',
    })
    const navigate = useNavigate();
    const { setToast } = useToastify();

    useEffect(() => {
        setToast({ comment: '비밀번호는 영문자와 숫자를 조합하여 8~20자 이내로 입력해주세요.', type: 'info' });
    }, []);

    const handleValue: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const {value, name} = event.target;
        setPasswordInputData({...passwordData, [name]: value});
    }

    const validateUserData = () => {
        const {univId, password, passwordCheck } = passwordData;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;
        const univIdRegex = /^[a-zA-Z0-9.]+$/;

        if (!univIdRegex.test(univId)) {
            setToast({ comment: '이메일 형식이 올바르지 않습니다.', type: 'warning' });
            return false;
        }

        if (!passwordRegex.test(password)) {
            setToast({ comment: '비밀번호는 영문자와 숫자를 조합하여 8~20자 이내로 입력해주세요.', type: 'warning' });
            return false;
        }

        if (password !== passwordCheck) {
            setToast({ comment: '비밀번호 확인이 일치하지 않아요.', type: 'warning' });
            return false;
        }
        return true;
    };

    const handleInputDataButton = () => {
        if (validateUserData()) {
            const {univId, domain} = passwordData;
            const email = univId + domain;
            setLoading(true)
            generateVerificationNumberPassWord(email)
                .then(response => {
                    if (response) {
                        setLoading(false)
                        setToast({ comment: '이메일로 온 인증 번호를 10분 안에 입력하세요', type: 'info' });
                        setInputValidate(true);
                    } else {
                        setLoading(false)
                    }
                });
        }
    };

    const handleSignUpButton = () => {
        const {univId, domain, password, validateCode, passwordCheck} = passwordData;
        const email = univId + domain;
        verifyValidateNumber(email, validateCode)
            .then(response => {
                if (response === true) {
                    changePassword(email, validateCode, password, passwordCheck)
                        .then(() => {
                            setToast({ comment: '비밀번호가 변경되었습니다! 로그인 해주세요', type: 'success' });
                            navigate(ROUTES.LOGIN);
                        })
                        .catch(() => {
                            setToast({ comment: '에러 발생! 관리자에게 문의해주세요.', type: 'error' });
                        })
                }
            })
            .catch(() => {
                setToast({ comment: '에러 발생! 관리자에게 문의해주세요.', type: 'error' });
            })
    }


  return (
      <Wrapper>
        {loading && <LoadingSpinner/>}
      {
        !isInputValidate ? (
          <FlexBox direction="column" align="unset" style ={{minWidth: '60vw'}}>
              <EmailArea>
                  <Input color={'background_200'} 
                      innershadow={false} height = {35}
                      placeholder="이메일" value={passwordData.univId} onChange={handleValue}
                      name = 'univId' big={false}
                  />
                  <DomainSelect className='select-domain' name='domain' placeholder='도메인 선택'
                      value={passwordData.domain} onChange={handleValue}>
                      <option><Text typo ={'Text_15'} color ={'black_200'}>@gmail.com</Text></option>
                  </DomainSelect>
              </EmailArea>
              <Input color={'background_200'} 
                  type={isPasswordHidden ? 'password' : 'text'} innershadow={false} 
                  height = {35} placeholder="새 비밀번호 입력"
                  value={passwordData.password} onChange={handleValue}
                  name='password' big={false}
                  rightImage = { <ViewButton onClick={() => setIsPasswordHidden(prevState => !prevState)}>
                              {isPasswordHidden ? '👁️' : '🔒'}
                              </ViewButton>}
                  />
              <Spacing size={2}/>
              <Input color={'background_200'} 
                  type={isPasswordHidden ? 'password' : 'text'} innershadow={false} 
                  height = {35} placeholder="새 비밀번호 확인"
                  value={passwordData.passwordCheck} onChange={handleValue}
                  name='passwordCheck' big={false}
                  rightImage = { <ViewButton onClick={() => setIsPasswordHidden(prevState => !prevState)}>
                              {isPasswordHidden ? '👁️' : '🔒'}
                              </ViewButton>}
                  />
              <Spacing size={10}/>
              <Button  onClick={handleInputDataButton}> 이메일 인증 </Button>
          </FlexBox> )
          : (
          <FlexBox direction="column" align="unset" style ={{minWidth: '60vw'}}>
              <Input color={'background_200'} 
                      innershadow={false} height = {35}
                      placeholder='메일로 온 인증 코드를 입력하세요' value={passwordData.validateCode} 
                      onChange={handleValue} name='validateCode' big={false}
                  />
                  <Padding size={[10, 0]}>
                      <Button  onClick={handleSignUpButton}> 비밀번호 변경하기 </Button>
                  </Padding>
          </FlexBox>
          )
      }
  </Wrapper>
)
}

const Wrapper = styled.div`
    position: re;
`

const EmailArea = styled.div`
  display: grid;
  grid-template-columns: 60% minmax(0px, auto);
  grid-gap: 2px;
  margin-bottom : 2px;
`

const DomainSelect = styled.select`
    background-color: ${theme.palette.background_200};
    border: 1px solid transparent;
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