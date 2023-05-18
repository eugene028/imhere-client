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
        width : string;
        height: string;
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
        padding: '5px 10px',
        width : '75px',
        height: '31px'
    },
    PC : {
        typo: 'Text_M_20',
        padding: '8px 10px',
        width : '100px',
        height: '40px'
    }
}

export interface TagProps extends React.ComponentProps<'div'>{
    children: any;
    tagtype: TagType;
    size: TagSizeKey;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
/**
 * @param children 자식요소
 * @param tagtype 'selected' : 기본 파란색, 'nonselected : 회색(선택x)
 * @param size PC ? mobile ? 
 * @param onClick?: React.MouseEventHandler
 */

interface WrapperProps extends TagProps{
    [x: string]: any;
}


export const Tag = ({ children, tagtype, size, onClick, ...props }: TagProps) => {
    return (
        <Wrapper tagtype = { tagtype } size = { size } onClick = {onClick} {...props}>
            {children}
        </Wrapper>
    );
};

const Wrapper = styled.div<WrapperProps>`
    ${({ size, theme }) => theme.typo[TAG_SIZE[size].typo]}
    border-radius: 8px;
    height: ${({ size }) => TAG_SIZE[size].height};
    min-width: ${({ size }) => TAG_SIZE[size].width};
    background-color: ${({ theme, tagtype }) => 
        theme.palette[TAG_COLOR[tagtype].background]};
    color: ${({ theme, tagtype }) => theme.palette[TAG_COLOR[tagtype].text]};
    display: inline-block;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
