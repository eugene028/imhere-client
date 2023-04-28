import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {generateVerificationNumber, signUpNewMember, verifyValidateNumber} from "../../api";
import {useNavigate} from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import {checkAndGetUserRole} from "../../util/AuthFunctions";
import EnrollmentManageModal from "./enrollment/manageEnrollment/EnrollmentManageModal";
import AgreementModal from "./AgreementModal";
import {agreement1, agreement2} from "../../util/agreement";

const SignUpArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-top: 10px;
  min-width: 60vw;
  position: relative;
`

const SignUpButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 10px;
  margin-top: 10px;
  width: 100%;
`

const Button = styled.button`
  font-size: 10px;
  width: 100%;
  margin-top: 10px;
`

const AgreementArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  color: white;
  font-weight: bold;
  margin-top: 5px;

  p {
    font-size: 5px;
  }
`

const ReadButton = styled.button`
  font-size: 8px;
  background-color: transparent;
  padding: 5px;
  margin-right: 10px;
  font-weight: bold;
  color: whitesmoke;
  text-decoration: underline;
`

const UnivIdInput = styled.input`
  //min-width: 15vw;
`

const DomainSelect = styled.select`
  //min-width: 5vw;
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

export const SignUpPage = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [contents, setContents] = useState(agreement1);
    const [isInputValidate, setInputValidate] = useState(false);
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isPasswordCheckHidden, setIsPasswordCheckHidden] = useState(true);
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

    useEffect(() => {
        alert('모든 비밀번호는 단방향 암호화를 통해 암호화 되어 저장됩니다.\n비밀번호는 영문자와 숫자를 조합하여 8~20자 이내로 입력해주세요.')
    }, []);

    const handleValue = (event) => {
        const {value, name} = event.target;
        setSignUpInputData({...signUpInputData, [name]: value});
    }

    const handleCheckbox1Change = (e) => {
        setSignUpInputData({...signUpInputData, ['checkBox1']: e.target.checked});
    };

    const handleCheckbox2Change = (e) => {
        setSignUpInputData({...signUpInputData, ['checkBox2']: e.target.checked});
    };

    const validateUserData = () => {
        const {univId, password, passwordCheck, name, checkBox1, checkBox2} = signUpInputData;
        const nameRegex = /^[가-힣]{2,4}$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;
        const univIdRegex = /^[a-zA-Z0-9]+$/;
        // const gmailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
        // const gmailDomain = `@gmail.com`;
        // const hongikGmailDomain = `@g.hongik.ac.kr`;

        if (!univIdRegex.test(univId)) {
            alert('이메일 형식이 올바르지 않습니다.');
            return false;
        }

        if (!passwordRegex.test(password)) {
            alert('비밀번호는 영문자와 숫자를 조합하여 8~20자 이내로 입력해주세요.');
            return false;
        }

        if (password !== passwordCheck) {
            alert('비밀번호와 비밀번호 확인 입력이 다릅니다.');
            return false;
        }

        if (!nameRegex.test(name)) {
            alert('이름은 2~4글자의 한글로 입력해주세요');
            return false;
        }

        if (!checkBox1) {
            alert('이용 약관을 읽고 동의해주세요');
            return false;
        }

        if (!checkBox2) {
            alert('개인정보수집/이용 동의 약관을 읽고 동의해주세요');
            return false;
        }

        return true;
    };

    const handleInputDataButton = () => {
        if (validateUserData()) {
            alert('이메일로 온 가입 인증 번호를 10분 안에 입력하세요\n 입력시 이용 약관과 개인정보수집/이용 약관에 동의하는 것으로 간주됩니다.')
            const {univId, domain} = signUpInputData;
            const email = univId + domain;
            generateVerificationNumber(email)
                .then(response => {
                    if (response) {
                        setInputValidate(true);
                    } else {
                        alert('에러 발생!');
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
                            alert('회원가입 해주셔서 감사합니다. 로그인 해주세요');
                            navigate(ROUTES.LOGIN);
                        })
                        .catch(() => {
                            alert(`에러 발생! 관리자에게 문의하세요!`)
                        })
                } else {
                    alert(`인증 번호가 다릅니다! 인증번호 : ${validateCode}`);
                }
            })
            .catch(() => {
                alert(`에러 발생! 관리자에게 문의하세요!`)
            })
    }


    return (
        <>
            {
                !isInputValidate ?
                    <SignUpArea>
                        <AgreementModal isOpen={isModalOpen} close={setModalOpen} contents={contents}/>
                        <EmailArea>
                            <UnivIdInput type='text' className='input-univId' name='univId' placeholder='이메일'
                                         value={signUpInputData.univId} onChange={handleValue}/>
                            <DomainSelect className='select-domain' name='domain' placeholder='도메인 선택'
                                          value={signUpInputData.domain} onChange={handleValue}>
                                <option>@gmail.com</option>
                            </DomainSelect>
                        </EmailArea>

                        <PasswordInputContainer>
                            <PasswordInput type={isPasswordHidden ? 'password' : 'text'} className='input-password' name='password' placeholder='비밀번호' value={signUpInputData.password} onChange={handleValue}/>
                            <ViewButton onClick={() => setIsPasswordHidden(prevState => !prevState)}>
                                {isPasswordHidden ? '👁️' : '🔒'}
                            </ViewButton>
                        </PasswordInputContainer>

                        <PasswordInputContainer>
                            <PasswordInput type={isPasswordCheckHidden ? 'password' : 'text'} className='input-password-check' name='passwordCheck' placeholder='비밀번호 확인' value={signUpInputData.passwordCheck} onChange={handleValue}/>
                            <ViewButton onClick={() => setIsPasswordCheckHidden(prevState => !prevState)}>
                                {isPasswordCheckHidden ? '👁️' : '🔒'}
                            </ViewButton>
                        </PasswordInputContainer>

                        <input type='text' className='input-name' name='name' placeholder='이름'
                               value={signUpInputData.name} onChange={handleValue}/>
                        <SignUpButtonBox>
                            <AgreementArea>
                                <p> 이용 약관을 충분히 읽어 보았으며 이에 동의합니다. </p>
                                <div>
                                    <ReadButton onClick={() => {
                                        setModalOpen(true)
                                        setContents(agreement1);
                                    }}> 이용약관 읽기 </ReadButton>

                                    <input type="checkbox" name='checkBox1' checked={signUpInputData.checkBox1}
                                           onChange={handleCheckbox1Change}/>
                                </div>
                            </AgreementArea>
                            <AgreementArea>
                                <p> 개인정보수집/이용 동의 약관을 충분히 읽어 보았으며 이에 동의합니다. </p>
                                <div>
                                    <ReadButton onClick={() => {
                                        setModalOpen(true)
                                        setContents(agreement2)
                                    }}> 개인정보수집/이용약관 읽기 </ReadButton>
                                    <input type="checkbox" name='checkBox2' checked={signUpInputData.checkBox2}
                                           onChange={handleCheckbox2Change}/>
                                </div>
                            </AgreementArea>

                            <Button type='button' className='input-data-button' onClick={handleInputDataButton}> 이메일
                                인증 </Button>
                        </SignUpButtonBox>
                    </SignUpArea>
                    :
                    <SignUpArea>
                        <input type='text' className='input-validate-code' name='validateCode'
                               placeholder='메일로 온 인증 코드를 입력하세요' value={signUpInputData.validateCode}
                               onChange={handleValue}/>
                        <SignUpButtonBox>
                            <Button type='button' className='signup-button' onClick={handleSignUpButton}> 회원가입 </Button>
                        </SignUpButtonBox>
                    </SignUpArea>
            }
        </>
    )
}