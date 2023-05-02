import { DefaultTheme } from 'styled-components';
import { palette } from './palette';
import { typo } from './typo';

//팔레트 타입 정의
export type ColorTypes = typeof palette;
export type KeyOfColor = keyof typeof palette;

//타이포 타입 정의
export type TypoTypes = typeof typo;
export type KeyOfTypo = keyof typeof typo;

//테마 요소 타입 정의
export type KeyofTheme = keyof typeof theme;

export const theme: DefaultTheme = {
    palette,
    typo,
};

export type TextType = {
    typo: KeyOfTypo;
    color: KeyOfColor;
};

export const customMediaQuery = (minWidth: number): string =>
  `@media (min-width: ${minWidth}px)`;
export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(768),
  mobile: `@media (max-width : 767px)`,
};
