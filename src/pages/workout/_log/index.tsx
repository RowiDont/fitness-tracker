import type { Workout } from "../../../types";
// import './index.css';

type Props = {
  workout: Workout;
  setWorkout: (workout: Workout) => void;
};

function Log({ workout, setWorkout }: Props) {
  return <div className="section">Logs</div>;
}

export default Log;
