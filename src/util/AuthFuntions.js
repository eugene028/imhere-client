export const setAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
}

export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
}

export const parseJWT = (token) => {
    if (!token.startsWith('Token ')) {
        throw new Error('저희 서버 토큰이 아닙니다.');
    }

    const tokenBody = token.slice('Token '.length).split('.');
    if (tokenBody.length !== 3) {
        throw new Error('잘못된 토큰입니다.');
    }

    const [, payloadBase64] = tokenBody;
    const parseResult = JSON.parse(atob(payloadBase64));

    const univId = parseResult.sub;
    const role = parseResult.role;
    const expirationTime = new Date(parseResult.exp * 1000);

    console.log("univId : " + univId);
    console.log("role : " + role);
    console.log("expirationTime : " + expirationTime);
    return {user: univId, role, expirationTime};
};