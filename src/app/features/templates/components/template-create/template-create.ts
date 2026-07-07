import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TemplateStore} from '../../services/template.store';
import {Template, TemplateExercise} from '@core/models/template';
import {TEMPLATE_ROUTES} from '@core/constants/routes.constants';

@Component({
  selector: 'app-template-create',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './template-create.html',
  styleUrl: './template-create.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'template-create'
  }
})
export class TemplateCreate {
  readonly #templateStore = inject(TemplateStore);
  readonly #router = inject(Router);

  #EMPTY = '';

  templateName = signal<string>(this.#EMPTY);
  exerciseName = signal<string>(this.#EMPTY);
  exercises = signal<TemplateExercise[]>([]);

  hasExercises = computed(() => this.exercises().length > 0);
  isSaveButtonDisabled = computed(() => this.templateName().trim() === this.#EMPTY || this.exercises().length === 0);

  onAddExercise(): void {
    const rawExerciseName = this.exerciseName().trim();

    if (rawExerciseName === this.#EMPTY) return;

    const newExercise: TemplateExercise = {
      id: crypto.randomUUID(),
      name: rawExerciseName
    };

    this.exercises.update(currentExercises => [...currentExercises, newExercise]);
    this.exerciseName.set(this.#EMPTY);
  }

  onRemoveExercise(exerciseId: string): void {
    this.exercises.update(currentExercises => currentExercises.filter(exercise => exercise.id !== exerciseId));
  }

  onSaveTemplate(): void {
    if (this.isSaveButtonDisabled()) return;

    const newTemplate: Template = {
      id: crypto.randomUUID(),
      name: this.templateName().trim(),
      exercises: this.exercises()
    };

    this.#templateStore.saveTemplate(newTemplate);

    this.resetForm();
    this.#router.navigate([TEMPLATE_ROUTES.LIST]);
  }

  private resetForm(): void {
    this.templateName.set(this.#EMPTY);
    this.exerciseName.set(this.#EMPTY);
    this.exercises.set([]);
  }
}
