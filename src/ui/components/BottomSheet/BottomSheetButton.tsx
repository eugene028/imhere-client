import { ButtonSet } from "../ButtonSet";
import { Button } from "../Button";
import { requestEnrollment } from "@lib/api";
import { HTMLAttributes } from 'react';
import styled from "styled-components";

interface BottomSheetButtonProps {
    lecture: Lecture | null;
    setBottomOpen: () => void;
}
export const BottomSheetButton = ({lecture, setBottomOpen}: BottomSheetButtonProps) => {

    const requestCurrentLectureEnrollment = () => {
        if (!lecture) throw "lecture = null"
        requestEnrollment(lecture.lectureId)
            .then(response => {
                alert('수강신청 성공')
            })
            .finally(); //모달창 닫기
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