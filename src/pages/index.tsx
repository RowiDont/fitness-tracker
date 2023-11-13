import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PageWrapper from "../components/PageWrapper";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }
        >
            Log Out
        </button>
    );
};

const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated &&
        user && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
};

function App() {
    return (
        <PageWrapper>
            <LoginButton />
            <Profile />
            <Link to="/workout">Start Workout</Link>
            <LogoutButton />
        </PageWrapper>
    );
}

export default App;
