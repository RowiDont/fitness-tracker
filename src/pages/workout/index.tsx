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
    workout &&
      setWorkout({
        ...workout,
        title: e.target.value,
      });
  };

  return workout ? (
    <div className="wrapper">
      <div className="section">
        <label htmlFor="title">Name</label>
        <input
          name="title"
          className="unstyled-input"
          onChange={titleOnChange}
          defaultValue={workout.title}
        />
      </div>
      <Log workout={workout} setWorkout={setWorkout} />
    </div>
  ) : (
    <div className="wrapper">
        <button onClick={() => setWorkout(defaultWorkout)}>Create Workout</button>
    </div>
  );
}

export default Workout;
