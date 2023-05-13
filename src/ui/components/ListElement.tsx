import { PaddingSize } from "@ui/layout";
import styled from "styled-components";
import { KeyOfColor, KeyOfTypo } from "..";
import { css } from "styled-components";
import { Text } from "@ui/components"
import { HTMLAttributes } from "react";

export interface ListElementProps extends HTMLAttributes<HTMLDivElement> {
    elements: Object;
    count: number;
    padding?: PaddingSize;
    variant: ListElementVariant;
    lastcolor?: KeyOfColor;
}
type ListElementVariant = 'PC' | 'mobile';
type ListElementType = {
    [key in ListElementVariant]:{
        width: number;
        typo: KeyOfTypo;
    }
}

const LIST_ELEMENT : ListElementType ={
    PC :{
        width: 562,
        typo: 'Text_SB_20',
    },
    mobile: {
        width: 295,
        typo: 'Text_20',
    }
}

export const ListElement = ({
    elements,
    variant = 'mobile',
    lastcolor,
    count = 3,
    ...props
}:ListElementProps) => {
    const values = Object.values(elements) as string[];
    if (count === 3){
        values.splice(values.length - 2);
    }
    else {
        values.splice(values.length - 1);
    }
    return (
            <ListWrapper count = {count}>
                {values.map((value, index) => (
                    <ElementWrapper key = {index}>
                        {lastcolor && index === values.length - 1?
                            <Text typo = {LIST_ELEMENT[variant].typo} color ={lastcolor}>{value || 'loading...'}</Text> 
                            : 
                            <Text typo = {LIST_ELEMENT[variant].typo}>{value || 'loading...'}</Text>
                        }
                    </ElementWrapper>
                ))}
            </ListWrapper>
    )
}

const ListWrapper = styled.div<{count: Number}>`
    display: flex;
    flex-direction: row;
    width: 100%;
    ${({count}) => (count === 3 ? css`
        div{
            &:nth-child(1){
                flex-grow: 1;
            }
            &:nth-child(2){
                flex-grow: 3;
            }
            &:nth-child(3){
                flex-grow : 2;
                border-right: 0px solid !important;
            }
        }
    ` :
    css`
        div{
                &:nth-child(1){
                    flex-grow: 1;
                }
                &:nth-child(2){
                    flex-grow: 3;
                }
                &:nth-child(3){
                    flex-grow : 2;
                }
                &:nth-child(4){
                    flex-grow: 2;
                    border-right: 0px solid !important;
                }
            }
    `)}
`
const ElementWrapper = styled.div`
    border-right: 1px solid ${({theme}) => theme.palette.black_100};
    text-align: center;
`;