import type { Workout } from "@/types";
import Exercise from "./Exercise";

type Props = {
    workout: Workout;
    setWorkout: (workout: Workout) => void;
};

function Log({ workout, setWorkout }: Props) {
    const addExercise = () => {
        setWorkout({
            ...workout,
            log: [
                ...(workout.log || []),
                {
                    title: "",
                    sets: [],
                },
            ],
        });
    };

    const updateLog = (index: number, exercise: Exercise) => {
        setWorkout({
            ...workout,
            log: [
                ...workout.log.slice(0, index),
                exercise,
                ...workout.log.slice(index + 1),
            ],
        });
    };

    const deleteExercise = (index: number) => {
        setWorkout({
            ...workout,
            log: [
                ...workout.log.slice(0, index),
                ...workout.log.slice(index + 1),
            ],
        });
    };

    const exercises = workout.log
        ? workout.log
              .map((exercise, index) => (
                  <Exercise
                      key={index}
                      exercise={exercise}
                      logIndex={index}
                      updateLog={updateLog}
                      deleteExercise={deleteExercise}
                  />
              ))
              .reverse()
        : [];

    return (
        <>
            <button onClick={addExercise}>Add Exercise</button>
            {exercises}
        </>
    );
}

export default Log;
