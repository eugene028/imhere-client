import { css } from "styled-components";
import { ButtonHTMLAttributes } from "react";
import { KeyOfTypo, theme } from "../theme";
import styled from "styled-components";
import { Text } from "./Text";
import { palette } from "../theme/palette";


export type ButtonVarient = 
    | 'larger'
    | 'main'
    | 'regular'
    | 'mini';

/**
 * @param types 버튼의 종류 : 'larger'는 PC화면 전용
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    varient: ButtonVarient;
    denial: Boolean;
}
type Props = Partial<ButtonProps>;
type ButtonSizeType = {
    [key in ButtonVarient]: {
        typo: KeyOfTypo;
        height: number;
        width: number;
    }
}

const BUTTON_SIZE : ButtonSizeType = {
    larger :{
        typo: 'Text_SB_30',
        height: 61,
        width: 388
    },
    main: {
        typo:'Text_SB_30',
        height: 61,
        width: 278
    },
    regular: {
        typo: 'Text_SB_20',
        height: 49,
        width: 163,
    },
    mini: {
        typo: 'Text_15',
        height: 38,
        width: 171,
    }
}

export const Button =({
    children,
    varient = 'main',
    denial = false,
    ...props
}: Props) =>{
    return (
        <StyledButton varient={varient} denial={denial} {...props}>
            <Text typo = {BUTTON_SIZE[varient].typo} color ={(denial ? 'main_black' : 'white')}>
                {children}
            </Text>
        </StyledButton>
    )
}

const StyledButton = styled.button<{
    varient: ButtonVarient,
    denial: Boolean
}>`
    height: ${({varient}) => BUTTON_SIZE[varient].height}px;
    min-width: ${({varient}) => BUTTON_SIZE[varient].width}px;
    background-color: ${({denial, theme}) => {
        return (denial ? theme.palette.black_100 : theme.palette.main_blue
    )}};

    ${({ varient }) => 
        varient === 'mini' ?
    css`
        border-radius: 5px;
    `: 
    css`
        border-radius: 10px;
    `}
`