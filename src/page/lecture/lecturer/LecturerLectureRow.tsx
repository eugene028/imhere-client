
import styled from "styled-components";

const Lecture = styled.div`
  display: grid;
  grid-template-columns: 10% 50% 30% 10%;
  padding: 5px 20px;
  align-items: center;

  > div {
    border-right: 1px solid #ddd;
    text-align: center;

    &:last-child {
      border-right: none;
      text-align: center;
    }
  }
`

const Button = styled.button`
  font-size: 15px;
`

const LectureRowWrapper = styled.div`
  padding: 25px 10px;
  border-radius: 10px;
`

interface LecturerLectureRowProps {
  index: number,
  lecture: Lecture
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const LecturerLectureRow = ({index, lecture, onClick}: LecturerLectureRowProps) => {
    return (
        <LectureRowWrapper onClick={onClick}>
            <Lecture>
                <div className="lecture-index">{index + 1}</div>
                <div className="lecture-name">{lecture.lectureName || 'loading..'}</div>
                {/*<div className="lecturer-name">{lecture.lecturerName} 강사</div>*/}
                <div className="lecture-state">{lecture.lectureState || 'loading..'}</div>
            </Lecture>
        </LectureRowWrapper>
    );
};

export default LecturerLectureRow;