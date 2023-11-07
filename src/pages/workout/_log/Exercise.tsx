import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import type { Exercise } from "../../../types";

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
    // const [value, setValue] = useState<string | null>(defaultValue);

    const handleCreate = (inputValue: string) => {
        setIsLoading(true);
        setTimeout(() => {
            // TODO create or fetch exercise in backend

            // Update options state with new exercise
            setExerciseOptions([...exerciseOptions, inputValue]);
            setExerciseTitle(inputValue);

            // Update workout

            setIsLoading(false);
        }, 2000);
    };

    const setExerciseTitle = (title: string) => {
        updateLog(logIndex, {
            ...exercise,
            title,
        });
    };

    const formattedOptions = exerciseOptions.map(stringToOption);

    return (
        <div className="section">
            <CreatableSelect
                isClearable
                isLoading={isLoading}
                isDisabled={isLoading}
                onCreateOption={handleCreate}
                options={formattedOptions}
                value={exercise.title ? stringToOption(exercise.title) : null}
                onChange={(value) => setExerciseTitle(value?.value || "")}
                placeholder="Select or create an exercise"
            />
            <button onClick={() => deleteExercise(logIndex)}>
                Delete Exercise
            </button>
        </div>
    );
}

export default Exercise;
