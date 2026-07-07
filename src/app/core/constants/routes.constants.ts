export const CALENDAR_ROUTES = {
  CALENDAR: 'calendar',
} as const;

export const TEMPLATE_ROUTES = {
  LIST: 'templates',
  CREATE: 'templates/new',
  DETAILS: 'templates/:id',
  EDIT: 'templates/:id/edit',
} as const;
