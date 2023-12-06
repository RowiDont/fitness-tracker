import { useAuth0 } from "@auth0/auth0-react";

export function LoginButton() {
    const { loginWithRedirect, user, isLoading } = useAuth0();

    if (user || isLoading) {
        return null;
    }

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
}

export function LogoutButton() {
    const { logout, user } = useAuth0();

    if (!user) {
        return null;
    }

    return (
        <button
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }
        >
            Log Out
        </button>
    );
}
