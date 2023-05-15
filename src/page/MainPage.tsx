import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { checkAndGetUserRole } from "@util/AuthFunctions";
import * as ROUTES from "@lib/routes";
import LoadingSpinner from "../component/LoadingSpinner";
import { Button, Text  } from "@ui/components";
import { FlexBox } from "@ui/layout";
import styled from "styled-components";
import { media } from "@ui/theme";
import { useResponsive } from "@lib/useResponsive";

export const MainPage = () => {
    const [role, setRole] = useState<string | null>(null);
    const { isPC } = useResponsive();
    const navigate = useNavigate();

    useEffect(() => {
        const role = checkAndGetUserRole();
        if (!role) {
            navigate(ROUTES.LOGIN);
        } else {
            setRole(role);
        }
    }, []);

    return (
        <>
            {
                role ?
                    role === 'ROLE_STUDENT'
                        ?
                        // 학생
                        <Wrapper>
                            {isPC ? <Text typo = {'Header_30'}>오늘도 열공하세요 :)</Text> : <Text typo = {'Header_25'}>오늘도 열공하세요 :)</Text>}
                            <FlexBox direction={'column'} gap = {24} >
                                <Button varient="main" onClick={() => navigate(ROUTES.LECTURES)}> 내 강의 </Button>
                                <Button varient="main" onClick={() => navigate(ROUTES.ATTENDANCE)}> 출석하기 </Button>
                                <Button varient="main" onClick={() => navigate(ROUTES.ENROLLMENT)}> 강의 수강 신청 </Button>
                            </FlexBox>
                        </Wrapper>
                            :
                            // 강사
                        <Wrapper>
                            
                            <FlexBox direction={'column'} gap = {24} >
                                <Button varient="main" onClick={() => navigate(ROUTES.LECTURES)}> 내 강의 </Button>
                                <Button varient="main" onClick={() => navigate(ROUTES.LECTURE_CREATE)}> 새 강의 만들기 </Button>
                                <Button varient="main" onClick={() => navigate(ROUTES.MANAGE_ENROLLMENT)}> 수강 학생 승인하기 </Button>
                            </FlexBox>
                        </Wrapper>
                        :
                    <LoadingSpinner />
            }
        </>
    )
}

const Wrapper = styled.div`
    width: 388px;
    div {
        margin-top: 38px;
    }
    ${media.mobile} {
        width: 60vw;
        div{
            margin-top: 15px;
        }
    }
`
