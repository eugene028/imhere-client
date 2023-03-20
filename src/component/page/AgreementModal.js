import React, {useEffect} from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion/dist/framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  -webkit-box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 2px 2px 11px 0px rgba(50, 50, 50, 0.75);
  
  min-width: 60vw;
  max-height: 60vh;
  
  overflow: scroll;
  pointer-events: all;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  pointer-events: all;
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
  position: absolute;
  right: 2%;
  top: 3%;
  border-radius: 10px;
  cursor: pointer;
  background-color: white;
  border: black 1px solid;
  color: black;
  z-index: 1000;
`;

function AgreementModal({isOpen, close, title, contents}) {

    return (
        <AnimatePresence>
            {
                isOpen && (
                    <Overlay initial="initial" animate="isOpen" exit="exit">
                        <ModalContainer variants={containerVariant}>
                            <ModalWrapper>
                                <CloseButton onClick={() => close(false)}>닫기</CloseButton>
                                <ModalTitleRow>{title}</ModalTitleRow>
                                <ModalDescriptionRow> {contents} </ModalDescriptionRow>
                            </ModalWrapper>
                        </ModalContainer>
                    </Overlay>
                )
            }
        </AnimatePresence>
    );
}

export default AgreementModal;