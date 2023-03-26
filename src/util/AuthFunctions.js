import React from "react";

// export const getAccessToken = () => {
//     const token = localStorage.getItem('accessToken');
//     if (!token || !token.expirationTime || token.expirationTime > new Date()) {
//         localStorage.removeItem('accessToken');
//         return null;
//     }
//     return token;
// }

const checkTokenExpirationTime = () => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (!expirationTime || expirationTime < new Date()) {
        removeToken();
        alert('로그인 하세요');

        return false;
    }
    return true;
}

export const setAccessToken = (accessToken) => {
    const parsedToken = parseToken(accessToken);
    localStorage.setItem('univId', parsedToken.univId);
    localStorage.setItem('role', parsedToken.role);
    localStorage.setItem('expirationTime', parsedToken.expirationTime);
    localStorage.setItem('accessToken', accessToken);
}

export const checkUserHasRole = (roles) => {
    if (!checkTokenExpirationTime()) {
        return false;
    }

    const role = localStorage.getItem('role');

    if (roles && !roles.includes(role)) {
        removeToken();
        alert('잘못된 접근입니다.');
        return false;
    }

    return true;
}

export const checkAndGetUserRole = (roles) => {
    if (!checkTokenExpirationTime()) {
        return null;
    }

    const role = localStorage.getItem('role');

    if (roles && !roles.includes(role)) {
        removeToken();
        alert('잘못된 접근입니다.');
        return null;
    }

    return role;
}

export const getToken = () => {
    if(!checkTokenExpirationTime()) {
        return null;
    }

    return localStorage.getItem('accessToken');
}

export const getHeadersWithToken = () => {
    if(!checkTokenExpirationTime()) {
        return null;
    }
    const accessToken = localStorage.getItem('accessToken');
    return { Authorization: `${accessToken}` };
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

    // console.log("univId : " + univId);
    // console.log("role : " + role);
    // console.log("expirationTime : " + expirationTime);
    return {univId, role, expirationTime};
};

export const removeToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('univId');
    localStorage.removeItem('role');
    localStorage.removeItem('expirationTime');
}