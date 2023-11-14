import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { LoginButton, LogoutButton } from "./_auth/Buttons";
import Profile from "./_auth/Profile";

function Loader() {
    const { isLoading } = useAuth0();

    return isLoading ? <div>Loading ...</div> : <Outlet />;
}

export default function App() {
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            }}
        >
            <PageWrapper>
                <Loader />
                <LoginButton />
                <LogoutButton />
                <Profile />
            </PageWrapper>
        </Auth0Provider>
    );
}
