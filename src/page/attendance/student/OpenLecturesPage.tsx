import {useState, useEffect} from 'react';
import styled from "styled-components";
import * as ROUTES from "@lib/routes"
import {useNavigate} from "react-router-dom";
import {getStudentsOpenedLectures} from "@lib/api";
import {checkUserHasRole} from "@util/AuthFunctions";
import { media } from '@ui/theme';
import { FlexBox } from '@ui/layout';
import { StudentAttendance } from '@components/LectureLists';

export const OpenLecturesPage = () => {
    const [lectures, setLectures] = useState<Lecture[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUserHasRole()) {
            navigate(ROUTES.LOGIN);
            return;
        }
        
        alert('출석 이전에 미리 인터넷과 디바이스의 위치 접근을 허용해주세요.\n현재 위치와 T동 까지의 거리만 측정되고 실제 위치는 저장되지 않습니다.')
       

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
                    alert('에러 발생! 관리자에게 문의하세요');
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