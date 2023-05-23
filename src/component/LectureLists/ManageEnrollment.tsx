import styled from "styled-components";
import LoadingSpinner from "@components/LoadingSpinner";
import { BorderBox, FlexBox, Padding } from '@ui/layout';
import { ListElement, SpecialButton, Text } from '@ui/components';
import { media } from '@ui/theme';
import { useResponsive } from '@lib/hooks/useResponsive';
import { useCallback, useState } from "react";
import { BottomSheet } from "@ui/components";
import { BottomSheetLEnrollHeader, BottomSheetLEnrollContent, BottomSheetLEnrollButton } from "@components/BottomSheet";

type ManageEnrollVariant = 
| 'approve'
| 'reject'
| 'delete';

type EnrollStateType = {
    [key in ManageEnrollVariant]: {
        title: string;
        description: string;
        EnrollType: EnrollmentState;
    }
}
type StudentEnrollProp = EnrollmentInfo | null

const ENROLL_PROP : EnrollStateType = {
    'approve':{
        title: '수강신청 승인',
        description: '해당 학생을 수강 승인할까요?',
        EnrollType:'APPROVAL'
    },
    'delete' : {
        title: '수강중인 학생 삭제',
        description: '정말 해당 학생을 삭제할까요?',
        EnrollType:'REJECTION'
    },
    'reject': {
        title: '수강 학생 거부',
        description: '정말 해당 학생의 수강 신청을 거부할까요?',
        EnrollType: 'REJECTION'
    }
}

export const ManageEnrollment = ({lectureId, enroll, load, category} : {
  enroll : StudentEnrollProp;
  load : Boolean;
  category: EnrollmentState;
  lectureId: number;
}) => {
    const { isPC } = useResponsive();
    const [open, setOpen] = useState<boolean>(false);
    const [currentStudent, setCurrentStudent] = useState<StudentInfo| null>(null);
    const [enrolltype, setEnrollType] = useState<ManageEnrollVariant>('approve');
    const onClickToggleBottom = useCallback(() => {
      setOpen(!open);
    },[open]);

    enroll?.studentInfos.sort(
        function(a, b): number{
            if(a.id > b.id)
                return 1
            if (a.id === b.id){
                return 0
            }
            if(a.id < b.id) {
                return -1
            }
            return 0
        }
    )
    return (
        load ?
        enroll && enroll?.studentInfos.length !== 0 ?
          <Wrapper>
            {open && (<BottomSheet 
              setBottomOpen={onClickToggleBottom}>
                <BottomSheetLEnrollHeader header ={ENROLL_PROP[enrolltype].title}/>
                <BottomSheetLEnrollContent description={ENROLL_PROP[enrolltype].description}/>
                <BottomSheetLEnrollButton enrollmentState ={ENROLL_PROP[enrolltype].EnrollType} studentId = {currentStudent?.id}lectureId = {lectureId} setBottomOpen={onClickToggleBottom}/>
                </BottomSheet>)}
            <BorderBox fullWidth={true} padding={[10, 10]} className='border'>
              <FlexBox direction={'column'}>
                <Text typo = {isPC ? 'Header_30': 'Header_25'} style ={{margin: '25px'}}>{enroll.lectureName}</Text>
                <LectureContainer >
                    {category === 'APPROVAL' ? (
                    <>
                        {Object.values(enroll.studentInfos).filter(student => student.enrollmentState === 'APPROVAL').map((student, index) => {
                            return (
                                <FlexBox key ={index} direction="row" gap = {20} justify="center" align="baseline" style={{marginBottom: '10px'}}>
                                    <ListElement  count = {4} 
                                    key = {index} 
                                    variant={isPC ? 'PC' : 'mobile'} 
                                    elements = {student}
                                    style={{marginBottom: '20px'}}/>
                                    <Padding size ={[0, 50]}>
                                        <SpecialButton 
                                            variant="delete" 
                                            style={{height:'38px'}}
                                            onClick ={() =>{
                                                setEnrollType('delete');
                                                setCurrentStudent(student);
                                                onClickToggleBottom();
                                            }}
                                            >수강생 제거 </SpecialButton>
                                    </Padding>
                                </FlexBox>
                            )
                          })} 
                     </>):
                    (
                        <>
                        {Object.values(enroll.studentInfos).filter(student => student.enrollmentState === 'AWAIT').map((student, index) => {
                            return (
                                <FlexBox direction="row" gap = {20} justify="center" align="baseline" style={{marginBottom: '10px'}}>
                                    <ListElement  count = {4} 
                                    key = {index} 
                                    variant={isPC ? 'PC' : 'mobile'} 
                                    elements = {student}
                                    style={{marginBottom: '20px'}}/>
                                    <Padding size ={[0, 30]}>
                                        <FlexBox gap ={10}>
                                            <SpecialButton variant="inform" 
                                                style={{height:'38px'}}
                                                onClick ={() =>{
                                                    setEnrollType('approve');
                                                    setCurrentStudent(student);
                                                    onClickToggleBottom();
                                                }}
                                                >신청수락 </SpecialButton>
                                            <SpecialButton variant="delete" 
                                            style={{height:'38px'}}
                                            onClick ={() =>{
                                                setEnrollType('reject');
                                                setCurrentStudent(student);
                                                onClickToggleBottom();
                                            }}>신청거절 </SpecialButton>
                                        </FlexBox>
                                   </Padding>
                                </FlexBox>
                            )
                          })} 
                    </>  
                    )}
                </LectureContainer >
              </FlexBox>
            </BorderBox>
            </Wrapper>
            :
                 <Text typo = {'Text_SB_20'}>수강중인 학생이 없습니다.</Text>
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
  overflow-wrap:normal;
  height: 300px;
  border-radius: 5px;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;

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