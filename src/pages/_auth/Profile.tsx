import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
    const { user, isAuthenticated } = useAuth0();

    if (!user) {
        return null;
    }

    return (
        isAuthenticated &&
        user && (
            <div>
                <h2>{user.name}</h2>
            </div>
        )
    );
}
