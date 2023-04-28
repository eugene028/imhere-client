import React, {useState, useEffect} from 'react';
import LoadingSpinner from "../../spinner/LoadingSpinner";
import {StudentsLecturesPage} from "./student/StudentsLecturesPage";
import {checkAndGetUserRole} from "../../../util/AuthFunctions";
import * as ROUTES from "../../../constants/routes";
import {useNavigate} from "react-router-dom";
import {LecturerLecturesPage} from "./lecturer/LecturerLecturesPage";

export const LecturesPage = () => {
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
                <StudentsLecturesPage />
                :
                <LecturerLecturesPage />
            :
            <LoadingSpinner />
    );
}