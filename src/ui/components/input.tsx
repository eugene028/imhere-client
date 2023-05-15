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
    big?: boolean;
}

/**
 * @param width: number(기본값 388px)
 * @param height: number(기본값 63px)
 * @param rightImage: Input창 오른쪽에 들어갈 수 있는 element
 * @param errorMessage: string
 * @param styles: 스타일적용
 * @param rightImage: 오른쪽에 들어갈 요소
 * @param innershadow : 안에 그림자효과(boolean)
 * @param big : pc버전 모바일 버전
 */

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ value, width, height, innershadow=true, color = 'white', styles, big = false, ...props }: InputProps, ref) => {
    
    return (
        <FlexBox
            align={'flex-start'}
            justify={'center'}
            direction={'column'}
            gap ={10}
        >
            <InputWrapper innershadow = {innershadow} width ={width} height={height} color ={color}>
                <StyledInput big = {big} value = {value} ref= {ref} onClick={props.onClick} autoComplete="off" {...props}/>
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
    innershadow: boolean;
}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    gap: 10px;
    flex-direction: row;
    box-sizing: border-box;
    background: ${({color, theme}) => theme.palette[color]};
    height: ${({ height }) => (height ? `${height}px` : `51px`)};
    width: ${({ width }) => (width ? `${width}px` : '100%')};
    box-shadow: ${({innershadow}) => 
        (innershadow ? `inset 0 7px 7px -7px #333, inset 7px 0 7px -7px #333;` : 0)};

`;
const StyledInput = styled.input<{
    big: Boolean;
}>`
    padding: 0px 5px;
    box-sizing: border-box;
    border: none;
    background-color: transparent;
    width: 100%;
    line-height: 100%;
    ${({ big, theme }) => (big ? theme.typo.Text_20 : theme.typo.Text_15)};
    color: ${({theme}) => theme.palette.black_300};
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