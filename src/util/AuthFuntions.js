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
    return { univId, role, expirationTime };
};