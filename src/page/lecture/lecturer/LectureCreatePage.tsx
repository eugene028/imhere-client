import { useState, useEffect } from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {checkUserHasRole} from "@util/AuthFunctions";
import * as ROUTES from "@lib/routes";
import {createLecture} from "@lib/api";
import { Input, Button, Spacing } from "@ui/components";

export const LectureCreatePage = () => {
    const [lectureName, setLectureName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!checkUserHasRole(['ROLE_ADMIN', 'ROLE_LECTURER'])) {
            navigate(ROUTES.LOGIN);
        } else {
            alert('신중하게 만들어주세요!');
        }
    }, []);

    const handleValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {value} = event.target;
        setLectureName(value);
    }

    const requestCreateLecture = () => {
        if (lectureName) {
            createLecture(lectureName)
                .then(response => {
                    alert('강의 생성이 완료되었습니다.');
                    navigate(ROUTES.MAIN_PAGE);
                })
                .catch(error => {
                    alert('에러 발생! 관리자에게 문의하세요')
                    navigate(ROUTES.MAIN_PAGE);
                })

        }
    }

    return (
        <>
            <CreateLectureArea>
                <Input placeholder="강의 이름을 입력하세요" value = {lectureName} onChange={handleValue} big={true}/>
                <Spacing size = {20}/>
                <Button type='button' varient = {'regular'} onClick={() => requestCreateLecture()}> 강의 만들기 </Button>
            </CreateLectureArea>
        </>
    )
}

const CreateLectureArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-top: 10px;
  min-width: 30vw;
  position: relative;
`