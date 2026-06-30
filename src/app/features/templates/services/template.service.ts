import {Injectable} from '@angular/core';
import {Template} from '../../../core/models/template';

@Injectable()
export class TemplateService {
  saveTemplate(template: Template) {
    console.warn("Template saved successfully.", template);
  }
}
