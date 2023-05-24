
import styled from "styled-components"
import { Text } from "@ui/components";
export const BottomSheetAgreementContent = () => {
    return (
        <Wrapper>
            <Text typo ={'Text_20'}>강의 열기 버튼을 누르면 출석번호가 공개됩니다. 출석번호는 5분간 유효합니다.
            <br/>
강의 닫기 버튼을 누르면 출석체크가 종료됩니다. </Text>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    padding-left: 20px;
`