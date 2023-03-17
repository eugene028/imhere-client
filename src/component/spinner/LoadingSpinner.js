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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Loader = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.3);
  border-top-color: lightblue;
  border-radius: 50%;
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