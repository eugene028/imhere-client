import React, {useState, useEffect} from 'react';
import LoadingSpinner from "../../spinner/LoadingSpinner";
import {checkAndGetUserRole} from "../../../util/AuthFunctions";
import * as ROUTES from "../../../constants/routes";
import {useNavigate} from "react-router-dom";
import {OpenLecturesPage} from "./student/OpenLecturesPage";
import {LecturerAttendancePage} from "./LecturerAttendancePage";

export const AttendancePage = () => {
    const [role, setRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const role = checkAndGetUserRole();
        if (!role) {
            navigate(ROUTES.LOGIN);
        } else {
            setRole(role);
        }
    }, []);

    return (
        role ?
            role === 'ROLE_STUDENT'
                ?
                <OpenLecturesPage/>
                :
                <LecturerAttendancePage/>
            :
            <LoadingSpinner/>
    );
}