import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

type AuthenticatedFetch = (
    url: string,
    options?: RequestInit,
) => Promise<Response>;

export default function useAuthenticatedFetch() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [authenticatedFetch, setAuthenticatedFetch] =
        useState<AuthenticatedFetch>();

    useEffect(() => {
        if (user) {
            setAuthenticatedFetch(() => {
                return async (url: string, options?: RequestInit) => {
                    const accessToken = await getAccessTokenSilently();

                    const response = await fetch(
                        `${import.meta.env.VITE_API_URL}${url}`,
                        {
                            ...options,
                            headers: {
                                ...options?.headers,
                                Authorization: `Bearer ${accessToken}`,
                            },
                        },
                    );

                    if (!response.ok) {
                        throw new Error(
                            `The fetch request failed: (${response.status}) ${response.statusText}`,
                        );
                    }

                    return response;
                };
            });
        }
    }, [user, getAccessTokenSilently]);

    return authenticatedFetch;
}
