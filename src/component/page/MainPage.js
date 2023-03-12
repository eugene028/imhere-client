import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "firebaseui";
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ChatRoom from "../ChatRoom";
import { useNavigate } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";

const LoginArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-top: 10px;
  width: 20vw;
  position: relative;
`

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
  min-width : 9.8vw;
`

// function makeSnow() {
//   const snow = document.createElement("div");
//   const size = Math.random() * 4.5 + 3.5;
//   snow.className = "snow";
//   snow.style.width = size + "px";
//   snow.style.height = size + "px";
//   snow.style.left = Math.random() * window.innerWidth + "px";
//   snow.style.animationDuration = Math.random() * 3 + 2 + "s";
//   document.body.appendChild(snow);
//   setTimeout(() => snow.remove(), 5000);
// }

export const MainPage = (props) => {
  const [isSignIn, setSignIn] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    school: '홍익대학교',
  })
  const navigate = useNavigate();

  // useEffect(() => {
  //   // const interval = setInterval(makeSnow, 40);
  //   return () => clearInterval(interval);
  // }, []);

  const handleValue = (event) => {
    const { value, name } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  const signUp = () => {
    navigate(ROUTES.SIGN_UP);
  }

  const signIn = () => {
    const { email, password } = userData;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUserData({
          email: user.email,
          school: user.displayName,
        })
        setSignIn(true);
        console.log(userData.school);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <>
      {
        isSignIn ?
          <ChatRoom initUserData={userData} />
          :
          <LoginArea>
            <input type='text' className='input-email' name='email' placeholder='이메일' value={userData.email} onChange={handleValue} />
            <input type='text' className='input-password' name='password' placeholder='비밀번호' value={userData.password} onChange={handleValue} />
            {/* <SchoolSelect className='select-school' name='school' placeholder='학교' value={userData.school} onChange={handleValue} >
              <option>홍익대학교</option>
              <option>연세대학교</option>
              <option>서강대학교</option>
              <option>이화여자대학교</option>
            </SchoolSelect> */}
            <LoginAndSignUpBox>
              <Button type='button' className='signin-button' onClick={signIn}> 로그인 </Button>
              <Button type='button' className='signup-button' onClick={signUp}> 회원가입 </Button>
            </LoginAndSignUpBox>
          </LoginArea>
      }
    </>
  )
}
