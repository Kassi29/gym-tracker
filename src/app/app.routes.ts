import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'templates',
    pathMatch: 'full',
  },
  {
    path: 'templates',
    loadComponent: () =>
      import('./features/templates/components/template-list/template-list').then(m => m.TemplateList),
  },
  {
    path: 'templates/new',
    loadComponent: () =>
      import('./features/templates/components/template-create/template-create').then(m => m.TemplateCreate),
  },
  {
    path: 'templates/:id',
    loadComponent: () =>
      import('./features/templates/components/template-details/template-details').then(m => m.TemplateDetails),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./features/calendar/components/calendar-container/calendar-container').then(m => m.CalendarContainer),
  }
];
