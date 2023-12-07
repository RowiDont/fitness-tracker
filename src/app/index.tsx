import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageWrapper from "@/components/PageWrapper";
import WorkoutList from "./WorkoutList";
import Header from "./Header";
import WorkoutEditor from "./WorkoutEditor";
import { Workout } from "@/types";
import { useAuthenticatedWorkoutApi, WorkoutApiContext } from "@/api";

function AuthenticatedApp() {
    const [workout, setWorkout] = useState<Workout>();
    const client = useAuthenticatedWorkoutApi();

    return (
        <WorkoutApiContext.Provider value={client}>
            {workout ? (
                <WorkoutEditor workout={workout} setWorkout={setWorkout} />
            ) : (
                <WorkoutList setWorkout={setWorkout} />
            )}
        </WorkoutApiContext.Provider>
    );
}

export default function App() {
    const { isLoading, user } = useAuth0();

    return (
        <PageWrapper>
            <Header />
            {isLoading ? (
                <div>Loading ...</div>
            ) : user ? (
                <AuthenticatedApp />
            ) : null}
        </PageWrapper>
    );
}
