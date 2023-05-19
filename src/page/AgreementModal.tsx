import React, { type ReactNode } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  -webkit-box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.75);
  
  //min-width: 60vw;
  max-width: 60vw;
  max-height: 60vh;
  
  overflow: scroll;
  pointer-events: all;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ModalTitleRow = styled.div`
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  pointer-events: all;
`;

const ModalDescriptionRow = styled.div`
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  pointer-events: all;
`;

const containerVariant = {
    initial: {top: "100%", transition: {type: "spring", damping: 10, stiffness: 500}},
    isOpen: {top: "50%"},
    exit: {top: "100%"},
};

const CloseButton = styled.button`
  position: sticky;
  top: 3%;
  margin-left: 90%;
  border-radius: 10px;
  cursor: pointer;
  background-color: transparent;
  border: black 1px solid;
  color: black;
  z-index: 10;
`;

interface AgreementModelProps {
  isOpen: boolean,
  close: React.Dispatch<React.SetStateAction<boolean>>,
  title?: ReactNode,
  contents: ReactNode
}

function AgreementModal({isOpen, close, title, contents}: AgreementModelProps) {

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <Overlay initial="initial" animate="isOpen" exit="exit">
                        <ModalContainer variants={containerVariant}>
                            <CloseButton onClick={() => close(false)}>닫기</CloseButton>
                            <ModalTitleRow>{title}</ModalTitleRow>
                            <ModalDescriptionRow> {contents} </ModalDescriptionRow>
                        </ModalContainer>
                    </Overlay>
                )
            }
        </AnimatePresence>
    );
}

export default AgreementModal;