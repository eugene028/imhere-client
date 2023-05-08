/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { KeyOfColor, theme } from '..';
import styled from 'styled-components';

interface SpacingProps {
    size : number,
}
export const Spacing = ({
  size,
}: SpacingProps) => {
  return (
    <SpacingWrapper size = {size} ></SpacingWrapper>
  );
};

const SpacingWrapper = styled.div<SpacingProps>`
    height: ${(props) => props.size}px;
    width: 100%;

`

