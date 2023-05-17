import styled from "styled-components";
import { BottomSheetHeader } from "./BottomSheetHeader";
import { BottomSheetContent } from "./BottomSheetContent";
import { BottomSheetButton } from "./BottomSheetButton";
import { motion } from 'framer-motion';
import { useResponsive } from "@lib/hooks/useResponsive";
import useBottomSheet from '@lib/hooks/useBottomSheet';
import { media } from "@ui/theme";

interface BottomSheetProps{
    setBottomOpen: () => void;
    lecture: Lecture | null;
}

export const BottomSheet = ({lecture, setBottomOpen}: BottomSheetProps) => {
    const { sheet , content} = useBottomSheet(setBottomOpen);
    const { isPC } = useResponsive(); 
    return (
    
        <BottomSheetWrapper ref = {sheet}>
            <Overlay>
                <Wrapper ref ={content}>
                    <BottomSheetHeader header = {lecture?.lectureName}/>
                    <BottomSheetContent lecture = {lecture}/>
                    <BottomSheetButton  setBottomOpen ={setBottomOpen}lecture = {lecture}/>
                </Wrapper>
            </Overlay>
        </BottomSheetWrapper>

    )
}

const BottomSheetWrapper = styled.div`
    position: absolute;
    z-index: 1200;
    box-sizing: border-box;
`;
const Overlay = styled.div`
    position: fixed;
    inset : 0px;
    background-color : rgba(0 0 0 / 71%);
    display: flex;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    width: 100%;
    box-sizing: border-box; 
    z-index: 1500;
`;

const Wrapper = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: relative;
    bottom : 0;
    box-sizing: border-box;
    height: 100%;
    z-index: 2000;
    display: flex;
    flex-direction: column;
    padding: 16px 16px;
    background-color: white;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    @keyframes bottomsheet {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(100%-300px);
        }
    }
    animation: bottomsheet 800ms;
    transform: translateY(
        calc(100% - 300px)
    );
    ${media.pc} {
        width : 700px;
    }
    
`