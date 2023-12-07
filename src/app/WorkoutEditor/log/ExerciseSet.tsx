import styled from "styled-components";
import type { ExerciseSet } from "@/types";
import MinimalInput from "@/components/MinimalInput";

const StyledExerciseSet = styled.div`
    display: flex;
    flex-direction: column;
    width: 50px;
    padding: 5px;
    margin-bottom: 5px;
`;

type Props = {
    index: number;
    exerciseSet: ExerciseSet;
    updateSet: (index: number, set: ExerciseSet) => void;
    removeSet: (index: number) => void;
};

function ExerciseSet({ index, exerciseSet, updateSet, removeSet }: Props) {
    const setReps = (reps: number) => {
        updateSet(index, {
            ...exerciseSet,
            reps,
        });
    };

    const setWeight = (weight: number) => {
        updateSet(index, {
            ...exerciseSet,
            weight,
        });
    };

    return (
        <StyledExerciseSet>
            <label>
                Reps
                <MinimalInput
                    name="reps"
                    className="unstyled-input"
                    type="number"
                    onChange={(e) => setReps(e.target.valueAsNumber)}
                    value={exerciseSet.reps}
                />
            </label>

            <label>
                Weight
                <MinimalInput
                    name="weight"
                    className="unstyled-input"
                    type="number"
                    value={exerciseSet.weight}
                    onChange={(e) => setWeight(e.target.valueAsNumber)}
                />
            </label>
            <button
                style={{ fontSize: "8px" }}
                onClick={() => removeSet(index)}
            >
                DELETE
            </button>
        </StyledExerciseSet>
    );
}

export default ExerciseSet;
