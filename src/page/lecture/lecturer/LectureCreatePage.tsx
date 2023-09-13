import { useState, useEffect } from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {checkUserHasRole} from "@util/AuthFunctions";
import * as ROUTES from "@lib/routes";
import {createLecture} from "@lib/api";
import { Input, Button, Spacing } from "@ui/components";
import useToastify from "@lib/hooks/useToastify";

export const LectureCreatePage = () => {
    const [lectureName, setLectureName] = useState('');
    const navigate = useNavigate();
    const { setToast } = useToastify()

    useEffect(() => {
        if (!checkUserHasRole(['ROLE_ADMIN', 'ROLE_LECTURER'])) {
            navigate(ROUTES.LOGIN);
        } else {
            setToast({comment:'강의 삭제가 불가능하므로 신중히 만들어주세요!', type:'warning'})
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
                    setToast({comment:`강의가 생성되었습니다.`, type:'success'})
                    navigate(ROUTES.LECTURES);
                })
                .catch(error => {
                    setToast({comment:'에러 발생! 관리자에게 문의하세요', type:'error'})
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