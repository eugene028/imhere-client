import styled from "styled-components";
import LoadingSpinner from "@components/LoadingSpinner";
import { BorderBox, FlexBox } from '@ui/layout';
import { BottomSheet, ListElement, Text } from '@ui/components';
import { media } from '@ui/theme';
import { useState, useCallback } from "react";
import { useResponsive } from '@lib/hooks/useResponsive';
import { BottomSheetSAttendanceHeader, BottomSheetSAttendanceContent} from "@components/BottomSheet";
type StudentLecturesProp = LectureInfo | null

export const StudentAttendance = ({lecturelist, load} : {
  lecturelist : StudentLecturesProp;
  load : Boolean;
}) => {
    const { isPC } = useResponsive();
    const [currentLecture, setCurrentLecture] = useState<Lecture|null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const onClickLecture = (lecture : any) => {
        setCurrentLecture(lecture);
    };

    const onClickToggleBottom = useCallback(() => {
      setOpen(!open);
    },[open]) 

    return (
        load ?
        lecturelist && lecturelist.lectureInfos.length !== 0 ?
          <Wrapper>
            {open && (<BottomSheet setBottomOpen={onClickToggleBottom}>
                <BottomSheetSAttendanceHeader header ={currentLecture?.lectureName}/>
                <BottomSheetSAttendanceContent lecture = {currentLecture} setBottomOpen={onClickToggleBottom}/>
            </BottomSheet>)}
            <BorderBox fullWidth={true} padding={[10, 10]} className='border'>
              <FlexBox direction={'column'}>
                <Text typo = {isPC ? 'Header_30': 'Header_25'} style ={{margin: '25px'}}>출석 체크 가능 강좌 목록</Text>
                <LectureContainer >
                  {lecturelist.lectureInfos.map((lecture, index) => {
                    return (
                      <ListElement  
                        count = {3} 
                        key = {index} 
                        variant={isPC ? 'PC' : 'mobile'} 
                        elements = {lecture}
                        onClick={() => {
                          onClickLecture(lecture);
                          onClickToggleBottom();}}/>
                    )
                  })}
                </LectureContainer >
              </FlexBox>
            </BorderBox>
            </Wrapper>
            :
                 <Text typo = {'Text_SB_20'}>현재 출석 가능한 수업이 없습니다.</Text>
            :
            <LoadingSpinner/>
    );
}

const Wrapper = styled.div`
  width: 990px;
   ${media.mobile} {
        width: 90vw;
    }
  position: relative;
`
const LectureContainer = styled.div`
  width: 100%;
  height : 60px;
  border-radius: 5px;
  max-height: 50vh;
  gap: 8px;
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