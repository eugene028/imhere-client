import styled from "styled-components";
import LoadingSpinner from "@components/LoadingSpinner";
import { BorderBox, FlexBox } from '@ui/layout';
import { ListElement, Text } from '@ui/components';
import { media } from '@ui/theme';
import { useResponsive } from '@lib/useResponsive';

type StudentLecturesProp = Lecture[] | null

export const StudentsLectures = ({lecturelist, title, load, onClick} : {
  lecturelist : StudentLecturesProp;
  load : Boolean;
  title: String;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
    const { isPC } = useResponsive();
    return (
        load ?
        lecturelist && lecturelist.length !== 0 ?
          <Wrapper onClick = {onClick}>
            <BorderBox fullWidth={true} padding={[10, 10]} className='border'>
              <FlexBox direction={'column'}>
                <Text typo = {isPC ? 'Header_30': 'Header_25'} style ={{margin: '25px'}}>{title}</Text>
                <LectureContainer >
                  {Object.values(lecturelist).map((lecture, index) => {
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