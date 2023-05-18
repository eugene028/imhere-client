type LectureState = 'OPEN' | 'CLOSED' | 'TERMINATED'
type EnrollmentState = 'APPROVAL' | 'REJECTION' | 'AWAIT'


interface SignUpRequest {
    // 회원가입 email에서 @와 도메인을 포함한 부분을 제외한 앞 부분
    univId: string,
    name: string,
    password: string
}

interface RoleChangeRequest {
    // example: ex) ROLE_STUDENT / ROLE_LECTURER / ROLE_ADMIN 과 같은 String
    // role을 string으로 표현합니다.
    role: string
}

interface LectureCreateRequest {
    // 생성할 강좌 이름
    lectureName: string
}

interface AttendanceNumber {
    attendanceNumber: number
}

interface AttendanceRequest {
    // 출석 번호
    attendanceNumber: number | undefined,
    // 홍익대학교 T동과의 거리로 m 단위입니다.
    distance: string,
    // Geolocation API가 제공하는 거리 오차 정확도로 m 단위입니다.
    accuracy: string,
    // 밀리 세컨즈 출석 시각 js Date 객체의 getTime으로 얻어낸 값
    milliseconds: number
}

interface Lecture {
    lectureId: number,
    lectureName: string,
    lecturerName: string,
    lectureState: "OPEN" | "CLOSED" | "TERMINATED",
    studentInfos: StudentInfo[]
}

// 강사의 경우 본인 수업 학생 리스트 받아볼 수 있음
interface StudentInfo {
    id: number,
    univId: string,
    name: string

    // swagger UI schema에는 없지만 StudentEnrollmentStateRow등에서 쓰임
    enrollmentState: EnrollmentState
}

interface EnrollmentInfo {
    lectureId: number
    lectureName: string
    lecturerName: string
    // 학생 정보와 수강신청 승인 상태 리스트
    studentInfos: StudentInfo[]
}

interface Attendance {
    lectureName: string,
    lecturerName: string,
    attendanceInfos: AttendanceInfo[]
}

// 출석 정보 AttendanceInfo 리스트
interface AttendanceInfo {
    univId: string,
    name: string,
    distance: string,
    accuracy: string,
    timestamp: string
}
