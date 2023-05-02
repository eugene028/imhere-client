import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const globalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff')
            format('woff');
    }
    @font-face {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 600;
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff')
            format('woff');
    }
    @font-face {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 500;
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff')
            format('woff');
    }
    @font-face {
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Bold.woff')
            format('woff');
    }
    body{
        font-family: 'Pretendard', Pretendard BlinkMacSystemFont,
      system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif !important;
      box-sizing: border-box;
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
`;