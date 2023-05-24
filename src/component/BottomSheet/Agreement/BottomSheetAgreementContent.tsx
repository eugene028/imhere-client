
import styled from "styled-components"
import { Text, Button } from "@ui/components";
import { ReactNode } from "react";
import { FlexBox } from "@ui/layout";

interface BottomSheetAgreementProps {
    contents: ReactNode;
    setBottomOpen: () => void;
}
export const BottomSheetAgreementContent = ({contents, setBottomOpen} : BottomSheetAgreementProps) => {
    return (
        <FlexBox>
            <Wrapper>
                <Text typo ={'Text_20'}>{contents}</Text>
            </Wrapper>
            <BtnWrapper>
                <Button varient={'regular'} onClick = {() => setBottomOpen()}>확인 완료</Button>  
            </BtnWrapper>
        </FlexBox>
        
    )
}

const Wrapper = styled.div`
    padding-left: 20px;
`

const BtnWrapper = styled.div`
    position: fixed;
    right: 0;
    top: 220px;
    z-index: 2500;
    width: 100%;
    box-sizing: border-box;
`