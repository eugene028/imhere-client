import React, {useEffect} from "react";
import {Outlet, BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import * as ROUTES from "./constants/routes";
import './App.css';
import {LoginPage} from "./component/page/LoginPage";
import {SignUpPage} from "./component/page/SignUpPage";
import {MainPage} from "./component/page/MainPage";
import {LecturesPage} from "./component/page/lecture";
import {EnrollmentPage} from "./component/page/enrollment/EnrollmentPage";
import {EnrollmentManagePage} from "./component/page/enrollment/manageEnrollment/EnrollmentManagePage";
import {LectureCreatePage} from "./component/page/lecture/lecturer/LectureCreatePage";
import {LogoutButton} from "./component/page/LogoutButton";
import {AttendancePage} from "./component/page/attendance";


function makeSnow() {
    const snow = document.createElement("div");
    const size = Math.random() * 4.5 + 3.5;
    snow.className = "snow";
    snow.style.width = size + "px";
    snow.style.height = size + "px";
    snow.style.left = Math.random() * window.innerWidth + "px";
    snow.style.animationDuration = Math.random() * 3 + 4.3 + "s";
    snow.style.zIndex = "-1";
    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), 8000);
}

function App () {
    useEffect(() => {
        const interval = setInterval(makeSnow, 50);
        alert('출석 이전에 미리 인터넷과 디바이스의 위치 접근을 허용해주세요.\n현재 위치와 T동 까지의 거리만 측정되고 실제 위치는 저장되지 않습니다.')
        return () => clearInterval(interval);
    }, []);

const Layout = () => {
    return (
        <>
            <LogoutButton/>
            <Outlet/>
        </>
    )
}

    return (
        <div className="App">
            <Router>
                <Routes>
                    {/*No Auth*/}
                    <Route path={ROUTES.LOGIN} element={<LoginPage /> }/>
                    <Route path={ROUTES.SIGN_UP} element={<SignUpPage />}/>

                    {/*Need Auth*/}
                    <Route path = "/" element = {<Layout/>}>
                        <Route path={ROUTES.MAIN_PAGE} element={ <MainPage /> }/>
                        <Route path={ROUTES.LECTURES} element={<LecturesPage />}/>
                        <Route path={ROUTES.LECTURE_CREATE} element={ <LectureCreatePage />}/>

                        <Route path={ROUTES.ENROLLMENT} element={<EnrollmentPage /> }/>
                        <Route path={ROUTES.MANAGE_ENROLLMENT} element={<EnrollmentManagePage />}/>

                        <Route path={ROUTES.ATTENDANCE} element={ <AttendancePage />}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App