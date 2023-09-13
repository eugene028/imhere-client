import {useState, useEffect} from 'react';
import styled from "styled-components";
import * as ROUTES from "@lib/routes"
import {useNavigate} from "react-router-dom";
import {getStudentsOpenedLectures} from "@lib/api";
import {checkUserHasRole} from "@util/AuthFunctions";
import { media } from '@ui/theme';
import { FlexBox } from '@ui/layout';
import { StudentAttendance } from '@components/LectureLists';
import useToastify from '@lib/hooks/useToastify';

export const OpenLecturesPage = () => {
    const { setToast } = useToastify();
    const [lectures, setLectures] = useState<LectureInfo>({lectureInfos:[]});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUserHasRole()) {
            navigate(ROUTES.LOGIN);
            return;
        }
        setToast({comment: '출석 전 디바이스 위치 접근을 허용해주세요. 현재 위치와 T동까지의 거리가 측정됩니다.', type:'info'})
        getStudentsOpenedLectures()
            .then(lectureList => {
                if (lectureList) {
                    setLectures((prevLectures) => {
                        if (prevLectures !== lectureList) {
                            return lectureList;
                        }
                        return prevLectures;
                    });
                } else {
                    setToast({comment: '에러 발생! 관리자에게 문의하세요.', type:'error'})
                    navigate(ROUTES.MAIN_PAGE);
                }
                setLoading(true);
            })
    }, []);

    return (
        <Wrapper>
            <FlexBox direction ={'column'}>
            <StudentAttendance 
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