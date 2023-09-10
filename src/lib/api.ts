import axios, { type AxiosResponse } from "axios";
import {getHeadersWithToken, removeToken} from "@util/AuthFunctions";

const protocol = `https`;
const host = `dev-api.imhere.im`;
const statusString = `?status=`;

// member
export const generateVerificationNumber = async (email: string): Promise<boolean> => {
    return await axios.post<string>(`${protocol}://${host}/member/verification/${email}`)
        .then(response => {
            if (response && response.status === 200) {
                return true;
            }
            return false;
        }).catch(error => {
            console.error('generateVerificationNumber error : ' + error)
            return false;
        });
}

export const verifyValidateNumber = async (email: string, verificationCode: string): Promise<boolean> => {
    return await axios.get<boolean>(`${protocol}://${host}/member/verification/${email}/${verificationCode}`)
        .then(response => {
            console.log(response)
            if (response && response.status === 200) {
                return true;
            }
            return false;
        }).catch(error => {
            console.error('generateVerificationNumber error : ' + error)
            return false;
        });
}

export const signUpNewMember = async (univId: string, name: string, password: string): Promise<boolean> => {
    const payload = {
        "univId": `${univId}`,
        "name": `${name}`,
        "password": `${password}`
    }

    const headers = {
        'Content-Type': 'application/json'
    }

    return await axios.post<string>(`${protocol}://${host}/member/new`, payload, {headers: headers})
        .then(response => {
            if (response && response.status === 200) {
                return true;
            }
            return false;
        }).catch(error => {
            console.error('signUpNewMember error : ' + error)
            return false;
        });
}

export const requestSignIn = async (univId: string, password: string): Promise<string | null> => {
    const payload = {
        "univId": univId,
        "password": password
    }

    const headers = {
        'Content-Type': 'application/json'
    }

    return await axios.post(`${protocol}://${host}/login`, payload, {headers: headers})
        .then(response => {
            if (response && response.headers['authorization']) {
                return response.headers['authorization'];
            }
            return null;
        }).catch(error => {
            alert('올바른 id와 비밀번호를 입력해주세요')
        });
}

export const logout = async (): Promise<AxiosResponse | undefined> => {
    const headers = getHeadersWithToken();
    if (!headers) {
        return;
    }

    return axios.post(`${protocol}://${host}/logout`, {}, {headers})
        .finally(() => {
            removeToken();
            alert('로그아웃 완료')
        });
}

// lecture apis
export const createLecture = async (lectureName: string): Promise<void | AxiosResponse> => {
    const headers = getHeadersWithToken() || undefined;

    const payload = {
        "lectureName": `${lectureName}`
    }

    return await axios.post<string>(`${protocol}://${host}/api/lecture`, payload, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.log('createLecture error : ' + error);
        });
}


export const getAllLectures = async (): Promise<LectureInfo|null> => {
    const headers = getHeadersWithToken() || undefined;

    return await axios.get<LectureInfo>(`${protocol}://${host}/api/lecture`, {headers})

        .then(response => {
            if (response && response.data) {
                return response.data
            }
            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        })
}

export const getStudentsEnrolledLectures = async (): Promise<LectureInfo| null> => {
    const headers = getHeadersWithToken() || undefined;
    const status = statusString + "enrolled";

    return await axios.get<LectureInfo>(
        `${protocol}://${host}/api/lecture` + status, {headers})
        .then(response => {
            if (response && response.data) {
                return response.data
            }
            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        })
}

export const getLecturersOwnedLectures = async (): Promise<LectureInfo | null> => {
    const headers = getHeadersWithToken() || undefined;
    const status = statusString + "owned";

    return await axios.get<LectureInfo>(`${protocol}://${host}/api/lecture` + status, {headers})
        .then(response => {
            if (response && response.data) {
                return response.data
            }

            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        })
}

export const getStudentsOpenedLectures = async (): Promise<LectureInfo | null> => {
    const headers = getHeadersWithToken()  || undefined;
    const status = statusString + "opened";

    return await axios.get<LectureInfo>(`${protocol}://${host}/api/lecture` + status, {headers})
        .then(response => {
            if (response && response.data) {
                return response.data
            }
            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        })
}

export const changeLectureState = async (lectureId: number, lectureState: LectureState): Promise<number | null> => {
    if (lectureState === 'OPEN') {
        return openLecture(lectureId)
            .then(response => {
                if (response && response.data && response.data.attendanceNumber) {
                    return response.data.attendanceNumber;
                } else {
                    return null;
                }
            }).catch(error => {
                console.log('openLecture fail : ' + lectureId + ", " + error)
                return null;
            })
    } else if (lectureState === 'CLOSED') {
        return closeLecture(lectureId)
            .then(response => {
                return null;
            }).catch(error => {
                console.log('closeLecture fail : ' + lectureId + ", " + error)
                return null;
            })
    } else {
        console.log('changeLectureState error : ' + lectureId + ", " + lectureState);
        return null;
    }
}

const openLecture = async (lectureId: number): Promise<AxiosResponse<AttendanceNumber> | null> => {
    const headers = getHeadersWithToken() || undefined;

    return await axios.post<AttendanceNumber>(`${protocol}://${host}/api/lecture/${lectureId}/open`, {}, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.error('openLecture error : ' + error)
            return null;
        });
}

const closeLecture = async (lectureId: number): Promise<AxiosResponse<string> | null> => {
    const headers = getHeadersWithToken() || undefined;

    return await axios.post<string>(`${protocol}://${host}/api/lecture/${lectureId}/close`, {}, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.error('closeLecture error : ' + error)
            return null;
        });
}

// enrollment apis
export const getLectureEnrollmentInfo = async (lectureId: number): Promise<EnrollmentInfo | null> => {
    const headers = getHeadersWithToken() || undefined;

    return await axios.get<EnrollmentInfo>(`${protocol}://${host}/api/enrollment/${lectureId}`, {headers})
        .then(response => {
            if (response && response.data) {
                return response.data
            }

            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        })
}

export const changeStudentEnrollmentState = async (lectureId: number, studentId: number, enrollmentState: EnrollmentState): Promise<boolean> => {
    if (enrollmentState === 'APPROVAL') {
        return approvalEnrollment(lectureId, studentId)
            .then(response => {
                return true;
            }).catch(error => {
            console.log('approvalEnrollment fail : ' + error)
            return false;
        })
    } else if (enrollmentState === 'REJECTION') {
        return rejectEnrollment(lectureId, studentId)
            .then(response => {
                if (response) {
                    return true;
                } else {
                    return false;
                }
            }).catch(error => {
            console.log('rejectEnrollment fail : ' + error)
            return false;
        })
    } else {
        console.log('changeEnrollmentState error : ' + enrollmentState + "(", lectureId + ", " + studentId + ")");
    }

    return false;
}

// APPROVAL
const approvalEnrollment = async (lectureId: number, studentId: number): Promise<AxiosResponse<string> | null> => {
    const headers = getHeadersWithToken() || undefined;

    return await axios.post<string>(`${protocol}://${host}/api/enrollment/${lectureId}/student/${studentId}/approval`, {}, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.error('approvalEnrollment error : ' + error)
            return null;
        });
}

// REJECTION
const rejectEnrollment = async (lectureId: number, studentId: number) => {
    const headers = getHeadersWithToken() || undefined;

    return await axios.post<string>(`${protocol}://${host}/api/enrollment/${lectureId}/student/${studentId}/rejection`, {}, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.error('rejectEnrollment error : ' + error)
            return null;
        });
}

export const requestEnrollment = async (lectureId: number) => {
    const headers = getHeadersWithToken() || undefined;

    return await axios.post<string>(`${protocol}://${host}/api/enrollment/${lectureId}`, {}, {headers: headers})
        .then(response => {
            if (response && response.status === 200) {
                return true;
            }
            return false;
        }).catch(error => {
            console.error('requestEnrollment error : ' + error)
            return false;
        });
}

// Attendance
// 학생 Attendance 과정
// 1. 열린 강의 전부 가져오기
// 2. 출석 하기

export const requestAttendance = async (lectureId: number, payload: AttendanceRequest): Promise<boolean> => {
    const headers = getHeadersWithToken() || undefined;

    return await axios.post<string>(`${protocol}://${host}/api/attendance/${lectureId}`, payload, {headers: headers})
        .then(response => {
            if (response && response.status === 200) {
                return true;
            }
            return false;
        }).catch(error => {
            console.error('signUpNewMember error : ' + error)
            return false;
        });
}

export const getTodayAttendance = async (lectureId: number, dayMilliseconds: number): Promise<Attendance | null> => {
    const headers = getHeadersWithToken() || undefined;

    return await axios.get<Attendance>(`${protocol}://${host}/api/attendance/${lectureId}/${dayMilliseconds}`, {headers})
        .then(response => {
            if (response && response.data) {
                return response.data
            }

            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        })
}