import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {getStudentsLectures} from "../../../api";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import LectureRow from "./LectureRow";
import {StudentsLecturesPage} from "./StudentsLecturesPage";
import {checkAndGetUserRole} from "../../../util/AuthFunctions";
import * as ROUTES from "../../../constants/routes";
import {useNavigate} from "react-router-dom";
import {LecturerLecturesPage} from "./LecturerLecturesPage";

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
  min-width: 9.8vw;
`

const UnivIdInput = styled.input`
`

const DomainSelect = styled.select`
`

const EmailArea = styled.div`
  display: grid;
  grid-template-columns: 60% minmax(0px, auto);
`
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