import React, {useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
    snow.style.animationDuration = Math.random() * 3 + 1.5 + "s";
    snow.style.zIndex = "-1";
    document.body.appendChild(snow);
    setTimeout(() => snow.remove(), 5000);
}

function App () {
    useEffect(() => {
        const interval = setInterval(makeSnow, 20);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <Router>
                <LogoutButton>
                    <Routes>
                        {/*No Auth*/}
                        <Route path={ROUTES.LOGIN} element={<LoginPage />}/>
                        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />}/>

                        {/*Need Auth*/}
                        <Route path={ROUTES.MAIN_PAGE} element={<MainPage />}/>
                        <Route path={ROUTES.LECTURES} element={<LecturesPage />}/>
                        <Route path={ROUTES.LECTURE_CREATE} element={<LectureCreatePage />}/>

                        <Route path={ROUTES.ENROLLMENT} element={<EnrollmentPage />}/>
                        <Route path={ROUTES.MANAGE_ENROLLMENT} element={<EnrollmentManagePage />}/>

                        <Route path={ROUTES.ATTENDANCE} element={<AttendancePage />}/>
                    </Routes>
                </LogoutButton>
            </Router>
        </div>
    )
}

export default App
