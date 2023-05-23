import styled from "styled-components";
import { motion } from 'framer-motion';
import useBottomSheet from '@lib/hooks/useBottomSheet';
import { media } from "@ui/theme";

import React from "react";

interface BottomSheetProps{
    setBottomOpen: () => void;
    lecture?: Lecture | null;
    children: React.ReactNode;
}

export const BottomSheet = ({children, setBottomOpen} : BottomSheetProps) => {
    const { sheet , content} = useBottomSheet(setBottomOpen);
    return (
        <BottomSheetWrapper ref = {sheet}>
            <Overlay>
                <Wrapper ref ={content}>
                    {children}
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
    @-webkit-keyframes moving {
        0% {
            -webkit-transform: translateY(100%);
        }
        100% {
            -webkit-transform: translateY(100%-300px);
        }
    }
    @keyframes moving {
        0% {
            -webkit-transform: translateY(100%);
        }
        100% {
            -webkit-transform: translateY(100%-300px);
        }
    }
    -webkit-animation: moving 800ms ease;
    animation: moving 800ms ease;
    animation-name: moving;
    animation-duration: 800ms;
    animation-timing-function: ease;
    
    -webkit-transform: translateY(calc(100% - 300px));
    -ms-transform: translateY(calc(100% - 300px));
    -moz-transform: translateY(calc(100% - 300px));
    -o-transform: translateY(calc(100% - 300px));
    
    transform: translateY(
        calc(100% - 300px)
    );
    ${media.pc} {
        width : 700px;
    }
    
`