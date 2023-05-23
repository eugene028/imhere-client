import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as ROUTES from "@lib/routes";
import styled from "styled-components";
import { media } from "@ui/theme";
import { getLectureEnrollmentInfo } from "@lib/api";
import { changeStudentEnrollmentState } from "@lib/api";
import { ManageEnrollment } from "@components/LectureLists/ManageEnrollment";
import { FlexBox } from "@ui/layout";
import { EnrollMentTags } from "@components/Tags";



export const LectureEnrollmentDetail = () => {
    const lectureId = Number(useLocation().pathname.split('/')[3]);
    const requestMap = new Map();
    const [category, setCategory] = useState<EnrollmentState>('APPROVAL');
    const [enrollment, setEnrollment] = useState<EnrollmentInfo | null>(null);
    const navigate = useNavigate();

    const setcategory = useCallback((setcate : EnrollmentState) => {
        setCategory(setcate);
    },[category]);
    useEffect(() => {
        if (lectureId) {
            getLectureEnrollmentInfo(lectureId)
                .then(response => {
                    if (response) {
                        setEnrollment(response);
                    } else {
                        alert('에러 발생! 관리자에게 문의하세요');
                        navigate(ROUTES.MAIN_PAGE);
                    }
                })
        }

    }, []);

    const setStateChangeRequest = (studentId: number, enrollmentState: EnrollmentState): void => {
        requestMap.set(studentId, enrollmentState);
    }

    const requestStateChange = async () => {
        if (!enrollment) throw "enrollment = null"

        const lectureId = enrollment.lectureId;
        await requestMap.forEach((enrollmentState, studentId) => {
            changeStudentEnrollmentState(lectureId, studentId, enrollmentState)
                .then(response => {
                    if (!response) {
                        console.log('실패 인원 있음 ' + lectureId + "번 강좌 " + studentId + "번 학생 " + enrollmentState + "로 변화.")
                    }
                })
                .catch(error => {
                    console.log("change error " + lectureId + ', ' + studentId + ', ' + enrollmentState + ', ' + error);
                })
        })
    }
    return (
        <>
         <Wrapper>
            <FlexBox direction ={'column'}>
                <EnrollMentTags setState ={setcategory}/>
                <ManageEnrollment lectureId = {lectureId} enroll = {enrollment} load ={true} category = {category? category : 'APPROVAL'}/>
            </FlexBox>
        </Wrapper>
           
        </>
    )
}

const Wrapper = styled.div`
   width: 990px;
   ${media.mobile} {
        width: 90vw;
    }
`