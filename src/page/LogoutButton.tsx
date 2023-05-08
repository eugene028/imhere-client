import React, { type ReactNode } from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import * as ROUTES from "../lib/routes";
import {logout} from "../api";
import {removeToken} from "../util/AuthFunctions";

const Button = styled.button`
  position: fixed;
  top: 5%;
  right: 5%;
  font-size: 15px;
  border: 3px solid;
  border-radius: 10px;
  background-color: transparent;
`

interface LogoutButtonProps {
    children?: ReactNode
}

export function LogoutButton({ children }: LogoutButtonProps) {
    const navigate = useNavigate();
    const clickLogoutButton = () => {
        logout()
            .finally(() => {
                navigate(ROUTES.LOGIN)
            });

    };

    return (
        <div>
            <header>
                <nav>
                    <Button onClick={() => clickLogoutButton()} >Logout</Button>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    );
}
