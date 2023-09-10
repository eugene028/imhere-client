const ONE_MINUTE_IN_MILLISECONDS = 60 * 1000; 
const ONE_HOUR_IN_MILLISECONDS = 60 * ONE_MINUTE_IN_MILLISECONDS; 
const SEOUL_TIME_OFFSET = 9 * ONE_HOUR_IN_MILLISECONDS; 

export const getSeoulDateNow = (): Date => {
    const dateNow = new Date();
    const timeZoneOffset = dateNow.getTimezoneOffset() * ONE_MINUTE_IN_MILLISECONDS;
    const seoulUTC = dateNow.getTime() + timeZoneOffset + SEOUL_TIME_OFFSET;
    return new Date(seoulUTC);
};