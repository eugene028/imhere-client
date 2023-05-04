
import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface PaddingProps extends HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
    size?: PaddingSize;
    fill?: boolean;
}

export type PaddingSize = 
 | number
 | [number, number]
 | [number, number, number, number];

 export const Padding = ({
    children,
    size = [0, 24],
    fill = false,
    ...props
 }: PaddingProps) => {
    return (
        <PaddingBox size = {size} fill ={fill}>
            {children}
        </PaddingBox>
    )
 }

 const PaddingBox = styled.div<PaddingProps>`
    padding: ${(props) => {
        typeof props.size === 'number' ? `${props.size}px` :
        props.length === 2 ? `${props.size[0]}px ${props.size[1]}px` :
        `${props.size[0]}px ${props.size[1]}px ${props.size[2]}px ${props.size[3]}px`}};
    box-sizing: border-box;
 `