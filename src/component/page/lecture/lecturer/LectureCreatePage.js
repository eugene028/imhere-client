import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import {checkUserHasRole} from "../../../../util/AuthFunctions";
import * as ROUTES from "../../../../constants/routes";
import {createLecture} from "../../../../api";

const CreateLectureArea = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 10px;
  margin-top: 10px;
  width: 25vw;
  position: relative;
`

const CreateButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 10px;
  margin-top: 10px;
  width: 20vw;
`

const Button = styled.button`
  font-size: 10px;
  min-width: 25vw;
`

const Title = styled.button`
  font-size: 10px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  color: black;
`

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

    const handleValue = (event) => {
        const {value} = event.target;
        setLectureName(value);
    }

    const requestCreateLecture = () => {
        if (lectureName) {
            console.log(lectureName);
            createLecture(lectureName)
                .then(reponse => {
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
                <input type='text' className='input-lectureName' name='lectureName' placeholder='강의 이름을 입력하세요'
                       value={lectureName} onChange={handleValue}/>
                <CreateButton>
                    <Button type='button' className='create-button' onClick={() => requestCreateLecture()}> 강의 만들기 </Button>
                </CreateButton>
            </CreateLectureArea>
        </>
    )
}