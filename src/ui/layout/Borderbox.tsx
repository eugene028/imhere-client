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

