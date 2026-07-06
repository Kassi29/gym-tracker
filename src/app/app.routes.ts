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
      import('./features/templates/components/template-create/template-create').then(m => m.TemplateCreate),
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./features/calendar/components/calendar-container/calendar-container').then(m => m.CalendarContainer),
  }
];
