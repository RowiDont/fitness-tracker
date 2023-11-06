import { useState } from "react";
import Log from "./_log";
import type { Workout } from "../../types";
import "./index.css";

const defaultWorkout: Workout = {
  title: `${new Date().toLocaleDateString()} Workout`,
  log: [],
};

function Workout() {
  const [workout, setWorkout] = useState<Workout | null>(null);

  const titleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    workout && setWorkout({
      ...workout,
      title: e.target.value,
    });
  };

  return (
    <div>
      {workout ? (
        <>
            <label htmlFor="title">Name</label>
            <input
                name="title"
                className="unstyled-input"
                onChange={titleOnChange}
                defaultValue={workout.title}
            />
            <Log workout={workout} setWorkout={setWorkout} />
        </>
      ) : (
        <button onClick={() => setWorkout(defaultWorkout)}>
          Create Workout
        </button>
      )}
    </div>
  );
}

export default Workout;
