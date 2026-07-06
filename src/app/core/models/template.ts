export interface Template {
  id: string;
  name: string;
  exercises: TemplateExercise[];
}

export interface TemplateExercise {
  id: string;
  name: string;
}