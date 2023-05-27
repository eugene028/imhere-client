
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
        <Wrapper>
            {contents}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding-left: 20px;
    overflow-y: scroll;
    height: 120px;
`;