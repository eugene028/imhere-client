import 'styled-components';
import { ColorTypes, TypoTypes } from './theme';

declare module 'styled-components' {
    export interface DefaultTheme{
        palette : ColorTypes;
        typo : TypoTypes;
    }
}