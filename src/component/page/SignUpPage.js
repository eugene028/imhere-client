import React, { useState } from "react";
import styled from "styled-components";
import { generateVerificationNumber, signUpNewMember, verifyValidateNumber } from "../../api";
import { useNavigate } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";

const SignUpArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-top: 10px;
  width: 25vw;
  position: relative;
`

const SignUpButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 10px;
  margin-top: 10px;
  width: 20vw;
`

const Button = styled.button`
  font-size: 10px;
  min-width : 25vw;
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

export const SignUpPage = () => {
  const [isInputValidate, setInputValidate] = useState(false);
  const [signUpInputData, setSignUpInputData] = useState({
    univId: '',
    password: '',
    name: '',
    validateCode: '',
    domain: '@gmail.com',
  })
  const navigate = useNavigate();

  const handleValue = (event) => {
    const { value, name } = event.target;
    setSignUpInputData({ ...signUpInputData, [name]: value });
  }

  const validateUserData = () => {
    const nameRegex = /^[가-힣]{2,4}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;
    const univIdRegex = /^[a-zA-Z0-9]+$/;
    // const gmailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
    // const gmailDomain = `@gmail.com`;
    // const hongikGmailDomain = `@g.hongik.ac.kr`;

    if (!univIdRegex.test(signUpInputData.univId)) {
      alert('이메일 형식이 올바르지 않습니다.');
      return false;
    }

    if (!passwordRegex.test(signUpInputData.password)) {
      alert('비밀번호는 영문자와 숫자를 조합하여 8~20자 이내로 입력해주세요.');
      return false;
    }

    if (!nameRegex.test(signUpInputData.name)) {
      alert('이름은 2~4글자의 한글로 입력해주세요');
      return false;
    }

    return true;
  };

  const handleInputDataButton = () => {


    if (validateUserData()) {
      // alert('통과..통과일세')
      const { univId, domain } = signUpInputData;
      const email = univId + domain;
      generateVerificationNumber(email)
        .then(response => {
          console.log(response);
          if (response) {
            setInputValidate(true);
          } else {
            alert('에러 발생!');
          }
        });
    }
  };

  const handleSignUpButton = () => {
    const { univId, domain, name, password, validateCode } = signUpInputData;
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
      .catch(() => { alert(`에러 발생! 관리자에게 문의하세요!`) })
  }


  return (
    <>
      {
        !isInputValidate ?
          <SignUpArea>
            <EmailArea>
              <UnivIdInput type='text' className='input-univId' name='univId' placeholder='이메일' value={signUpInputData.univId} onChange={handleValue} />
              <DomainSelect className='select-domain' name='domain' placeholder='도메인 선택' value={signUpInputData.domain} onChange={handleValue} >
                <option>@gmail.com</option>
                {/* <option>@g.hongik.ac.kr</option> */}
              </DomainSelect>
            </EmailArea>

            <input type='text' className='input-password' name='password' placeholder='비밀번호' value={signUpInputData.password} onChange={handleValue} />
            <input type='text' className='input-name' name='name' placeholder='이름' value={signUpInputData.name} onChange={handleValue} />
            <SignUpButtonBox>
              <Button type='button' className='input-data-button' onClick={handleInputDataButton}> 이메일 인증 </Button>
            </SignUpButtonBox>
          </SignUpArea>
          :
          <SignUpArea>
            <input type='text' className='input-validate-code' name='validateCode' placeholder='메일로 온 인증 코드를 입력하세요' value={signUpInputData.validateCode} onChange={handleValue} />
            <SignUpButtonBox>
              <Button type='button' className='signup-button' onClick={handleSignUpButton}> 회원가입 </Button>
            </SignUpButtonBox>
          </SignUpArea>
      }
    </>
  )
}