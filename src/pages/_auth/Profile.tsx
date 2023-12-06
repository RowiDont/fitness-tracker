import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const ProfileWrapper = styled.div`
    color: white;
`;

export default function Profile() {
    const { user, isAuthenticated } = useAuth0();

    if (!user) {
        return null;
    }

    return (
        isAuthenticated &&
        user && (
            <ProfileWrapper>
                <h2>{user.name}</h2>
            </ProfileWrapper>
        )
    );
}
