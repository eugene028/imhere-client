import React, { type ReactNode } from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import * as ROUTES from "@lib/routes";
import {logout} from "@lib/api";
import { Text } from "@ui/components";
import { FlexBox } from "@ui/layout";
import { BackButton } from "@components/Button";


interface LogoutButtonProps {
    children?: ReactNode
}

export function LogoutButton({ children }: LogoutButtonProps) {
    const navigate = useNavigate();
    const params = window.location.pathname.replace('/', '');

    const clickLogoutButton = () => {
        logout()
            .finally(() => {
                navigate(ROUTES.LOGIN)
            });

    };

    return (
        <div>
            <NavBar>
                <FlexBox >
                    {params === 'main'?  null : <BackButton/>}
                    <LogoutBox onClick={() => clickLogoutButton()}>             
                        <Text typo ={'Header_25'}>Logout</Text>
                    </LogoutBox>
                </FlexBox>
            </NavBar>
            <main>{children}</main>
        </div>
    );
}

const NavBar = styled.div`
    position : absolute;
    top: 20px;
    left: 40px;
    width: 100vw;
`;
const LogoutBox = styled.div`
    margin-left: auto;
    padding-right: 80px;
    cursor: pointer;
`