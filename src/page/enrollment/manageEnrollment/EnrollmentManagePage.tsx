import { useState, useEffect } from 'react';
import styled from "styled-components";
import { media } from '@ui/theme';
import * as ROUTES from "@lib/routes";
import {useNavigate} from "react-router-dom";
import {checkUserHasRole} from "@util/AuthFunctions";
import { FlexBox } from '@ui/layout';
import { LecturerEnrollment } from '@components/LectureLists/LecturerEnrollment';
import { getLecturersOwnedLectures } from '@lib/api';

export const EnrollmentManagePage = () => {
    const [lectures, setLectures] = useState<Lecture[] | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUserHasRole(['ROLE_ADMIN', 'ROLE_LECTURER'])) {
            navigate(ROUTES.LOGIN);
            return;
        }

        getLecturersOwnedLectures()
            .then(lectureList => {
                if (lectureList) {
                    setLectures(lectureList);
                } else {
                    alert('에러 발생! 관리자에게 문의하세요');
                    navigate(ROUTES.MAIN_PAGE);
                }
                setLoading(true);
            })
    }, []);

    return (
        <Wrapper>
          <FlexBox direction={'column'}>
            <LecturerEnrollment
              lecturelist={lectures} load = {loading}/>
          </FlexBox>
        </Wrapper>
    );
}


const Wrapper = styled.div`
   width: 990px;
   ${media.mobile} {
        width: 90vw;
    }
`