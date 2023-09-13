import { ButtonSet, Button } from "@ui/components";
import styled from "styled-components";
import { changeLectureState } from "@lib/api";
import useToastify from "@lib/hooks/useToastify";

interface BottomSheetButtonProps {
    lecture: Lecture | null;
    setBottomOpen: () => void;
}
export const BottomSheetAttendanceButton = ({
    lecture, 
    setBottomOpen,
}: BottomSheetButtonProps) => {
    const { setToast } = useToastify()
    if (!lecture) return null;
    const requestLectureStateChange = async (lectureStateRequest : LectureState) => {
        
        if (lectureStateRequest && lectureStateRequest !== lecture?.lectureState) {
            await changeLectureState(lecture?.lectureId, lectureStateRequest)
                .then(response => {
                    if (response) {
                        setToast({comment: `강의 출석 번호는 ${response}입니다! 출석은 10분간 유효합니다.`, type:'info'})
                    }
                })
                .catch(error => {
                    setToast({comment: '에러 발생! 관리자에게 문의해주세요.', type:'error'})
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