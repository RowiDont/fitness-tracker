import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthenticatedFetch from "../hooks/useAuthenticatedFetch";

function useGetWorkouts() {
    const authenticatedFetch = useAuthenticatedFetch();
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        if (authenticatedFetch) {
            authenticatedFetch(`${import.meta.env.VITE_API_URL}/workouts`)
                .then((response) => response.json())
                .then((data) => setWorkouts(data))
                .catch((error) => console.log("error", error));
        }
    }, [authenticatedFetch]);

    return { workouts };
}

function App() {
    const { workouts } = useGetWorkouts();
    console.log(workouts);

    return <Link to="/workouts">Start Workout</Link>;
}

export default App;
