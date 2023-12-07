import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import ExerciseSet from "./ExerciseSet";
import Section from "@/components/Section";
import type { Exercise, ExerciseSet as ExerciseSetType } from "@/types";

const ExerciseSetWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
`;

type Props = {
    logIndex: number;
    updateLog: (index: number, exercise: Exercise) => void;
    deleteExercise: (index: number) => void;
    exercise: Exercise;
};

const defaultExerciseOptions = [
    "DB Bench Press",
    "Deadlift",
    "BB Squat",
    "BB Bench Press",
];

const stringToOption = (str: string) => ({
    value: str,
    label: str,
});

function Exercise({ logIndex, updateLog, deleteExercise, exercise }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [exerciseOptions, setExerciseOptions] = useState<string[]>(
        defaultExerciseOptions,
    );

    const handleCreate = (inputValue: string) => {
        setIsLoading(true);
        setTimeout(() => {
            // TODO create or fetch exercise in backend

            // Update options state with new exercise
            setExerciseOptions([...exerciseOptions, inputValue]);
            setExerciseTitle(inputValue);

            setIsLoading(false);
        }, 1000);
    };

    const setExerciseTitle = (title: string) => {
        updateLog(logIndex, {
            ...exercise,
            title,
        });
    };

    const addSet = () => {
        updateLog(logIndex, {
            ...exercise,
            sets: [
                ...exercise.sets,
                { reps: 0, weight: 0, createdAt: new Date() },
            ],
        });
    };

    const updateSet = (setIndex: number, set: ExerciseSetType) => {
        updateLog(logIndex, {
            ...exercise,
            sets: [
                ...exercise.sets.slice(0, setIndex),
                set,
                ...exercise.sets.slice(setIndex + 1),
            ],
        });
    };

    const removeSet = (setIndex: number) => {
        updateLog(logIndex, {
            ...exercise,
            sets: [
                ...exercise.sets.slice(0, setIndex),
                ...exercise.sets.slice(setIndex + 1),
            ],
        });
    };

    const formattedOptions = exerciseOptions.map(stringToOption);

    return (
        <Section>
            <TitleWrapper>
                <CreatableSelect
                    styles={{
                        container: (baseStyles) => ({
                            ...baseStyles,
                            width: "90%",
                        }),
                    }}
                    isClearable
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    onCreateOption={handleCreate}
                    options={formattedOptions}
                    value={
                        exercise.title ? stringToOption(exercise.title) : null
                    }
                    onChange={(value) => setExerciseTitle(value?.value || "")}
                    placeholder="Select or create an exercise"
                />
                <button onClick={() => deleteExercise(logIndex)}>
                    <BiTrash />
                </button>
            </TitleWrapper>
            <ExerciseSetWrapper>
                {exercise.sets.map((set, index) => (
                    <ExerciseSet
                        key={index}
                        index={index}
                        exerciseSet={set}
                        updateSet={updateSet}
                        removeSet={removeSet}
                    />
                ))}
            </ExerciseSetWrapper>
            {exercise.title ? <button onClick={addSet}>Add Set</button> : null}
        </Section>
    );
}

export default Exercise;
