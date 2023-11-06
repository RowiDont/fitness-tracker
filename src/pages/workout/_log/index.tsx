import type { Workout } from "../../../types";

type Props = {
  workout: Workout;
  setWorkout: (workout: Workout) => void;
};

function Log({ workout, setWorkout }: Props) {
  return <div>Log</div>;
}

export default Log;
