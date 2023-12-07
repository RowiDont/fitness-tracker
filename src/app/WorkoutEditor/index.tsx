import { useContext } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import Log from "./log";
import Section from "@/components/Section";
import MinimalInput from "@/components/MinimalInput";
import type { Workout } from "@/types";
import { useEffect } from "react";
import { WorkoutApiContext } from "@/api";

type Props = {
    workout: Workout;
    setWorkout: (workout: Workout) => void;
};

function WorkoutEditor({ workout, setWorkout }: Props) {
    const apiClient = useContext(WorkoutApiContext);

    const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        workout &&
            setWorkout({
                ...workout,
                title: e.target.value,
            });
    };

    const debouncedWorkout = useDebounce(workout, 5000);

    useEffect(() => {
        if (debouncedWorkout && apiClient) {
            apiClient.updateWorkout(debouncedWorkout);
        }
    }, [debouncedWorkout, apiClient]);

    console.log(workout);
    return (
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
            <Log workout={workout} setWorkout={setWorkout} />
        </>
    );
}

export default WorkoutEditor;
