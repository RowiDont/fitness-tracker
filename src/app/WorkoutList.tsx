import { useContext, useState, useEffect } from "react";
import type { Workout } from "@/types";
import { WorkoutApiContext } from "@/api";

type Props = {
    setWorkout: (workout: Workout) => void;
};

function WorkoutList({ setWorkout }: Props) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const apiClient = useContext(WorkoutApiContext);

    useEffect(() => {
        if (apiClient) {
            apiClient.getWorkouts().then((workouts) => setWorkouts(workouts));
        }
    }, [apiClient]);

    const createWorkout = () => {
        apiClient &&
            apiClient
                .createWorkout({
                    title: "New Workout",
                    log: [],
                })
                .then((workout) => setWorkouts([...workouts, workout]));
    };

    return (
        <ul>
            {workouts.map((workout) => (
                <li key={workout._id}>
                    {workout.title} - {workout.userId}
                    <button onClick={() => setWorkout(workout)}>Select</button>
                </li>
            ))}
            <li>
                <button onClick={createWorkout}>Create Workout</button>
            </li>
        </ul>
    );
}

export default WorkoutList;
