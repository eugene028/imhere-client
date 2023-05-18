import { ButtonSet, Button } from "@ui/components";
import { requestEnrollment } from "@lib/api";
import styled from "styled-components";
import { changeStudentEnrollmentState } from "@lib/api";

interface BottomSheetButtonProps {
    lectureId: number;
    setBottomOpen: () => void;
    studentId: number | undefined;
    enrollmentState: EnrollmentState;
}
export const BottomSheetLEnrollButton = ({lectureId, setBottomOpen, studentId, enrollmentState}: BottomSheetButtonProps) => {

    const requestStateChange = async () => {
        if (!lectureId) throw "enrollment = null";
        if (!studentId) throw "student = null";

        changeStudentEnrollmentState(lectureId, studentId, enrollmentState)
                .then(response => {
                    if (!response) {
                        console.log('실패 ' + lectureId + "번 강좌 " + studentId + "번 학생 " + enrollmentState + "로 변화.")
                    }
                })
                .catch(error => {
                    console.log("change error " + lectureId + ', ' + studentId + ', ' + enrollmentState + ', ' + error);
                })
        }
    
    return (
        <Wrapper>
            {enrollmentState === 'REJECTION' ? (
                 <ButtonSet variant={'horizontal'}>
                    <Button denial= {true} varient={'regular'} onClick = {() => setBottomOpen()}>취소하기</Button>
                    <Button varient={'regular'} onClick={() => {
                        requestStateChange();
                        setBottomOpen();
                        alert("해당 학생을 성공적으로 삭제하였습니다.");
                        window.location.reload();
                        }}>제거하기</Button>
                </ButtonSet>
            ): (
                <ButtonSet variant={'horizontal'}>
                    <Button denial= {true} varient={'regular'} onClick = {() => setBottomOpen()}>취소하기</Button>
                    <Button varient={'regular'} onClick={() => {
                        requestStateChange();
                        setBottomOpen();
                        alert("해당 학생을 수강 승인했습니다.");
                        window.location.reload();
                        }}>수강 승인하기</Button>
                </ButtonSet>
            )
        }   
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