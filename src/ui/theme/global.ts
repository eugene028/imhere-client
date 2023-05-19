import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { theme } from "./theme";
import { media } from "./theme";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }
    body{
        font-family: 'Pretendard', Pretendard BlinkMacSystemFont,
        system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
        'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', sans-serif !important;
        box-sizing: border-box;
        background-color: ${({ theme }) => theme.palette.background_100};
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        height: 100vh;
  
        ${media.mobile} {
            -ms-overflow-style: none;
        }
    }
    button {
        background: inherit;
        border: none;
        border-radius: 0;
        padding: 0;
        cursor: pointer;
    }
    button:focus{
        outline: none;
    }
    input:focus{
        outline: none;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    &::-webkit-scrollbar {
    ${media.mobile} {
      display: none;
    }
  }
`;