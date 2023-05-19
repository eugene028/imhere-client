import {  useState, useEffect } from 'react';
import {getStudentsEnrolledLectures} from "@lib/api";
import * as ROUTES from "@lib/routes";
import {useNavigate} from "react-router-dom";
import { StudentsLectures } from '@components/LectureLists';
import { FlexBox } from '@ui/layout';
import { StudentsTags } from '@components/Tags';
import styled from 'styled-components';
import { media } from '@ui/theme';


export const StudentsLecturesPage = () => {
    const [lectures, setLectures] = useState<Lecture[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        getStudentsEnrolledLectures()
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
        <FlexBox direction ={'column'}>
          <StudentsTags/>
          <StudentsLectures title ={"내 강의"} 
            lecturelist = {lectures} 
            load ={loading}
          />
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