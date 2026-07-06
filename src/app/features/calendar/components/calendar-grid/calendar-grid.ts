import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {isDayInCurrentMonth} from '../../../../core/calendar.utils';
import {isSameDay} from 'date-fns/isSameDay';
import {format} from 'date-fns/format';

@Component({
  selector: 'app-calendar-grid',
  standalone: true,
  templateUrl: './calendar-grid.html',
  styleUrl: './calendar-grid.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'calendar-grid'
  }
})
export class CalendarGrid {
  gridDays = input.required<Date[]>();
  currentMonth = input.required<Date>();
  selectedDate = input<Date | null>(null);
  workoutRecords = input<Record<string, boolean>>({});

  daySelected = output<Date>();

  isCurrentMonth(day: Date): boolean {
    return isDayInCurrentMonth(day, this.currentMonth());
  }

  isSelectedDay(day: Date): boolean {
    const selectedDay = this.selectedDate();

    return selectedDay ? isSameDay(day, selectedDay) : false;
  }

  hasWorkout(day: Date): boolean {
    const dateString = format(day, 'yyyy-MM-dd');

    return this.workoutRecords()[dateString];
  }

  onDayClicked(day: Date): void {
    this.daySelected.emit(day);
  }
}
