
import styled from "styled-components"
import { Text } from "../Text"
export const BottomSheetContent = ({lecture} : {lecture: Lecture|null}) => {


    return (
        <Wrapper>
            <Text typo ={'Text_20'}>실제로 수강중인 강의만 신청해주세요:)</Text>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    padding-left: 10px;
`