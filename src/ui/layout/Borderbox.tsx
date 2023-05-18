import styled from "styled-components";
import { ComponentProps } from "react";
import { PaddingSize } from "./Padding";
import { Padding } from "./Padding";

interface BorderBoxProps extends ComponentProps<'div'>{
    fullWidth: boolean;
    padding?: PaddingSize;
    shadow?: boolean;
    height?: number;
}

/**
 * @param fullWidth 전체 너비를 사용할것인지
 * @param padding 패딩값 number : 상하좌우 [number, number] : 상하, 좌우 [number, number, number, number]
 * @param shadow 섀도우를 넣을것인지?
 * @param heigth 높이 
 */

type Props = Partial<BorderBoxProps>;

interface WrapperProps extends BorderBoxProps{
    [x: string]: any;
}
export const BorderBox = ({
    fullWidth = true,
    children,
    padding,
    shadow = false,
    ...props
}: Props) => {
    return (
        <Wrapper {...props}>
            <Padding fill={fullWidth} size ={padding}>
                {children}
            </Padding>
        </Wrapper>
    )

}

const Wrapper = styled.div<WrapperProps>`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.white};
  height: ${(props) => props.height}px;
`;

