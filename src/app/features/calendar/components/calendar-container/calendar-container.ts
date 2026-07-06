import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {format} from 'date-fns/format';
import {subMonths} from 'date-fns/subMonths';
import {addMonths} from 'date-fns/addMonths';
import {getCalendarGridDays, isBeforeMinMonth} from '../../../../core/calendar.utils';
import {CalendarGrid} from '../calendar-grid/calendar-grid';
import {BottomSheet} from '../../../../shared/bottom-sheet/bottom-sheet';
import {TemplateStore} from '../../../templates/services/template.store';

@Component({
  selector: 'app-calendar-container',
  standalone: true,
  imports: [CalendarGrid, BottomSheet],
  templateUrl: './calendar-container.html',
  styleUrl: './calendar-container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'calendar-container'
  }
})
export class CalendarContainer {
  readonly #templateStore = inject(TemplateStore);

  currentDate = signal<Date>(new Date());
  selectedDate = signal<Date | null>(null);
  workoutRecords = signal<Record<string, boolean>>({});
  isTemplateModalOpen = signal<boolean>(false);

  readonly suggestedTemplates = this.#templateStore.templates;
  readonly hasSuggestedTemplates = computed(() => this.suggestedTemplates().length > 0);

  gridDays = computed(() => getCalendarGridDays(this.currentDate()));
  currentMonthName = computed(() => format(this.currentDate(), 'MMMM yyyy'));
  totalWorkouts = computed(() => {
    const currentMonthPrefix = format(this.currentDate(), 'yyyy-MM');

    return Object.keys(this.workoutRecords())
      .filter(dateString => dateString.startsWith(currentMonthPrefix))
      .length;
  });

  isPrevMonthDisabled = computed(() => {
    const prevMonth = subMonths(this.currentDate(), 1);

    return isBeforeMinMonth(prevMonth);
  });

  onNextMonthClicked(): void {
    this.currentDate.update(date => addMonths(date, 1));
  }

  onPrevMonthClicked(): void {
    if (this.isPrevMonthDisabled()) {
      return;
    }

    this.currentDate.update(date => subMonths(date, 1));
  }

  onDaySelected(day: Date): void {
    this.selectedDate.set(day);

    const dateString = format(day, 'yyyy-MM-dd');

    if (!this.workoutRecords()[dateString]) {
      this.isTemplateModalOpen.set(true);
    }
  }

  onSheetClosed(): void {
    this.isTemplateModalOpen.set(false);
  }

  onStartWorkout(templateId: string): void {
    this.isTemplateModalOpen.set(false);
    void templateId;
  }
}
