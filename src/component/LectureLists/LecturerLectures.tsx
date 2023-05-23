import styled from "styled-components";
import LoadingSpinner from "@components/LoadingSpinner";
import { BorderBox, FlexBox } from '@ui/layout';
import { ListElement, Text, SpecialButton, BottomSheet } from '@ui/components';
import { media } from '@ui/theme';
import { useState } from "react";
import { useResponsive } from '@lib/hooks/useResponsive';
import { BsCheckCircleFill} from 'react-icons/bs';
import { LectureStatus } from "@components/LectureStatus";
import { useNavigate } from "react-router-dom";
import * as ROUTES from "@lib/routes";
import { useEffect, useCallback } from "react";
import { BottomSheetAttendanceButton, BottomSheetAttendanceContent, BottomSheetAttendanceHeader } from "@components/BottomSheet";

type LecturerLecturesProp = Lecture[] | null

export const LecturerLectures = ({lecturelist, title, load} : {
  lecturelist : LecturerLecturesProp;
  load : Boolean;
  title: String;
}) => {
    const navigate = useNavigate();
    const { isPC } = useResponsive();
    const [currentLecture, setCurrentLecture] = useState<Lecture|null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const onClickLecture = (lecture : any) => {
        setCurrentLecture(lecture);
    }
    const onClickToggleBottom = useCallback(() => {
      setOpen(!open);
    },[open]) 

    const navigateAttendancePage = (lecture : any) => {
      if (!lecture) {
        return
      }
      else{
        navigate(ROUTES.ATTENDANCE, { state : { lectureId : lecture.lectureId, lectureName : lecture.lectureName } });
      } 
    }

    useEffect(() => {
    }, [open]);


    return (
        (load && lecturelist) ? (
          lecturelist !== null && lecturelist.length !== 0 ?
            <Wrapper>
              {open && (<BottomSheet setBottomOpen={onClickToggleBottom}>
                <BottomSheetAttendanceHeader header = {currentLecture?.lectureName}/>
                <BottomSheetAttendanceContent/>
                <BottomSheetAttendanceButton  setBottomOpen={onClickToggleBottom} lecture = {currentLecture} />
              </BottomSheet>)}
              <BorderBox fullWidth={true} padding={[10, 10]} className='border'>
                <FlexBox direction={'column'} fullWidth={true}>
                  <Text typo = {isPC ? 'Header_30': 'Header_25'} style ={{margin: '25px'}}>{title}</Text>
                  <FlexBox fullWidth = {true} gap = {20} style={{marginRight: '50px'}} >
                      {Object.values(lecturelist).map((lecture, index) => {
                        return (
                          <div key={index} style ={{width: '100%'}}>
                            <LectureContainer>
                            <ListElement  
                              count = {3} 
                              key = {index} 
                              variant={isPC ? 'PC' : 'mobile'} 
                              elements = {lecture}
                              onClick={() => {
                                onClickLecture(lecture);
                                onClickToggleBottom();}}/>
                            </LectureContainer >
                              <SpecialButton onClick={() => navigateAttendancePage(lecture)} >
                              <FlexBox gap ={10}>
                                <BsCheckCircleFill/>
                                출석부 확인하기
                              </FlexBox>
                            </SpecialButton>
                            <LectureStatus status={lecture?.lectureState}/>
                          </div>
                        )
                      })}
                    </FlexBox>
                </FlexBox>
              </BorderBox>
              </Wrapper>
            :
                 <Text typo = {'Text_SB_20'}>강의중인 강의가 없습니다.</Text>
            )
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