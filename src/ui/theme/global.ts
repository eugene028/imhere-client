import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 700;
        font-style: normal;
    }
    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 600;
        font-style: normal;
    }
    @font-face {
        font-family: 'Pretendard';
        src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 500;
        font-style: normal;
    }
    @font-face {
        font-family: 'Pretendard';
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
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        overflow: hidden;
        height: 100vh;
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