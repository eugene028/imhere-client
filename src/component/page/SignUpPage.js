import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
import { generateVerificationNumber } from "../../api";

const SignUpArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-top: 10px;
  width: 20vw;
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
  min-width : 20vw;
`

export const SignUpPage = () => {
  const [isInputValidate, setInputValidate] = useState(false);
  const [signUpInputData, setSignUpInputData] = useState({
    email: '',
    password: '',
    name: '',
    validtaeCode: '',
  })

  const handleValue = (event) => {
    const { value, name } = event.target;
    setSignUpInputData({ ...signUpInputData, [name]: value });
  }

  const validateUserData = () => {
    const nameRegex = /^[가-힣]{2,4}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/;
    const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;

    if (!emailRegex.test(signUpInputData.email)) {
      alert('이메일 형식이 올바르지 않습니다. (예: example@gmail.com)');
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
      const { email, password, name } = signUpInputData;
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

  }


  return (
    <>
      {
        !isInputValidate ?
          <SignUpArea>
            <input type='text' className='input-email' name='email' placeholder='지메일 (@gmail.com)' value={signUpInputData.email} onChange={handleValue} />
            <input type='text' className='input-password' name='password' placeholder='비밀번호' value={signUpInputData.password} onChange={handleValue} />
            <input type='text' className='input-name' name='name' placeholder='이름' value={signUpInputData.name} onChange={handleValue} />
            <SignUpButtonBox>
              <Button type='button' className='input-data-button' onClick={handleInputDataButton}> 이메일 인증 </Button>
            </SignUpButtonBox>
          </SignUpArea>
          :
          <SignUpArea>
            <input type='text' className='input-validtae-code' name='validtae-code' placeholder='메일로 온 인증 코드를 입력하세요' value={signUpInputData.validtaeCode} onChange={handleValue} />
            <SignUpButtonBox>
              <Button type='button' className='signup-button' onClick={handleSignUpButton}> 회원가입 </Button>
            </SignUpButtonBox>
          </SignUpArea>
      }
    </>

  )
}