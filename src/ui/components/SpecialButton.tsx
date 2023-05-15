import { ButtonHTMLAttributes } from "react";
import { KeyOfColor } from "..";

import styled from "styled-components";
import { theme } from '@ui/theme';
import { palette } from '../theme/palette';

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

const SPECIAL_BUTTON_VARIANT = {
    inform: {
        backgroundColor: `${theme.palette.sub_blue}`,
        color: `${theme.palette.main_blue}`
    },
    delete: {
        backgroundColor: `${theme.palette.sub_red}`,
        color : `${theme.palette.main_red}`
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
    min-width: 140px;
    background-color: ${({variant}) => SPECIAL_BUTTON_VARIANT[variant].backgroundColor};
    color : ${({variant}) => SPECIAL_BUTTON_VARIANT[variant].color};
    border-radius: 10px;
`