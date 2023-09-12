import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {generateVerificationNumber, signUpNewMember, verifyValidateNumber} from "../lib/api";
import {useNavigate} from 'react-router-dom';
import useToastify from "@lib/hooks/useToastify";
import * as ROUTES from "@lib/routes";
import {agreement1, agreement2} from "@util/agreement";
import { FlexBox, Padding } from "@ui/layout";
import { Input, Text, Button, Spacing, BottomSheet } from "@ui/components";
import { theme } from "@ui/theme";
import { BottomSheetAgreementButton, BottomSheetAgreementContent, BottomSheetAgreementHeader } from '@components/BottomSheet/Agreement';
import LoadingSpinner from "@components/LoadingSpinner";

export const SignUpPage = () => {
    const [contents, setContents] = useState(agreement1);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState<boolean>(false);
    const [isInputValidate, setInputValidate] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [signUpInputData, setSignUpInputData] = useState({
        univId: '',
        password: '',
        passwordCheck: '',
        name: '',
        validateCode: '',
        domain: '@gmail.com',
        checkBox1: false,
        checkBox2: false,
    })
    const navigate = useNavigate();
    const { setToast } = useToastify();

    const onClickToggleBottom = useCallback(() => {
        setOpen(!open);
      },[open]) 

    useEffect(() => {
        setToast({ comment: '비밀번호는 영문자와 숫자를 조합하여 8~20자 이내로 입력해주세요.', type: 'info' });
    }, []);

    const handleValue: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const {value, name} = event.target;
        setSignUpInputData({...signUpInputData, [name]: value});
    }

    const handleCheckbox1Change: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSignUpInputData({...signUpInputData, 'checkBox1': e.target.checked});
    };

    const handleCheckbox2Change: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSignUpInputData({...signUpInputData, 'checkBox2': e.target.checked});
    };

    const validateUserData = () => {
        const {univId, password, passwordCheck, name, checkBox1, checkBox2} = signUpInputData;
        const nameRegex = /^[가-힣]{2,4}$/;
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

        if (!nameRegex.test(name)) {
            setToast({ comment: '2~4글자의 한글 실명을 입력해주세요.', type: 'warning' });
            return false;
        }

        if (!checkBox1) {
            setToast({ comment: '이용 약관을 읽고 동의해주세요', type: 'warning' });
            return false;
        }

        if (!checkBox2) {
            setToast({ comment: '개인정보수집/이용 동의 약관을 읽고 동의해주세요', type: 'warning' });
            return false;
        }
        return true;
    };

    const handleInputDataButton = () => {
        if (validateUserData()) {
            const {univId, domain} = signUpInputData;
            const email = univId + domain;
            setLoading(true)
            generateVerificationNumber(email)
                .then(response => {
                    if (response) {
                        setLoading(false)
                        setToast({ comment: '이메일로 온 가입 인증 번호를 10분 안에 입력하세요', type: 'info' });
                        setInputValidate(true);
                    } else {
                        setLoading(false)
                    }
                });
        }
    };

    const handleSignUpButton = () => {
        const {univId, domain, name, password, validateCode} = signUpInputData;
        const email = univId + domain;
        verifyValidateNumber(email, validateCode)
            .then(response => {
                if (response === true) {
                    // univID로 들어감에 유의
                    signUpNewMember(univId, name, password)
                        .then(() => {
                            setToast({ comment: '회원가입 해주셔서 감사합니다. 로그인 해주세요', type: 'info' });
                            navigate(ROUTES.LOGIN);
                        })
                        .catch(() => {
                            setToast({ comment: '에러 발생! 관리자에게 문의해주세요.', type: 'error' });
                        })
                } else {
                    setToast({ comment: '인증 번호가 달라요', type: 'error' });
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
              {open && (<BottomSheet setBottomOpen={onClickToggleBottom}>
                  <BottomSheetAgreementHeader/>
                  <BottomSheetAgreementContent contents={contents} setBottomOpen={onClickToggleBottom}/>
                  <BottomSheetAgreementButton setBottomOpen={onClickToggleBottom}/>
              </BottomSheet>)}
              <EmailArea>
                  <Input color={'background_200'} 
                      innershadow={false} height = {35}
                      placeholder="이메일" value={signUpInputData.univId} onChange={handleValue}
                      name = 'univId' big={false}
                  />
                  <DomainSelect className='select-domain' name='domain' placeholder='도메인 선택'
                      value={signUpInputData.domain} onChange={handleValue}>
                      <option><Text typo ={'Text_15'} color ={'black_200'}>@gmail.com</Text></option>
                  </DomainSelect>
              </EmailArea>
              <Input color={'background_200'} 
                  type={isPasswordHidden ? 'password' : 'text'} innershadow={false} 
                  height = {35} placeholder="비밀번호"
                  value={signUpInputData.password} onChange={handleValue}
                  name='password' big={false}
                  rightImage = { <ViewButton onClick={() => setIsPasswordHidden(prevState => !prevState)}>
                              {isPasswordHidden ? '👁️' : '🔒'}
                              </ViewButton>}
                  />
              <Spacing size={2}/>
              <Input color={'background_200'} 
                  type={isPasswordHidden ? 'password' : 'text'} innershadow={false} 
                  height = {35} placeholder="비밀번호 확인"
                  value={signUpInputData.passwordCheck} onChange={handleValue}
                  name='passwordCheck' big={false}
                  rightImage = { <ViewButton onClick={() => setIsPasswordHidden(prevState => !prevState)}>
                              {isPasswordHidden ? '👁️' : '🔒'}
                              </ViewButton>}
                  />
              <Spacing size={2}/>
              <Input color={'background_200'} 
                      innershadow={false} height = {35}
                      placeholder="이름" value={signUpInputData.name} onChange={handleValue}
                      name = 'name' big={false}
              />
              <Padding size={[10, 0]}>
                  <FlexBox justify="space-between">
                      <Text typo ='Text_10'>이용 약관을 충분히 읽어 보았으며 이에 동의합니다. </Text>
                      <FlexBox>
                          <ReadButton onClick={() => {
                              setOpen(true)
                              setContents(agreement1);
                          }}> 이용약관</ReadButton>
                          <input type="checkbox" name='checkBox1' checked={signUpInputData.checkBox1}
                                  onChange={handleCheckbox1Change}/>
                      </FlexBox>
                  </FlexBox>
                  <FlexBox justify="space-between" align="center">
                      <Text typo ='Text_10'>개인정보수집/이용 동의 약관을 충분히 읽었으며 동의합니다. </Text>
                      <FlexBox>
                          <ReadButton onClick={() => {
                              setOpen(true)
                              setContents(agreement2)
                          }}> 개인정보약관</ReadButton>
                          <input type="checkbox" name='checkBox2' checked={signUpInputData.checkBox2}
                                  onChange={handleCheckbox2Change}/>
                      </FlexBox>
                  </FlexBox>
              </Padding>
              <Button  onClick={handleInputDataButton}> 이메일 인증 </Button>
          </FlexBox> )
          : (
          <FlexBox direction="column" align="unset" style ={{minWidth: '60vw'}}>
              <Input color={'background_200'} 
                      innershadow={false} height = {35}
                      placeholder='메일로 온 인증 코드를 입력하세요' value={signUpInputData.validateCode} 
                      onChange={handleValue} name='validateCode' big={false}
                  />
                  <Padding size={[10, 0]}>
                      <Button  onClick={handleSignUpButton}> 회원가입 </Button>
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


const ReadButton = styled.button`
  font-size: 8px;
  background-color: transparent;
  padding: 5px;
  margin-right: 10px;
  color: ${theme.palette.main_blue};
  text-decoration: underline;
`
