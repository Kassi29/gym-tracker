import {effect, Injectable, signal} from '@angular/core';
import {Template} from '@core/models/template';

const STORAGE_KEY = 'gym-tracker:templates';

function loadFromStorage(): Template[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw === null) {
      return [];
    }

    const parsed = JSON.parse(raw) as Template[];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

@Injectable({providedIn: 'root'})
export class TemplateStore {
  readonly #templates = signal<Template[]>(loadFromStorage());

  readonly templates = this.#templates.asReadonly();

  constructor() {
    effect(() => {
      const value = this.#templates();

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch {
        // storage lleno o no disponible: la app sigue operativa con el estado en memoria
      }
    });
  }

  saveTemplate(template: Template): void {
    this.#templates.update(current => [...current, template]);
  }

  updateTemplate(updatedTemplate: Template): void {
    this.#templates.update(current => current.map(template => template.id === updatedTemplate.id ? updatedTemplate : template));
  }

  deleteTemplate(id: string): void {
    this.#templates.update(current => current.filter(template => template.id !== id));
  }
}
