import { HTMLAttributes, ReactNode } from "react";
import { CSSProperties } from "styled-components";
import styled from "styled-components";

export interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
    direction?: CSSProperties['flexDirection'];
    gap?: CSSProperties['gap'];
    children: ReactNode;
    fullWidth?: boolean;
}

export type flexboxPropsKey = 'align' | 'justify' | 'direction' | 'gap';
export type flexboxPropKey = keyof FlexBoxProps;

/**
 * @param align : align-items 속성 (기본값 : center)
 * @param jusitfy : justify-content 속성 (기본값 : center)
 * @param direction : direction 속성 (기본값 : row)
 * @param gap : gap 속성
 * @param number : 가로길이가 필요하면 넣기.
 * @param fullWidth: 꽉 채울거니?
 */

export const FlexBox = ({
    align = 'center',
    justify = 'center',
    direction = 'row',
    gap = 0,
    children,
    fullWidth,
    ...props
}: FlexBoxProps) => {
    return (
            <FlexDiv align={align} justify={justify} direction={direction} gap={gap} fullWidth={fullWidth} 
                {...props}>
                {children}
            </FlexDiv>
    )
}

const FlexDiv = styled.div<FlexBoxProps>`
    display: flex;
    width : ${props => props.fullWidth ? '100%' : 'auto'};
    align-items: ${props => props.align};
    justify-content: ${props => props.justify};
    flex-direction: ${props => props.direction};
    gap: ${props => props.gap}px;
`