import { useState } from "react";
import Log from "./_log";
import Section from "../../components/Section";
import MinimalInput from "../../components/MinimalInput";
import PageWrapper from "../../components/PageWrapper";
import type { Workout } from "../../types";

const defaultWorkout: Workout = {
    title: `${new Date().toLocaleDateString()} Workout`,
    log: [],
};

function Workout() {
    const [workout, setWorkout] = useState<Workout | null>(null);

    const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        workout &&
            setWorkout({
                ...workout,
                title: e.target.value,
            });
    };

    console.log(workout);
    return workout ? (
        <PageWrapper>
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
        </PageWrapper>
    ) : (
        <PageWrapper>
            <button onClick={() => setWorkout(defaultWorkout)}>
                Create Workout
            </button>
        </PageWrapper>
    );
}

export default Workout;
