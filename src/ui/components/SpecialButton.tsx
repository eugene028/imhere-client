import { ButtonHTMLAttributes } from "react";
import { ButtonVarient, KeyOfColor } from "..";
import styled from "styled-components";

interface SpecialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    variant: SpecialButtonVariant;
}

type Props = Partial<SpecialButtonProps>;

type SpecialButtonVariant = 'delete' | 'inform';

type SpecialButtonColor = {
    [key in SpecialButtonVariant]:{
        backgroundColor: KeyOfColor;
        color: KeyOfColor;
    }
}

const SPECIAL_BUTTON_VARIANT: SpecialButtonColor = {
    inform: {
        backgroundColor: 'sub_blue',
        color: 'main_blue'
    },
    delete: {
        backgroundColor: 'sub_red',
        color : 'main_red'
    }
} 

export const SpecialButton = ({
    variant='inform',
    children,
    ...props
}: Props) => {
    return (
        <StyledSpecialButton variant={variant} {...props}>
            {children}
        </StyledSpecialButton>
    )
}

const StyledSpecialButton = styled.button<{
    variant: SpecialButtonVariant,
}>`
    height: 45px;
    min-width: 185px;
    background-color: ${({variant}) => SPECIAL_BUTTON_VARIANT[variant].backgroundColor};
    color : ${({variant}) => SPECIAL_BUTTON_VARIANT[variant].color};
    border-radius: 10px;
`