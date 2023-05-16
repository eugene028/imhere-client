import styled from "styled-components";
import { BottomSheetHeader } from "./BottomSheetHeader";
import { BottomSheetContent } from "./BottomSheetContent";
import { FlexBox } from "@ui/layout";
export const BottomSheet = () => {
    return (
        <Wrapper>
                <BottomSheetHeader/>
                <BottomSheetContent/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    z-index: 101;
    display: flex;
    flex-direction: column;
    padding: 16px 16px;
    background-color: white;
    color: #444444;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    box-shadow: 0 -2px 8px 0 rgba(136, 136, 136, 0.3);

    transition: transform 800ms;
    transform: translateY(
        calc(100% - 200px)
    );
`