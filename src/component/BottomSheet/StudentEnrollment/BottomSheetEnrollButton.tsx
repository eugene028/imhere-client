import { ButtonSet, Button } from "@ui/components";
import { requestEnrollment } from "@lib/api";
import styled from "styled-components";
import useToastify from "@lib/hooks/useToastify";

interface BottomSheetButtonProps {
    lecture: Lecture | null;
    setBottomOpen: () => void;
}
export const BottomSheetEnrollButton = ({lecture, setBottomOpen}: BottomSheetButtonProps) => {
    const { setToast } = useToastify()
    const requestCurrentLectureEnrollment = () => {
        if (!lecture) throw "lecture = null"
        requestEnrollment(lecture.lectureId)
            .then(response => {
                setToast({comment: '수강신청이 완료되었습니다. 관리자의 승인이 완료되면 수강이 가능합니다.',type:'success'})
            })
            .finally(() => {setBottomOpen()}); 
    }
    return (
        <Wrapper>
            <ButtonSet variant={'horizontal'}>
                <Button denial= {true} varient={'regular'} onClick = {() => setBottomOpen()}>취소하기</Button>
                <Button varient={'regular'} onClick={() => requestCurrentLectureEnrollment()}>수강신청하기</Button>
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