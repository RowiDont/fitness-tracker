import { useEffect, useMemo, useState } from "react";
import { throttle } from "lodash";
import { useParams } from "../../router";
import Log from "./_log";
import Section from "../../components/Section";
import MinimalInput from "../../components/MinimalInput";
import useAuthenticatedFetch from "../../hooks/useAuthenticatedFetch";
import type { Workout } from "../../types";

// const defaultWorkout: Workout = {
//     title: `${new Date().toLocaleDateString()} Workout`,
//     log: [],
// };

const workoutData = (workout: Workout) => ({
    id: workout.id,
    title: workout.title,
    log: workout.log,
});

const useGetWorkout = (id: string) => {
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const authenticatedFetch = useAuthenticatedFetch();

    useEffect(() => {
        if (id && authenticatedFetch) {
            authenticatedFetch(`${import.meta.env.VITE_API_URL}/workouts/${id}`)
                .then((response) => response.json())
                .then((data) => setWorkout(workoutData(data)))
                .catch((error) => setError(error));
        }
    }, [id, authenticatedFetch]);

    return {
        error,
        workout,
        setWorkout,
    };
};

const useSaveWorkout = () => {
    const authenticatedFetch = useAuthenticatedFetch();

    const saveCallback = useMemo(() => {
        if (!authenticatedFetch) {
            return null;
        }

        return throttle((workout: Workout) => {
            console.log("saving workout", workout);
            authenticatedFetch(
                `${import.meta.env.VITE_API_URL}/workouts/${workout.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ workout }),
                },
            );
        }, 5000);
    }, [authenticatedFetch]);
    // const saveCallback = (updatedWorkout: Workout) => {
    //     console.log("saving workout", updatedWorkout);
    //     if (!authenticatedFetch || !updatedWorkout) { return; }

    //     authenticatedFetch(`${import.meta.env.VITE_API_URL}/workouts/${updatedWorkout.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(updatedWorkout),
    //     })
    // }

    return saveCallback;
};

function Workout() {
    const { id } = useParams("/workouts/:id");
    const { workout, setWorkout, error } = useGetWorkout(id);
    const saveWorkout = useSaveWorkout();

    const updateWorkout = (workout: Workout) => {
        setWorkout(workout);
        saveWorkout && saveWorkout(workout);
    };

    const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        workout &&
            updateWorkout({
                ...workout,
                title: e.target.value,
            });
    };

    if (error) {
        return <div>{error.message}</div>;
    }

    return workout ? (
        <>
            <Section>
                <label>
                    Name
                    <MinimalInput
                        name="title"
                        className="unstyled-input"
                        onChange={titleOnChange}
                        defaultValue={workout.title}
                    />
                </label>
            </Section>
            <Log workout={workout} setWorkout={updateWorkout} />
        </>
    ) : null;
}

export default Workout;
