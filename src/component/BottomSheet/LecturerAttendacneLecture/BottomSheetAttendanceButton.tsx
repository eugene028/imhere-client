import { ButtonSet, Button } from "@ui/components";
import styled from "styled-components";
import { changeLectureState } from "@lib/api";

interface BottomSheetButtonProps {
    lecture: Lecture | null;
    setBottomOpen: () => void;
}
export const BottomSheetAttendanceButton = ({
    lecture, 
    setBottomOpen,
}: BottomSheetButtonProps) => {
    
    if (!lecture) return null;
    const requestLectureStateChange = async (lectureStateRequest : LectureState) => {
        
        if (lectureStateRequest && lectureStateRequest !== lecture?.lectureState) {
            await changeLectureState(lecture?.lectureId, lectureStateRequest)
                .then(response => {
                    if (response) {
                        alert('강의 출석 번호는 ' + response + '입니다! 잊지 마세요!!\n' +
                            '출석 번호는 5분간 유효합니다!');
                    }
                })
                .catch(error => {
                    alert('에러가 발생했습니다 관리자에게 문의하세요 ' + error);
                })
        }
    }
    return (
        <Wrapper>
            <ButtonSet variant={'horizontal'}>
                <Button  denial= {true} varient={'regular'} onClick={() => {
                                    requestLectureStateChange('CLOSED')
                                        .finally(() => {
                                                setBottomOpen();
                                                })}}>강의 닫기</Button>
                <Button varient={'regular'} onClick={() => {
                                    requestLectureStateChange('OPEN')
                                        .finally(() => {
                                                setBottomOpen();
                                                })}}>강의 열기</Button>
            </ButtonSet>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    position: fixed;
    right: 0;
    top: 220px;
    z-index: 2500;
    width: 100%;
    box-sizing: border-box;
`