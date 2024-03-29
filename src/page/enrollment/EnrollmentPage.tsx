import {useState, useEffect} from 'react';
import styled from "styled-components";
import {getAllLectures} from "@lib/api";
import {checkUserHasRole} from "@util/AuthFunctions";
import * as ROUTES from "@lib/routes";
import {useNavigate} from "react-router-dom";
import { FlexBox } from '@ui/layout';
import { StudentsEnrollment } from '@components/LectureLists';
import { media } from '@ui/theme';

export const EnrollmentPage = () => {
    const [loading, setLoading] = useState(false);
    const [lectures, setLectures] = useState<LectureInfo | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUserHasRole()) {
            navigate(ROUTES.LOGIN);
            return;
        }

        getAllLectures()
            .then(lectureList => {
                if (lectureList) {
                    setLectures((prevLectures) => {
                        if (prevLectures !== lectureList) {
                            return lectureList;
                        }
                        return prevLectures;
                    });
                } else {
                    alert('에러 발생! 관리자에게 문의하세요');
                    navigate(ROUTES.MAIN_PAGE);
                }
                setLoading(true);
            })
    }, []);

    return (
      <Wrapper>
        <FlexBox direction ={'column'}>
        <StudentsEnrollment
            lecturelist = {lectures} load ={loading} />
        </FlexBox>
    </Wrapper>
    )
}

const Wrapper = styled.div`
   width: 990px;
   ${media.mobile} {
        width: 90vw;
    }
`