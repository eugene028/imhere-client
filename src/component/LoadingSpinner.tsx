import React from 'react';
import styled, {keyframes} from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderWrapper = styled.div`
  height: 100%;
  width : 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position : absolute;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const Loader = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.3);
  border-top-color: lightblue;
  border-radius: 50%;
  margin: 0 auto;
  width: 81px;
  height: 81px;
  animation: ${spin} 1s ease-in-out infinite;
`;

const LoadingSpinner = () => {
    return (
        <LoaderWrapper>
            <Loader/>
        </LoaderWrapper>
    );
};

export default LoadingSpinner;