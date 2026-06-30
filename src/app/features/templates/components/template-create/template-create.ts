import {Component, computed, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {TemplateService} from '../../services/template.service';
import {Template, TemplateExercise} from '../../../../core/models/template';
import {APP_ROUTES} from '../../../../core/contants/routes.constants';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-template-create',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './template-create.html',
  styleUrl: './template-create.scss',
  providers: [TemplateService],
  host: {
    class: 'template-create'
  }
})
export class TemplateCreate {

  #router = inject(Router);
  #templateService = inject(TemplateService);

  #EMPTY = '';

  templateName = signal<string>(this.#EMPTY);
  exerciseName = signal<string>(this.#EMPTY);
  exercises = signal<TemplateExercise[]>([]);

  hasExercises = computed(() => this.exercises().length > 0);

  isSaveButtonDisabled = computed(() => this.templateName().trim() === this.#EMPTY || this.exercises().length === 0);

  onAddExercise(): void {
    const rawExerciseName = this.exerciseName().trim();

    if (!rawExerciseName) return;

    const newExercise: TemplateExercise = {
      id: crypto.randomUUID(),
      name: rawExerciseName
    }

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
    }

    this.#templateService.saveTemplate(newTemplate);
    this.#router.navigate([APP_ROUTES.TEMPLATE_LIST]);
  }
}
