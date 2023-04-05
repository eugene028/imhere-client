import axios from "axios";
import {getHeadersWithToken, removeToken} from "./util/AuthFunctions";

const protocol = `https`
const host = `api.imhere.im`

export const generateVerificationNumber = async email => {
    return await axios.post(`${protocol}://${host}/member/verification/${email}`)
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

// TODO
export const verifyValidateNumber = async (email, verificationCode) => {
    return await axios.get(`${protocol}://${host}/member/verification/${email}/${verificationCode}`)
        .then(response => {
            if (response && response.data && response.data === true) {
                return true;
            }
            return false;
        }).catch(error => {
            console.error('generateVerificationNumber error : ' + error)
            return false;
        });
}

export const signUpNewMember = async (univId, name, password) => {
    const payload = {
        "univId": `${univId}`,
        "name": `${name}`,
        "password": `${password}`
    }

    const headers = {
        'Content-Type': 'application/json'
    }

    return await axios.post(`${protocol}://${host}/member/new`, payload, {headers: headers})
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

export const requestSignIn = async (univId, password) => {
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

export const logout = async () => {
    const headers = getHeadersWithToken();

    if (!headers) {
        return;
    }

    return axios.post(`${protocol}://${host}/logout`, {}, {headers})
        .finally(final => {
            removeToken();
            alert('로그아웃 완료')
        });
}


// lecturer
// <Button type='button' className='own-lecture-button'> 내가 만든 강의 불러오기 </Button>
// <Button type='button' className='enrollment-approve-button'> 수강 학생 승인하기 </Button>
// <Button type='button' className='lecture-create-button'> 새 강의 만들기 </Button>

export const getStudentsLectures = async () => {
    const headers = getHeadersWithToken();

    return await axios.get(`${protocol}://${host}/api/v1/students/lectures`, {headers})
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

export const getAllStudentsLectures = async () => {
    const headers = getHeadersWithToken();

    return await axios.get(`${protocol}://${host}/api/v1/students/all-lectures`, {headers})
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

export const getLecturersLectures = async () => {
    const headers = getHeadersWithToken();

    return await axios.get(`${protocol}://${host}/api/v1/lectures`, {headers})
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

export const getLecturersEnrollment = async lectureId => {
    const headers = getHeadersWithToken();

    return await axios.get(`${protocol}://${host}/api/v1/enrollment/${lectureId}`, {headers})
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


export const requestEnrollment = async (lectureId) => {
    const headers = getHeadersWithToken();

    return await axios.post(`${protocol}://${host}/api/v1/students/enrollment/${lectureId}`, {}, {headers: headers})
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

// @PostMapping("/api/v1/enrollment/{lecture_id}/student/{student_id}/approval")
// @PostMapping("/api/v1/enrollment/{lecture_id}/student/{student_id}/rejection")

export const changeEnrollmentState = async (lectureId, studentId, enrollmentState) => {
    if (enrollmentState === 'APPROVAL') {
        approvalEnrollment(lectureId, studentId)
            .then(response => {
                return true;
            }).catch(error => {
            console.log('approvalEnrollment fail : ' + error)
            return false;
        })
    } else if (enrollmentState === 'REJECTION') {
        rejectEnrollment(lectureId, studentId)
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
}

// APPROVAL
const approvalEnrollment = async (lectureId, studentId) => {
    const headers = getHeadersWithToken();

    return await axios.post(`${protocol}://${host}/api/v1/enrollment/${lectureId}/student/${studentId}/approval`, {}, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.error('approvalEnrollment error : ' + error)
            return null;
        });
}

// REJECTION
const rejectEnrollment = async (lectureId, studentId) => {
    const headers = getHeadersWithToken();

    return await axios.post(`${protocol}://${host}/api/v1/enrollment/${lectureId}/student/${studentId}/rejection`, {}, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.error('rejectEnrollment error : ' + error)
            return null;
        });
}

// 강의 열고 닫기
// @PostMapping("/api/v1/lectures/{lecture_id}/open")
// @PostMapping("/api/v1/lectures/{lecture_id}/close")

export const changeLectureState = async (lectureId, lectureState) => {
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

const openLecture = async (lectureId) => {
    const headers = getHeadersWithToken();

    return await axios.post(`${protocol}://${host}/api/v1/lectures/${lectureId}/open`, {}, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.error('openLecture error : ' + error)
            return null;
        });
}

const closeLecture = async (lectureId) => {
    const headers = getHeadersWithToken();

    return await axios.post(`${protocol}://${host}/api/v1/lectures/${lectureId}/close`, {}, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.error('closeLecture error : ' + error)
            return null;
        });
}

// 출석 시퀀스
// getStudentOpenLectures
// @GetMapping("/api/v1/students/open-lectures")


// 강의 생성
// @PostMapping("/api/v1/lectures")
// createLecture
export const createLecture = async (lectureName) => {
    const headers = getHeadersWithToken();

    const payload = {
        "lectureName": `${lectureName}`
    }

    return await axios.post(`${protocol}://${host}/api/v1/lectures`, payload, {headers: headers})
        .then(response => {
            return response;
        }).catch(error => {
            console.log('createLecture error : ' + error);
        });
}

// Attendance
// @GetMapping("/api/v1/lecturer/{lecture_id}/attendance/{day_milliseconds}")
export const getTodayAttendance = async (lectureId, dayMilliseconds) => {
    const headers = getHeadersWithToken();

    return await axios.get(`${protocol}://${host}/api/v1/lecturer/${lectureId}/attendance/${dayMilliseconds}`, {headers})
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


// 학생 Attendance 과정
// 1. 열린 강의 전부 가져오기
// 2. 출석 하기

export const getAllStudentsOPENLectures = async () => {
    const headers = getHeadersWithToken();

    return await axios.get(`${protocol}://${host}/api/v1/students/open-lectures`, {headers})
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

export const requestAttendance = async (lectureId, payload) => {
    const headers = getHeadersWithToken();

    return await axios.post(`${protocol}://${host}/api/v1/students/attendance/${lectureId}`, payload, {headers: headers})
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