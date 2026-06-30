import {Routes} from '@angular/router';
import {TemplateCreate} from './features/templates/components/template-create/template-create';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'templates',
    pathMatch: 'full',
  },
  {
    path: 'templates',
    component: TemplateCreate,
  }
];
