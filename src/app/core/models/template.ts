export interface Template {
  id: string;
  name: string;
  exercises: TemplateExercise[];
}

export interface TemplateExercise {
  id: string;
  name: string;
}

export interface Workout {
  id: string;
  templateId: string;
  date: Date;
}

export interface WorkoutExercise {
  id: string;
  workoutId: string;
  templateExerciseId: string;
  sets: ExerciseSet[];
  notes?: string;
}

export interface ExerciseSet {
  id: string;
  workoutExerciseId: string;
  reps: number;
  weight: number;
}
