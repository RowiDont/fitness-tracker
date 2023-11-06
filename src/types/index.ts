export type Workout = {
    title: string;
    log: Array<Exercise>;
};

export type Exercise = {
    title: string;
    sets: Array<WorkoutSet>;
};

export type WorkoutSet = {
    weight: number;
    reps: number;
    notes: string;
};