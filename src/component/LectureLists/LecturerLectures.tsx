import styled from "styled-components";
import LoadingSpinner from "@components/LoadingSpinner";
import { BorderBox, FlexBox } from '@ui/layout';
import { ListElement, Text } from '@ui/components';
import { media } from '@ui/theme';
import { useState } from "react";
import { useResponsive } from '@lib/useResponsive';
import LectureModalWithStudents from "@page/lecture/lecturer/LectureModalWithStudents";

type LecturerLecturesProp = Lecture[] | null

export const LecturerLectures = ({lecturelist, title, load} : {
  lecturelist : LecturerLecturesProp;
  load : Boolean;
  title: String;
}) => {
    const { isPC } = useResponsive();
    const [currentLecture, setCurrentLecture] = useState<Lecture|null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const onClickLecture = (lecture : any) => {
        setCurrentLecture(lecture);
        setModalOpen(true);
    }

    return (
        (load && lecturelist) ? (
          lecturelist !== null && lecturelist.length !== 0 ?
            <Wrapper>
              <LectureModalWithStudents isOpen={isModalOpen} close={setModalOpen} lecture={currentLecture ? currentLecture : null} />
              <BorderBox fullWidth={true} padding={[10, 10]} className='border'>
                <FlexBox direction={'column'}>
                  <Text typo = {isPC ? 'Header_30': 'Header_25'} style ={{margin: '25px'}}>{title}</Text>
                  <LectureContainer >
                    {Object.values(lecturelist).map((lecture, index) => {
                      return (
                        <ListElement  
                          count = {3} 
                          key = {index} 
                          variant={isPC ? 'PC' : 'mobile'} 
                          elements = {lecture}
                          onClick={() => onClickLecture(lecture)}/>
                      )
                    })}
                  </LectureContainer >
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