import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {getStudentsEnrolledLectures} from "@lib/api";
import LoadingSpinner from "@components/spinner/LoadingSpinner";
import * as ROUTES from "@lib/routes";
import {useNavigate} from "react-router-dom";
import { BorderBox, FlexBox } from '@ui/layout';
import { ListElement, Text } from '@ui/components';
import { media } from '@ui/theme';
import { useResponsive } from '@lib/useResponsive';

export const StudentsLecturesPage = () => {
    const [lectures, setLectures] = useState<Lecture[] | null>(null);
    const [loading, setLoading] = useState(false);
    const { isPC } = useResponsive();
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
        loading ?
        lectures && lectures.length !== 0 ?
          <Wrapper>
            <BorderBox fullWidth={true} padding={[20, 10]} className='border'>
              <FlexBox direction={'column'}>
                <Text typo = {isPC ? 'Header_30': 'Header_25'} style ={{marginBottom: '40px'}}>내 강의</Text>
                <LectureContainer >
                  {Object.values(lectures).map((lecture, index) => {
                    return (
                      <ListElement  count = {3} key = {index} variant={isPC ? 'PC' : 'mobile'} elements = {lecture}/>
                    )
                  })}
                </LectureContainer >
              </FlexBox>
            </BorderBox>
            </Wrapper>
            :
                 <Text typo = {'Text_SB_20'}>수강중인 강의가 없습니다.</Text>
            :
            <LoadingSpinner/>
    );
}

const Wrapper = styled.div`
  width: 990px;
   ${media.mobile} {
        width: 90vw;
    }
`
const LectureContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  overflow-y: scroll; 

  &::-webkit-scrollbar {
    width: 0px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }

  :hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`