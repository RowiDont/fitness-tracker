import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageWrapper from "@/components/PageWrapper";
import WorkoutList from "./WorkoutList";
import Header from "./Header";
import WorkoutEditor from "./WorkoutEditor";
import { Workout } from "@/types";

export default function App() {
    const { isLoading } = useAuth0();
    const [workout, setWorkout] = useState<Workout>();

    console.log(workout);
    return (
        <PageWrapper>
            <Header />
            {isLoading ? (
                <div>Loading ...</div>
            ) : workout ? (
                <WorkoutEditor workout={workout} setWorkout={setWorkout} />
            ) : (
                <WorkoutList setWorkout={setWorkout} />
            )}
        </PageWrapper>
    );
}
