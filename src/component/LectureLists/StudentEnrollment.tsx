import styled from "styled-components";
import LoadingSpinner from "@components/LoadingSpinner";
import { BorderBox, FlexBox } from '@ui/layout';
import { ListElement, Text } from '@ui/components';
import { media } from '@ui/theme';
import { useResponsive } from '@lib/hooks/useResponsive';

import { useCallback, useState } from "react";
import { BottomSheet } from "@ui/components";
import { BottomSheetEnrollHeader, BottomSheetEnrollContent, BottomSheetEnrollButton } from "@components/BottomSheet";


type StudentLecturesProp = LectureInfo | null

export const StudentsEnrollment = ({lecturelist, load} : {
  lecturelist : StudentLecturesProp;
  load : Boolean;
}) => {
    const { isPC } = useResponsive();
    const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const onClickEnrollment = (lecture : any) => {
      setCurrentLecture(lecture);
    }

    const onClickToggleBottom = useCallback(() => {
      setOpen(!open);
    },[open]) 

    return (
        load ?
        lecturelist && lecturelist.lectureInfos.length !== 0 ?
          <Wrapper>
            {open && (<BottomSheet 
              setBottomOpen={onClickToggleBottom}>
                <BottomSheetEnrollHeader header ={currentLecture?.lectureName}/>
                <BottomSheetEnrollContent/>
                <BottomSheetEnrollButton lecture = {currentLecture ? currentLecture : null} setBottomOpen={onClickToggleBottom}/>
                </BottomSheet>)}
            <BorderBox fullWidth={true} padding={[10, 10]} className='border'>
              <FlexBox direction={'column'}>
                <Text typo = {isPC ? 'Header_30': 'Header_25'} style ={{margin: '25px'}}>개설 강의 목록</Text>
                <LectureContainer >
                  {lecturelist.lectureInfos.map((lecture, index) => {
                    return (
                      <ListElement  count = {3} 
                        key = {index} 
                        variant={isPC ? 'PC' : 'mobile'} 
                        elements = {lecture}
                        onClick={() => {
                          onClickEnrollment(lecture);
                          onClickToggleBottom();
                        }}/>
                    )
                  })}
                </LectureContainer >
              </FlexBox>
            </BorderBox>
            </Wrapper>
            :
                 <Text typo = {'Text_SB_20'}>개설된 강의가 없습니다.</Text>
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
  height : 60px;
  border-radius: 5px;
  max-height: 50vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
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