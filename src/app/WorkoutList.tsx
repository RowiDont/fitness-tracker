import { useState, useEffect } from "react";
import useAuthenticatedFetch from "@/hooks/useAuthenticatedFetch";
import type { Workout } from "@/types";

function useGetWorkouts() {
    const authenticatedFetch = useAuthenticatedFetch();
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        if (authenticatedFetch) {
            authenticatedFetch(`${import.meta.env.VITE_API_URL}/workouts`)
                .then((response) => response.json())
                .then((data) => setWorkouts(data))
                .catch((error) => console.log("error", error));
        }
    }, [authenticatedFetch]);

    return { workouts };
}

function WorkoutList({
    setWorkout,
}: {
    setWorkout: (workout: Workout) => void;
}) {
    const { workouts } = useGetWorkouts();

    return (
        <ul>
            {workouts.map((workout) => (
                <li key={workout._id}>
                    {workout.title} - {workout.userId}
                    <button onClick={() => setWorkout(workout)}>Select</button>
                </li>
            ))}
        </ul>
    );
}

export default WorkoutList;
