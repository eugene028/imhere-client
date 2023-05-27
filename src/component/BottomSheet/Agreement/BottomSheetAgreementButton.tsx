import { ButtonSet, Button } from "@ui/components";
import { requestEnrollment } from "@lib/api";
import styled from "styled-components";

interface BottomSheetButtonProps {
    setBottomOpen: () => void;
}
export const BottomSheetAgreementButton = ({setBottomOpen}: BottomSheetButtonProps) => {
    return (
        <Wrapper>
            <Button varient={'regular'} onClick = {() => setBottomOpen()}>확인 완료</Button>  
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    position: fixed;
    right: 0;
    top: 220px;
    padding: 20px;
    z-index: 2500;
    width: 100%;
    box-sizing: border-box;
`