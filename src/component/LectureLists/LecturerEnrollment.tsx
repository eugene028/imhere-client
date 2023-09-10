import styled from "styled-components";
import LoadingSpinner from "@components/LoadingSpinner";
import { BorderBox, FlexBox } from '@ui/layout';
import { ListElement, Text } from '@ui/components';
import { media } from '@ui/theme';
import { useResponsive } from '@lib/hooks/useResponsive';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LecturerLecturesProp = LectureInfo | null

export const LecturerEnrollment = ({lecturelist, load} : {
  lecturelist : LecturerLecturesProp;
  load : Boolean;
}) => {
    const navigate = useNavigate();
    const { isPC } = useResponsive();
    const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const onClickEnrollment = (lecture : any) => {
      setCurrentLecture(lecture);
      setModalOpen(true);
    }

    lecturelist?.lectureInfos.sort(
      function(a, b): number{
          if(a.lectureId > b.lectureId)
              return 1
          if (a.lectureId === b.lectureId){
              return 0
          }
          if(a.lectureId< b.lectureId) {
              return -1
          }
          return 0
      }
  )
    return (
        load ?
        lecturelist && lecturelist.lectureInfos.length !== 0 ?
          <Wrapper>
            <BorderBox fullWidth={true} padding={[10, 10]} className='border'>
              <FlexBox direction={'column'}>
                <Text typo = {isPC ? 'Header_30': 'Header_25'} style ={{margin: '25px'}}> 강의 목록</Text>
                <LectureContainer >
                  {lecturelist.lectureInfos.map((lecture, index) => {
                    return (
                      <ListElement  count = {3} 
                        key = {index} 
                        variant={isPC ? 'PC' : 'mobile'} 
                        elements = {lecture}
                        onClick={() => {
                          onClickEnrollment(lecture);
                          navigate(`/enrollment/manage/${lecture.lectureId}`, {state: {lectureId : lecture.lectureId}})
                      }}/>
                    )
                  })}
                </LectureContainer >
              </FlexBox>
            </BorderBox>
            </Wrapper>
            :
                 <Text typo = {'Text_SB_20'}>강의중인 강의가 없습니다.</Text>
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
  border-radius: 5px;
  max-height: 50vh;
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  overflow-y: scroll; 
  padding: 10px;

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
`