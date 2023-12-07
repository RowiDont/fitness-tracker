import Log from "./log";
import Section from "@/components/Section";
import MinimalInput from "@/components/MinimalInput";
import type { Workout } from "@/types";

type Props = {
    workout: Workout;
    setWorkout: (workout: Workout) => void;
};

function WorkoutEditor({ workout, setWorkout }: Props) {
    const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        workout &&
            setWorkout({
                ...workout,
                title: e.target.value,
            });
    };

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
