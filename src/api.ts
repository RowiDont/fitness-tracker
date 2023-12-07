import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { Workout } from "@/types";

export const WorkoutApiContext = createContext<WorkoutApi | null>(null);

export function useAuthenticatedWorkoutApi() {
    const [client, setClient] = useState<WorkoutApi | null>(null);
    const { user, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        async function initializeClient() {
            const token = await getAccessTokenSilently();
            setClient(new WorkoutApi(token));
        }
        if (user) {
            initializeClient();
        }
    }, [user, getAccessTokenSilently]);

    return client;
}

export class WorkoutApi {
    token: string;

    constructor(token: string) {
        this.token = token;
    }

    async getWorkouts() {
        const response = await fetch(`${this.baseUrl}`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        this.handleError(response);

        return response.json() as Promise<Workout[]>;
    }

    async createWorkout(workout: Partial<Workout>) {
        const response = await fetch(`${this.baseUrl}`, {
            method: "POST",
            headers: {
                ...this.headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ workout }),
        });

        this.handleError(response);

        return response.json() as Promise<Workout>;
    }

    async updateWorkout(workout: Workout) {
        const response = await fetch(`${this.baseUrl}/${workout._id}`, {
            method: "PUT",
            headers: {
                ...this.headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ workout }),
        });

        this.handleError(response);

        return response.json() as Promise<Workout>;
    }

    handleError(response: Response) {
        if (!response.ok) {
            throw new Error(
                `The fetch request failed: (${response.status}) ${response.statusText}`,
            );
        }
    }

    get headers() {
        return {
            Authorization: `Bearer ${this.token}`,
        };
    }

    get baseUrl() {
        return `${import.meta.env.VITE_API_URL}/workouts`;
    }
}
