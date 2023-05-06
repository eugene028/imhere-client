import { KeyOfColor, KeyOfTypo } from "../theme";
import styled from "styled-components";

export type TagType = 'selected' | 'nonselected';

type TagColorType = {
    [key in TagType]:{
        background: KeyOfColor;
        text: KeyOfColor;
    }
}

export type TagSizeKey =  'mobile' | 'PC';
type TagSizeType = {
    [key in TagSizeKey]: {
        typo : KeyOfTypo;
        padding: string;
    }
}

const TAG_COLOR: TagColorType = {
    selected: {
        background: 'main_blue',
        text: 'white',
    },
    nonselected: {
        background: 'background_200',
        text: 'black_100',
    }
}

const TAG_SIZE: TagSizeType = {
    mobile : {
        typo:'Text_15',
        padding: '5px 18px',
    },
    PC : {
        typo: 'Text_M_20',
        padding: '8px 16px',
    }
}

export interface TagProps extends React.ComponentProps<'div'>{
    text: string;
    tagtype: TagType;
    size: TagSizeKey;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface WrapperProps extends TagProps{
    [x: string]: any;
}


export const Tag = ({ text, tagtype, size, onClick, ...props }: TagProps) => {
    return (
        <Wrapper tagtype = { tagtype } size = { size } onClick = {onClick} {...props}>
            {text}
        </Wrapper>
    );
};

const Wrapper = styled.div<WrapperProps>`
    ${({ size, theme }) => theme.typo[TAG_SIZE[size].typo]}
    padding: ${({ size }) => TAG_SIZE[size].padding};
    border-radius: 10;
    background-color: ${({ theme, tagtype }) => 
        theme.palette[TAG_COLOR[tagtype].background]};
    color: ${({ theme, tagtype }) => theme.palette[TAG_COLOR[tagtype].text]};
    display: inline-block;
`;
