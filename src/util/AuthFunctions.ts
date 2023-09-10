const checkTokenExpirationTime = (): boolean => {
    const expirationTime = Number(localStorage.getItem('expirationTime'));
    if (!expirationTime || new Date(expirationTime) < new Date()) {
        removeToken();
        alert('로그인 하세요');

        return false;
    }
    return true;
}

export const setAccessToken = (accessToken: string) => {
    const parsedToken = parseToken(accessToken);
    localStorage.setItem('univId', parsedToken.univId);
    localStorage.setItem('role', parsedToken.role);
    localStorage.setItem('expirationTime', String(parsedToken.expirationTime));
    localStorage.setItem('accessToken', accessToken);
}

export const checkUserHasRole = (roles?: string[]) => {
    if (!checkTokenExpirationTime()) {
        return false;
    }

    const role = localStorage.getItem('role');
    if (!role) return false;

    if (roles && !roles.includes(role)) {
        removeToken();
        alert('잘못된 접근입니다.');
        return false;
    }

    return true;
}

export const checkAndGetUserRole = (roles?: string[]): string | null => {
    if (!checkTokenExpirationTime()) {
        return null;
    }

    const role = localStorage.getItem('role');

    return role;
}

export const getToken = (): string | null => {
    if(!checkTokenExpirationTime()) {
        return null;
    }

    return localStorage.getItem('accessToken');
}

export const getHeadersWithToken = ():  { Authorization: string } | null => {
    if(!checkTokenExpirationTime()) {
        return null;
    }
    const accessToken = localStorage.getItem('accessToken');
    return { Authorization: `${accessToken}` };
}

const parseToken = (token: string) : { univId: any, role: any, expirationTime: number }=> {
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
    return {univId, role, expirationTime};
};

export const removeToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('univId');
    localStorage.removeItem('role');
    localStorage.removeItem('expirationTime');
}