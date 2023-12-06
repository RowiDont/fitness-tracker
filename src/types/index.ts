export type Workout = {
    id: number;
    title: string;
    log: Array<Exercise>;
};

export type Exercise = {
    title: string;
    sets: Array<ExerciseSet>;
};

export type ExerciseSet = {
    weight: number;
    reps: number;
    createdAt: Date;
};
