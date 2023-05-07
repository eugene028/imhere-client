import { PaddingSize } from "@ui/layout";
import styled from "styled-components";
import { KeyOfColor, KeyOfTypo } from "..";
import { css } from "styled-components";
import { Text } from "@ui/components"

interface ListElementProps {
    elements: Array<string>;
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
        typo: 'Text_M_20',
    },
    mobile: {
        width: 295,
        typo: 'Text_15',
    }
}

export const ListElement = ({
    elements = ['안녕', '바부야!', '으하하'],
    variant = 'mobile',
    lastcolor='main_black',
}:ListElementProps) => {
    return (
        elements.length === 3 ? 
            <ListWrapper variant = {variant}>
                <ElementWrapper>
                    <Text typo ={LIST_ELEMENT[variant].typo}>{elements[0]}</Text>
                </ElementWrapper>
                <ElementWrapper>
                    <Text typo ={LIST_ELEMENT[variant].typo}>{elements[1]}</Text>
                </ElementWrapper>
                <ElementWrapper>
                    <Text typo ={LIST_ELEMENT[variant].typo} color = {lastcolor}>{elements[2]}</Text>
                </ElementWrapper>
            </ListWrapper>
        : <ListWrapper variant = {variant}>
                <ElementWrapper>
                    <Text typo ={LIST_ELEMENT[variant].typo}>{elements[0]}</Text>
                </ElementWrapper>
                <ElementWrapper>
                    <Text typo ={LIST_ELEMENT[variant].typo}>{elements[1]}</Text>
                </ElementWrapper>
                <ElementWrapper>
                    <Text typo ={LIST_ELEMENT[variant].typo}>{elements[2]}</Text>
                </ElementWrapper>
                <ElementWrapper>
                    <Text typo ={LIST_ELEMENT[variant].typo} color = {lastcolor}>{elements[3]}</Text>
                </ElementWrapper>
        </ListWrapper>
    )
}

const ListWrapper = styled.div<{variant: ListElementVariant}>`
    display: flex;
    flex-direction: row;
    width: 100%;
    ${({variant}) => (variant === 'mobile' ? css`
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