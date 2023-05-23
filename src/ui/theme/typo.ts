import { css } from "styled-components";

export const calcRem = (px: number) => `${px / 18}rem`;

export const typo = {
    Header_40 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(40)};
        line-height: 150%;
        font-weight: 700;
    `,
    Header_35 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(35)};
        line-height: 150%;
        font-weight: 700;
    `,
    Header_30 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(30)};
        line-height: 150%;
        font-weight: 700;
    `,
    Header_25 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(25)};
        line-height: 150%;
        font-weight: 700;
    `,
    Header_20 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(20)};
        line-height: 150%;
        font-weight: 700;
    `,
    Text_SB_30 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(30)};
        line-height: 150%;
        font-weight: 600;
    `,
    Text_M_30 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(30)};
        line-height: 150%;
        font-weight: 500;
    `,
    Text_20 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(20)};
        line-height: 150%;
        font-weight: 400;
    `,
    Text_SB_20 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(20)};
        line-height: 150%;
        font-weight: 600;
    `,
    Text_M_20 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(20)};
        line-height: 150%;
        font-weight: 500;
    `,
    Text_15 : css`
        font-family: 'Pretendard';
        font-size: ${calcRem(15)};
        line-height: 150%;
        font-weight: 400;
    `,
    Text_10: css`
        font-family: 'Pretendard';
        font-size: ${calcRem(10)};
        line-height: 150%;
        font-weight: 400;
    `
}