import { css } from "styled-components";
import { ButtonHTMLAttributes } from "react";
import { theme } from "../theme";


export type ButtonVarient = 
    | 'larger'
    | 'main'
    | 'regular'
    | 'mini';

/**
 * @param types 버튼의 종류 : 'larger'는 PC화면 전용
 * @param size 버튼 사이즈 
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    varient: ButtonVarient;
    width: number;
}

export const Button =({
    children,
    varient = 'main',
    width,
    ...props
}: ButtonProps) =>{
}