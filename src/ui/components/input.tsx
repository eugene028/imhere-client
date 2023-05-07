import { SerializedStyles } from "@emotion/react";
import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import styled from "styled-components";
import { KeyOfColor } from "..";
import { FlexBox } from "@ui/layout";
import { calcRem } from "@ui/theme/typo";
import { Text } from "@ui/components";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    width?: number;
    color?: KeyOfColor;
    height?: number;
    styles?: SerializedStyles;
    rightImage?: ReactNode;
    errorMessage?:string;
    innershadow?: boolean;
}

/**
 * @param width: number(기본값 388px)
 * @param height: number(기본값 63px)
 * @param rightImage: Input창 오른쪽에 들어갈 수 있는 element
 * @param errorMessage: string
 */

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ value, width, height, color = 'white', styles, ...props }: InputProps, ref) => {
    
    return (
        <FlexBox
            align={'flex-start'}
            justify={'center'}
            direction={'column'}
            gap ={10}
        >
            <InputWrapper width ={width} height={height} color ={color}>
                <StyledInput value = {value} ref= {ref} onClick={props.onClick} autoComplete="off" {...props}/>
                {props.rightImage}
            </InputWrapper>
            {props.errorMessage && (
                <MessageWrapper errorMessage={props.errorMessage}>
                    <Text typo = {'Text_15'} color ={'main_red'}>
                        {props.errorMessage}
                    </Text>
                </MessageWrapper>
            )}
        </FlexBox>
    )
    }
)

const InputWrapper = styled.div<{
    width?: number;
    height?: number;
    color: KeyOfColor;
}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    gap: 10px;
    flex-direction: row;
    box-sizing: border-box;
    background: ${({color, theme}) => theme.palette[color]};
    height: ${({ height }) => (height ? `${height}px` : `63px`)};
    width: ${({ width }) => (width ? `${width}px` : '388px')};

`;
const StyledInput = styled.input`
    box-sizing: border-box;
    border: none;
    background-color: transparent;
    width: 100%;
    line-height: 100%;
    ${({ theme}) => theme.typo.Text_20};
    color: ${({theme}) => theme.palette.main_blue};
    ::placeholder{
        color: ${({ theme}) => theme.palette.black_200};
    }
    &:disabled{
        ::placeholder {
            color: ${({ theme}) => theme.palette.black_100}
        }
    }

`
const MessageWrapper = styled.div<{
    errorMessage?: string;
  }>`
    padding-left: 16px;
    padding-bottom: ${({ errorMessage }) =>
      errorMessage ? `${calcRem(18)}` : '0'};
    height: ${({ errorMessage }) => (errorMessage ? '0' : `${calcRem(18)}`)};
  `;