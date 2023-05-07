import { CSSProperties } from "styled-components";
import { HTMLAttributes, ReactNode } from "react";
import { flexboxPropsKey, FlexBox, Padding, PaddingSize } from "@ui/layout";

export interface ButtonSetProps extends HTMLAttributes<HTMLDivElement> {
    children : ReactNode;
    variant?: ButtonSetVariantKey;
    padding?: PaddingSize;
}

type ButtonSetVariantKey = 
| 'mono'
| 'horizontal'
| 'vertical'

type buttonSetVariantType = {
    [key in ButtonSetVariantKey]: {
        [key in flexboxPropsKey] : string;
    }
}

const BUTTON_SET_VARIANT: buttonSetVariantType = {
    mono : {
        align: 'center',
        justify: 'center',
        direction: 'column',
        gap: '0',
    },
    horizontal: {
        align : 'center',
        justify: 'center',
        direction: 'row',
        gap: '12',
    },
    vertical: {
        align : 'center',
        justify: 'center',
        direction: 'column',
        gap: '26',
    }
}

/**
 * @param variant 버튼셋의 variant
 * 'mono' :  버튼이 한개
 * 'horizontal' : 버튼이 수평으로 두 개
 * 'vertical' : 버튼이 세로로 두 개 
 * @paddingSize : 버튼셋 자체의 패딩값 지정
 * number: 상하좌우 동시에
 * [number, number] : 상하, 좌우
 * [number, number, number, number] : 상, 우, 하, 좌
 */

export const ButtonSet = ({
    children,
    variant = 'mono',
    padding = [0, 10, 0, 10],
    ...props
}: ButtonSetProps) => {
    return (
        <Padding size ={padding}>
            <FlexBox
                align={BUTTON_SET_VARIANT[variant].align}
                gap={BUTTON_SET_VARIANT[variant].gap}
                justify={BUTTON_SET_VARIANT[variant].justify}
                direction={BUTTON_SET_VARIANT[variant].direction as CSSProperties['flexDirection']}
            >
                {children}
            </FlexBox>
        </Padding>
    )
}
