import { useState, useEffect } from 'react';
import styled from "styled-components";
import {getLecturersOwnedLectures} from "@lib/api";
import * as ROUTES from "@lib/routes";
import { useNavigate } from "react-router-dom";
import { media } from '@ui/theme';
import { FlexBox } from '@ui/layout';
import { LecturerLectures } from '@components/LectureLists';

export const LecturerLecturesPage = () => {
    const [lectures, setLectures] = useState<Lecture[]|null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
            <FlexBox direction ={'column'}>
              <LecturerLectures title = {"강사 개설 강의 목록"} 
                lecturelist = {lectures} load ={loading} 
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