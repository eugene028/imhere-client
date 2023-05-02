import { css } from "styled-components";
import { HTMLAttributes } from "react";
import { KeyOfColor, KeyOfTypo } from "../theme";
import styled from "styled-components";

export interface TextProps extends HTMLAttributes<HTMLSpanElement>{
    as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
    typo: KeyOfTypo;
    color?: KeyOfColor;
    children: any;
}

export type TextPropsKey = 'typo' | 'color';
/**
 * @param as Text컴포넌트 태그 지정(기본값 span)
 * @param typo Typo theme 선택
 * @param color Palette theme 선택 (기본값 black)
 */

export const Text = ({
    typo,
    as = 'span',
    color = "main_black",
    children,
    ...props
}: TextProps) => {
    return (
        <StyledText typoKey = {typo} colorKey = {color} as = {as} {...props}>
            {children}
        </StyledText>    
        );
};

const StyledText = styled.span<{ typoKey: KeyOfTypo; colorKey?: KeyOfColor}>`
     white-space: pre-wrap;
  ${({ typoKey, theme }) => theme.typo[typoKey]}
  ${({ colorKey, theme }) =>
    colorKey &&
    css`
      color: ${theme.palette[colorKey]};
    `}
`;