import {Outlet, BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import * as ROUTES from "@lib/routes";
import { LoginPage } from './page';
import { SignUpPage } from "@page/SignUpPage";
import { MainPage } from "@page/MainPage";
import { LecturesPage } from "@page/lecture";
import { EnrollmentPage } from "@page/enrollment/EnrollmentPage";
import { EnrollmentManagePage } from "@page/enrollment/manageEnrollment/EnrollmentManagePage";
import { LectureCreatePage } from "@page/lecture/lecturer/LectureCreatePage";
import { LogoutButton } from "@page/LogoutButton";
import { LectureEnrollmentDetail } from '@page/enrollment/[lectureId]';
import { AttendancePage} from '@page/attendance/AttendancePage';
import FindPassword from '@page/FindPassword';
import NoAuthLayout from '@ui/layout/NoAuthLayout';
function App () {

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
                    <Route path = "/" element = {<NoAuthLayout/>}>
                        {/*No Auth*/}
                        <Route path={ROUTES.LOGIN} element={<LoginPage /> }/>
                        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />}/>
                        <Route path={ROUTES.FIND_PASSWORD} element={<FindPassword/>}/>
                    </Route>
                    {/*Need Auth*/}
                    <Route path = "/" element = {<Layout/>}>
                        <Route path={ROUTES.MAIN_PAGE} element={ <MainPage /> }/>
                        <Route path={ROUTES.LECTURES} element={<LecturesPage />}/>
                        <Route path={ROUTES.LECTURE_CREATE} element={ <LectureCreatePage />}/>

                        <Route path={ROUTES.ENROLLMENT} element={<EnrollmentPage /> }/>
                        <Route path={ROUTES.MANAGE_ENROLLMENT} element={<EnrollmentManagePage />}/>
                        <Route path={ROUTES.MANAGE_ENROLLMENT_CLASS} element ={<LectureEnrollmentDetail/>}/>
                        <Route path={ROUTES.ATTENDANCE} element={ <AttendancePage />}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default App
