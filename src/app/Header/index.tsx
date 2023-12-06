import styled from "styled-components";
import { LoginButton, LogoutButton } from "./auth/Buttons";
import Profile from "./auth/Profile";

const AuthHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
    height: 30px;
    background: lightcoral;
`;

export default function Header() {
    return (
        <AuthHeader>
            <Profile />
            <LoginButton />
            <LogoutButton />
        </AuthHeader>
    );
}
