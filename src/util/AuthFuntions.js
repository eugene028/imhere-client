import * as ROUTES from "../constants/routes";
import {useNavigate} from "react-router-dom";

const navigate = useNavigate();

export const getAccessToken = () => {
    const token = localStorage.getItem('accessToken');
    if (!token.expirationTime || token.expirationTime > new Date()) {
        return null;
    }
    return token;
}

export const setAccessToken = (accessToken) => {
    const parsedToken = parseToken(accessToken);
    localStorage.setItem('accessToken', parsedToken);
}

const parseToken = (token) => {
    if (!token.startsWith('Token ')) {
        throw new Error('Token Error');
    }

    const tokenBody = token.slice('Token '.length).split('.');
    if (tokenBody.length !== 3) {
        throw new Error('Token Error');
    }

    const [, payloadBase64] = tokenBody;
    const parseResult = JSON.parse(atob(payloadBase64));

    const univId = parseResult.sub;
    const role = parseResult.role;
    const expirationTime = new Date(parseResult.exp * 1000).getTime();

    console.log("univId : " + univId);
    console.log("role : " + role);
    console.log("expirationTime : " + expirationTime);
    return {univId, role, expirationTime};
};

export const validateUserAuth = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
        alert('로그인 하세요');
        navigate(ROUTES.LOGIN);
    }
}

export const checkUserHasRole = (roles) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
        alert('로그인 하세요');
        navigate(ROUTES.LOGIN);
    }

    if (roles !== null && !roles.includes(accessToken.role)) {
        alert('권한이 없습니다.');
        navigate(ROUTES.MAIN_PAGE);
    }
}